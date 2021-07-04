/* -*- mode: C; c-basic-offset: 3; -*-
 *
 * convert_serial2 -- FX2 USB serial port converter
 * 
 * by  Brent Baccala <cosine@freesoft.org>   July 2009
 * and Wolfgang Wieser ] wwieser (a) gmx <*> de [   Aug. 2009
 *
 * Based on both usb-fx2-local-examples by Wolfgang Wieser (GPLv2) and
 * the Cypress FX2 examples.
 *
 * This is an FX2 program which re-enumerates to mimic a USB-attached
 * serial port (a Sierra Wireless modem).  
 * Anything transmitted to it by the host is echoed back after converting 
 * lowercase to uppercase.  
 * The re-enumerated FX2 appears on a Debian Linux machine as something
 * like /dev/ttyUSB0, and can be tested with a serial port program
 * like 'minicom'.
 *
 * Features like setting and querying things like the baudrate
 * and line/modem status are unimplemented, and will return USB errors
 * when the host attempts to perform these operations.  However, the
 * program works, and I decided to leave out the additional clutter in
 * favor of a simpler program that can be easily modified to suit
 * individual needs.
 *
 * The program ignores USB Suspend interrupts, and probably violates
 * the USB standard in this regard, as all USB devices are required to
 * support Suspend.  The remote wakeup feature is parsed and correctly
 * handled in the protocol, but of course does nothing since the
 * device never suspends.
 */

#define ALLOCATE_EXTERN
#include "fx2regs.h"
#include "fx2.h"

// If Rwuen_allowed is TRUE, the device allows the remote wakeup
// feature to be set by the host.  If the host sets the feature, Rwuen
// becomes TRUE but nothing else is done.  If Rwuen_allowed is FALSE,
// the device will signal an error on an attempt to set remote wakeup.

BOOL Rwuen_allowed = FALSE;	// Allow remote wakeup to be enabled
BOOL Rwuen = FALSE;		// Remote wakeup enable
BOOL Selfpwr = FALSE;		// Device is (not) self-powered

// USB allows a device to support multiple configurations, only one of
// which can be active at any given time.  Each configuration can have
// multiple interfaces, all of which can be active simultaneously, and
// each interface can also have a setting.  This driver only uses a
// single configuration with a single interface, which has a single
// setting, but these variables are here as place holders in case you
// want to make the driver more sophisticated.

#define NUM_INTERFACES 1

BYTE Configuration;                         // Current device configuration
BYTE InterfaceSetting[NUM_INTERFACES];      // Current interface settings

// this table is used by the epcs macro 
const char code  EPCS_Offset_Lookup_Table[] =
{
   0,    // EP1OUT
   1,    // EP1IN
   2,    // EP2OUT
   2,    // EP2IN
   3,    // EP4OUT
   3,    // EP4IN
   4,    // EP6OUT
   4,    // EP6IN
   5,    // EP8OUT
   5,    // EP8IN
};

// macro for generating the address of an endpoint's control and status register (EPnCS)
#define epcs(EP) (EPCS_Offset_Lookup_Table[(EP & 0x7E) | (EP > 128)] + 0xE6A1)


// Read TRM 15.14 for an explanation of which commands need this.
//
// nop's take 4 clock cyles.  A single nop is sufficient for both the
// default setup (48 MHz CPU and interface clock) and this program's
// setup (12 MHz CPU and 48 MHz interface clocks).

#define	NOP		_asm nop _endasm
#define	SYNCDELAY	NOP;


// USB string descriptors are constructed from this array.  Indices
// into this array can be placed into the other descriptors to specify
// manufacturer name, serial number, etc.  Index 0 is reserved for a
// list of language codes that this program currently ignores, but in
// principle you can switch between different string tables based on
// the language requested by the host.
//
// The wire format is specified in 16-bit Unicode.  I just use ASCII
// here and add zero bytes when I construct the string descriptor.  If
// you actually want to specify Unicode here, disable the code that
// doubles up these bytes with zeros.
//
// Also, since I build the string descriptors directly in the EP0
// output buffer, I'm limited to 31 character strings (64 byte packet;
// 2 char overhead; 16 bits per char).  If this is a problem, I'd
// suggest allocating a block of memory for a longer string descriptor
// (just like the other descriptors below), building the string
// descriptors there, then transferring them using the same SUDPTR
// technique used for the other descriptors, which can handle larger
// descriptors and breaks them up automatically into small packets.

char * USB_strings[] = { "EN", "WieserLabs & freesoft.org", "FX2 case converter" };

// Descriptors are a real pain since Device and Configuration
// descriptors have to be word-aligned (this is an FX2 requirement),
// but Interface and Endpoint descriptors can't be word aligned - they
// have directly follow their corresponding Configuration descriptor.
// 'sdcc' provides no facility for structure alignment anyway, so I
// just hardwire the addresses towards the end of the FX2's 16K RAM.
//
// This code will break if you try it on an 8K FX2.  Sigh.
//
// I use the DSCR_OFFSET macro both to simplify the address
// calculations and to figure what value goes into the third field of
// the Configuration descriptor.

#define DSCR_OFFSET(intrfc, endpnt)    (sizeof(CONFIGDSCR) + \
		intrfc*sizeof(INTRFCDSCR) + endpnt*sizeof(ENDPNTDSCR))

DEVICEDSCR xdata at 0x3d00 myDeviceDscr = {
   sizeof(DEVICEDSCR),		// Descriptor length
   DEVICE_DSCR,			// Descriptor type
   0x200,			// USB spec version 2.00
   0,				// Device class
   0,				// Device sub-class
   0,				// Device sub-sub-class
   64,				// Max packet size for EP0 (bytes)
   0x1199,			// Vendor ID
   0x0017,			// Product ID
   0x0100,			// Product version (1.00)
   1,				// Manufacturer string index
   2,				// Product string index
   0,				// Serial number string index
   1				// Number of configurations
};

// In theory, this descriptor returns information about the "other"
// speed.  So, if we're operating at high speed, the Device descriptor
// would contain high speed configuration information and this
// descriptor would contain full speed information, and vice versa if
// we're operating at full speed.  I take a simpler approach - the
// configuration information is the same for both speeds, so we never
// care which one is which.

DEVICEQUALDSCR xdata at 0x3d20 myDeviceQualDscr = {
   sizeof(DEVICEQUALDSCR),	// Descriptor length
   DEVQUAL_DSCR,		// Descriptor type
   0x200,			// USB spec version 2.00
   0,				// Device class
   0,				// Device sub-class
   0,				// Device sub-sub-class
   64,				// Max packet size for EP0 (bytes)
   1				// Number of alternate configurations
};

// Likewise, we should another full set of these configuration
// descriptors.  In this case, however, the structures are identical
// and the few fields that differ (descriptor type and endpoint max
// packet size) can be tweaked at run-time, so this next set of
// descriptors does double duty as both Configuration and Other Speed
// Configuration descriptors.

CONFIGDSCR xdata at 0x3d30 myConfigDscr = {
   sizeof(CONFIGDSCR),		// Descriptor length
   CONFIG_DSCR,			// Descriptor Type
   DSCR_OFFSET(1,2),		// Total len of (config + intrfcs + end points)
   1,				// Number of interfaces supported
   1,				// Configuration index for SetConfiguration()
   0,				// Config descriptor string index
   bmBUSPWR|bmRWU,		// Attributes
   0x1E				// Max power consumption; 2*30 = 60 mA
};

INTRFCDSCR xdata at 0x3d30+DSCR_OFFSET(0,0) myIntrfcDscr = {
   sizeof(INTRFCDSCR),		// Descriptor length
   INTRFC_DSCR,			// Descriptor type
   0,				// Index of this interface (zero based)
   0,				// Value used to select alternate
   2,				// Number of endpoints
   0xFF,			// Class Code
   0xFF,			// Subclass Code
   0xFF,			// Protocol Code
   0				// Index of interface string description
};

ENDPNTDSCR xdata at 0x3d30+DSCR_OFFSET(1,0) myInEndpntDscr = {
   sizeof(ENDPNTDSCR),		// Descriptor length
   ENDPNT_DSCR,			// Descriptor type
   0x86,			// Address of endpoint
   EP_BULK,			// Endpoint type
   512,				// Maximum packet size
   0				// Interrupt polling interval
				//   (ignored for bulk endpoints)
};

ENDPNTDSCR xdata at 0x3d30+DSCR_OFFSET(1,1) myOutEndpntDscr = {
   sizeof(ENDPNTDSCR),		// Descriptor length
   ENDPNT_DSCR,			// Descriptor type
   0x02,			// Address of endpoint
   EP_BULK,			// Endpoint type
   512,				// Maximum packet size
   0				// Interrupt polling interval
				//   (ignored for bulk endpoints)
};

//-----------------------------------------------------------------------------
// Endpoint 0 Device Request handler
//-----------------------------------------------------------------------------

static int count_array_size(void ** array)
{
   int size;
   for (size=0; *array != 0; array++, size++);
   return size;
}

static void SetupCommand(void)
{
   int i;
   int interface;

   // Errors are signaled by stalling endpoint 0.

   switch(SETUPDAT[0] & SETUP_MASK) {

   case SETUP_STANDARD_REQUEST:
      switch(SETUPDAT[1])
	 {
	 case SC_GET_DESCRIPTOR:
	    switch(SETUPDAT[3])
	       {
	       case GD_DEVICE:
		  SUDPTRH = MSB(&myDeviceDscr);
		  SUDPTRL = LSB(&myDeviceDscr);
		  break;
	       case GD_DEVICE_QUALIFIER:
		  SUDPTRH = MSB(&myDeviceQualDscr);
		  SUDPTRL = LSB(&myDeviceQualDscr);
		  break;
	       case GD_CONFIGURATION:
		  myConfigDscr.type = CONFIG_DSCR;
		  if (USBCS & bmHSM) {
		     // High speed parameters
		     myInEndpntDscr.mp = 512;
		     myOutEndpntDscr.mp = 512;
		  } else {
		     // Full speed parameters
		     myInEndpntDscr.mp = 64;
		     myOutEndpntDscr.mp = 64;
		  }
		  SUDPTRH = MSB(&myConfigDscr);
		  SUDPTRL = LSB(&myConfigDscr);
		  break;
	       case GD_OTHER_SPEED_CONFIGURATION:
		  myConfigDscr.type = OTHERSPEED_DSCR;
		  if (USBCS & bmHSM) {
		     // We're in high speed mode, this is the Other
		     // descriptor, so these are full speed parameters
		     myInEndpntDscr.mp = 64;
		     myOutEndpntDscr.mp = 64;
		  } else {
		     // We're in full speed mode, this is the Other
		     // descriptor, so these are high speed parameters
		     myInEndpntDscr.mp = 512;
		     myOutEndpntDscr.mp = 512;
		  }
		  SUDPTRH = MSB(&myConfigDscr);
		  SUDPTRL = LSB(&myConfigDscr);
		  break;
	       case GD_STRING:
		  if (SETUPDAT[2] >= count_array_size((void **) USB_strings)) {
		     EZUSB_STALL_EP0();
		  } else {
		     for (i=0; i<31; i++) {
			if (USB_strings[SETUPDAT[2]][i] == '\0') break;
			EP0BUF[2*i+2] = USB_strings[SETUPDAT[2]][i];
			EP0BUF[2*i+3] = '\0';
		     }
		     EP0BUF[0] = 2*i+2;
		     EP0BUF[1] = STRING_DSCR;
		     SYNCDELAY; EP0BCH = 0;
		     SYNCDELAY; EP0BCL = 2*i+2;
		  }
		  break;
	       default:            // Invalid request
		  EZUSB_STALL_EP0();
	       }
	    break;
	 case SC_GET_INTERFACE:
	    interface = SETUPDAT[4];
	    if (interface < NUM_INTERFACES) {
	       EP0BUF[0] = InterfaceSetting[interface];
	       EP0BCH = 0;
	       EP0BCL = 1;
	    }
	    break;
	 case SC_SET_INTERFACE:
	    interface = SETUPDAT[4];
	    if (interface < NUM_INTERFACES) {
	       InterfaceSetting[interface] = SETUPDAT[2];
	    }
	    break;
	 case SC_SET_CONFIGURATION:
	    Configuration = SETUPDAT[2];
	    break;
	 case SC_GET_CONFIGURATION:
	    EP0BUF[0] = Configuration;
	    EP0BCH = 0;
	    EP0BCL = 1;
	    break;
	 case SC_GET_STATUS:
	    switch(SETUPDAT[0])
	       {
	       case GS_DEVICE:
		  EP0BUF[0] = ((BYTE)Rwuen << 1) | (BYTE)Selfpwr;
		  EP0BUF[1] = 0;
		  EP0BCH = 0;
		  EP0BCL = 2;
		  break;
	       case GS_INTERFACE:
		  EP0BUF[0] = 0;
		  EP0BUF[1] = 0;
		  EP0BCH = 0;
		  EP0BCL = 2;
		  break;
	       case GS_ENDPOINT:
		  EP0BUF[0] = *(BYTE xdata *) epcs(SETUPDAT[4]) & bmEPSTALL;
		  EP0BUF[1] = 0;
		  EP0BCH = 0;
		  EP0BCL = 2;
		  break;
	       default:            // Invalid Command
		  EZUSB_STALL_EP0();
	       }
	    break;
	 case SC_CLEAR_FEATURE:
	    switch(SETUPDAT[0])
	       {
	       case FT_DEVICE:
		  if(SETUPDAT[2] == 1)
		     Rwuen = FALSE;       // Disable Remote Wakeup
		  else
		     EZUSB_STALL_EP0();
		  break;
	       case FT_ENDPOINT:
		  if(SETUPDAT[2] == 0)
		     {
			*(BYTE xdata *) epcs(SETUPDAT[4]) &= ~bmEPSTALL;
			EZUSB_RESET_DATA_TOGGLE( SETUPDAT[4] );
		     }
		  else
		     EZUSB_STALL_EP0();
		  break;
	       }
	    break;
	 case SC_SET_FEATURE:
	    switch(SETUPDAT[0])
	       {
	       case FT_DEVICE:
		  if((SETUPDAT[2] == 1) && Rwuen_allowed)
		     Rwuen = TRUE;      // Enable Remote Wakeup
		  else if(SETUPDAT[2] == 2)
		     // Set Feature Test Mode.  The core handles this
		     // request.  However, it is necessary for the
		     // firmware to complete the handshake phase of the
		     // control transfer before the chip will enter test
		     // mode.  It is also necessary for FX2 to be
		     // physically disconnected (D+ and D-) from the host
		     // before it will enter test mode.
		     break;
		  else
		     EZUSB_STALL_EP0();
		  break;
	       case FT_ENDPOINT:
		  *(BYTE xdata *) epcs(SETUPDAT[4]) |= bmEPSTALL;
		  break;
	       default:
		  EZUSB_STALL_EP0();
	       }
	    break;
	 default:                     // *** Invalid Command
	    EZUSB_STALL_EP0();
	    break;
	 }
      break;

   default:
      EZUSB_STALL_EP0();
      break;
   }

   // Acknowledge handshake phase of device request
   EP0CS |= bmHSNAK;
}

static void USB_isr(void) __interrupt 8
{
   // Clear global USB IRQ
   EXIF &= ~0x10;

   // Clear SUDAV IRQ
   USBIRQ = 0x01;

   SetupCommand();
}

//-----------------------------------------------------------------------------
// Main program
//-----------------------------------------------------------------------------

static void Initialize(void)
{
	// Note that increasing the clock speed to 24 or 48 MHz would
	// affect our timer calculations below.  I use 12 MHz because
	// this lets me use the smallest numbers for our counter (i.e,
	// 40000 for the default 40 ms latency); the counter is only
	// sixteen bits.
	
	IFCONFIG=0xc0;  // Internal IFCLK, 48MHz; A,B as normal ports. 
	SYNCDELAY;
	
	REVCTL=0x03;  // See TRM...
	SYNCDELAY;
	
	EP1OUTCFG=0;
	EP1INCFG=0;
	EP4CFG=0;
	EP8CFG=0;
	
	// Set up EP2 and EP6 as quad-buffered, 512 bytes per buffer, bulk. 
	EP6CFG=0xe0;   // 1110 0000  (IN)
	EP2CFG=0xa0;   // 1010 0000  (OUT)
	
	// To be sure, clear and reset all FIFOs although 
	// this is probably not strictly required. 
	FIFORESET = 0x80;  SYNCDELAY;  // NAK all requests from host. 
	FIFORESET = 0x82;  SYNCDELAY;  // Reset individual EP (2,4,6,8)
	FIFORESET = 0x84;  SYNCDELAY;
	FIFORESET = 0x86;  SYNCDELAY;
	FIFORESET = 0x88;  SYNCDELAY;
	FIFORESET = 0x80;  SYNCDELAY;  // NAK all requests from host. 
	FIFORESET = 0x00;  SYNCDELAY;  // Resume normal operation. 
   
   	// Flush input and output quad-buffers. 
	OUTPKTEND = 0x82; SYNCDELAY;
	OUTPKTEND = 0x82; SYNCDELAY;
	OUTPKTEND = 0x82; SYNCDELAY;

	INPKTEND = 0x86; SYNCDELAY;
	INPKTEND = 0x86; SYNCDELAY;
	INPKTEND = 0x86; SYNCDELAY;

	/* EP6FIFOCFG: */
	//  bit7: 0
	//  bit6: INFM6  See TRM 15-29 (p.351): Signal line one clock earlier.
	//  bit5: OEP6
	//  bit4: AUTOOUT    1 = enable
	//  bit3: AUTOIN     1 = enable
	//  bit2: ZEROLENIN  1 = enable (?)
	//  bit1: 0
	//  bit0: WORDWIDE   1 = 16bit (default)
	EP2FIFOCFG = 0;   SYNCDELAY;
	EP6FIFOCFG = 0;   SYNCDELAY;

	// Setup Data Pointer - AUTO mode
	//
	// In this mode, there are two ways to send data on EP0.  You
	// can either copy the data into EP0BUF and write the packet
	// length into EP0BCH/L to start the transfer, or you can
	// write the (word-aligned) address of a USB descriptor into
	// SUDPTRH/L; the length is computed automatically.
	SUDPTRCTL = 1;

	// Enable USB interrupt
	IE = 0x80;
	EIE = 0x01;

	// Enable SUDAV (setup data available) interrupt
	USBIE = 0x01;
}


// We want to buffer any outgoing data for a short time (40 ms) to see
// if any other data becomes available and it can all be sent
// together.  At 12 MHz we consume 83.3 ns/cycle and divide this rate
// by 12 so that our counters increment almost exactly once every us.
// The counter is sixteen bits, so we can specify latencies up to
// about 65 ms.

unsigned int bytes_waiting_for_xmit = 0;
unsigned int latency_us = 40000;


static void ProcessXmitData(void)
{
   // reset Timer 0
   TCON &= ~0x30;

   SYNCDELAY;

   // Send the packet.
   EP6BCH = MSB(bytes_waiting_for_xmit);
   EP6BCL = LSB(bytes_waiting_for_xmit);

   bytes_waiting_for_xmit = 0;
}


static void putchar(char c)
{
   xdata unsigned char *dest=EP6FIFOBUF + bytes_waiting_for_xmit;

   // Wait for EP6 buffer to become non-full so that we don't
   // overwrite content.
   while(EP6CS & (1<<3));
   
   *dest = c;
   ++bytes_waiting_for_xmit;

   // Either send 64 byte packets or send 512 byte packets. 
   // Concerning the data, there is no difference under linux. 
   if (bytes_waiting_for_xmit >= 512 ) ProcessXmitData();

   // Set Timer 0 if it isn't set and we've got data ready to go
   if (bytes_waiting_for_xmit && !(TCON & 0x10)) {
      TH0 = MSB(0xffff - latency_us);
      TL0 = LSB(0xffff - latency_us);
      TCON |= 0x10;
   }
}


static void ProcessRecvData(void)
{
	xdata const unsigned char *src=EP2FIFOBUF;
	int len = (((int)EP2BCH)<<8) | EP2BCL;
	int i;

	for(i=0; i<len; i++,src++)
	   {
	      if(*src>='a' && *src<='z')
		{  putchar(*src-'a'+'A');  }
	      else
		{  putchar(*src);  }
	   }

	// "Skip" the received OUT packet to "forget" it (see TRM p. 9-26):
	SYNCDELAY;
	OUTPKTEND=0x82;
}


void main(void)
{
	// Disconnect the USB interface, initialize, renumerate, reconnect
	USBCS |= 0x08;
	Initialize();
	USBCS |= 0x02;
	USBCS &= ~(0x08);

	// Configure Timer 0 (but leave it unset)
	// mode 1 (16-bit); ungated; divide system clock by 12
	CKCO &= ~(0x08);
	TMOD = 0x01;
	TCON &= ~0x30;

	for(;;)
	{
		// Input data on EP2
		if(!(EP2CS & (1<<2)))
		{
 		   ProcessRecvData();
		}

		// Timer expiration; send buffered data
		if((TCON & 0x20))
		{
		   ProcessXmitData();
		}
	}
}
