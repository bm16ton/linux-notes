/*
//-----------------------------------------------------------------------------
//   File:      FX2.h
//   Contents:  EZ-USB FX2 constants, macros, datatypes, globals, and library
//              function prototypes.
//
//   Copyright (c) 2000 Cypress Semiconductor, All rights reserved
// 
// Modified to be used with the sdcc compiler. 
// 
//-----------------------------------------------------------------------------
*/
#ifndef FX2_H     //Header sentry
#define FX2_H

#include "fx2regs.h"


#define INTERNAL_DSCR_ADDR 0x0080   // Relocate Descriptors to 0x80
#define bmSTRETCH 0x07
#define FW_STRETCH_VALUE 0x0      // Set stretch to 0 in frameworks
                           // Note: a RevE eratta states that stretch must=0 to set OUTxBC

/*
//-----------------------------------------------------------------------------
// Constants
//-----------------------------------------------------------------------------
*/
#define TRUE    1
#define FALSE   0

#define DEVICE_DSCR      0x01      // Descriptor type: Device
#define CONFIG_DSCR      0x02      // Descriptor type: Configuration
#define STRING_DSCR      0x03      // Descriptor type: String
#define INTRFC_DSCR      0x04      // Descriptor type: Interface
#define ENDPNT_DSCR      0x05      // Descriptor type: End Point
#define DEVQUAL_DSCR     0x06      // Descriptor type: Device Qualifier
#define OTHERSPEED_DSCR  0x07      // Descriptor type: Other Speed Configuration

#define bmBUSPWR  bmBIT7         // Config. attribute: Bus powered
#define bmSELFPWR bmBIT6         // Config. attribute: Self powered
#define bmRWU     bmBIT5         // Config. attribute: Remote Wakeup

#define bmEPOUT   bmBIT7
#define bmEPIN    0x00

#define EP_CONTROL   0x00        // End Point type: Control
#define EP_ISO       0x01        // End Point type: Isochronous
#define EP_BULK      0x02        // End Point type: Bulk
#define EP_INT       0x03        // End Point type: Interrupt

#define SUD_SIZE            8      // Setup data packet size

/*
//////////////////////////////////////////////////////////////////////////////
//Added for HID
*/

#define SETUP_MASK				0x60	//Used to mask off request type
#define SETUP_STANDARD_REQUEST	0		//Standard Request
#define SETUP_CLASS_REQUEST		0x20	//Class Request
#define SETUP_VENDOR_REQUEST	0x40	//Vendor Request
#define SETUP_RESERVED_REQUEST 	0x60	//Reserved or illegal request

/*
//////////////////////////////////////////////////////////////////////////////
*/


#define SC_GET_STATUS         0x00   // Setup command: Get Status
#define SC_CLEAR_FEATURE      0x01   // Setup command: Clear Feature
#define SC_RESERVED            0x02   // Setup command: Reserved
#define SC_SET_FEATURE         0x03   // Setup command: Set Feature
#define SC_SET_ADDRESS         0x05   // Setup command: Set Address
#define SC_GET_DESCRIPTOR      0x06   // Setup command: Get Descriptor
#define SC_SET_DESCRIPTOR      0x07   // Setup command: Set Descriptor
#define SC_GET_CONFIGURATION   0x08   // Setup command: Get Configuration
#define SC_SET_CONFIGURATION   0x09   // Setup command: Set Configuration
#define SC_GET_INTERFACE      0x0a   // Setup command: Get Interface
#define SC_SET_INTERFACE      0x0b   // Setup command: Set Interface
#define SC_SYNC_FRAME         0x0c   // Setup command: Sync Frame
#define SC_ANCHOR_LOAD         0xa0   // Setup command: Anchor load
   
#define GD_DEVICE          0x01  // Get descriptor: Device
#define GD_CONFIGURATION   0x02  // Get descriptor: Configuration
#define GD_STRING          0x03  // Get descriptor: String
#define GD_INTERFACE       0x04  // Get descriptor: Interface
#define GD_ENDPOINT        0x05  // Get descriptor: Endpoint
#define GD_DEVICE_QUALIFIER 0x06  // Get descriptor: Device Qualifier
#define GD_OTHER_SPEED_CONFIGURATION 0x07  // Get descriptor: Other Configuration
#define GD_INTERFACE_POWER 0x08  // Get descriptor: Interface Power
#define GD_HID	            0x21	// Get descriptor: HID
#define GD_REPORT	         0x22	// Get descriptor: Report

#define GS_DEVICE          0x80  // Get Status: Device
#define GS_INTERFACE       0x81  // Get Status: Interface
#define GS_ENDPOINT        0x82  // Get Status: End Point

#define FT_DEVICE          0x00  // Feature: Device
#define FT_ENDPOINT        0x02  // Feature: End Point

#define I2C_IDLE              0     // I2C Status: Idle mode
#define I2C_SENDING           1     // I2C Status: I2C is sending data
#define I2C_RECEIVING         2     // I2C Status: I2C is receiving data
#define I2C_PRIME             3     // I2C Status: I2C is receiving the first byte of a string
#define I2C_STOP              5     // I2C Status: I2C waiting for stop completion
#define I2C_BERROR            6     // I2C Status: I2C error; Bit Error
#define I2C_NACK              7     // I2C Status: I2C error; No Acknowledge
#define I2C_OK                8     // I2C positive return code
#define I2C_WAITSTOP          9     // I2C Status: Wait for STOP complete

/*-----------------------------------------------------------------------------
   Macros
-----------------------------------------------------------------------------*/

#define MSB(word)      (BYTE)(((WORD)(word) >> 8) & 0xff)
#define LSB(word)      (BYTE)((WORD)(word) & 0xff)

#define SWAP_ENDIAN(word)   ((BYTE*)&word)[0] ^= ((BYTE*)&word)[1]; ((BYTE*)&word)[1] ^= ((BYTE*)&word)[0]; ((BYTE*)&word)[0] ^= ((BYTE*)&word)[1]

#define EZUSB_IRQ_ENABLE()   EUSB = 1
#define EZUSB_IRQ_DISABLE()   EUSB = 0
#define EZUSB_IRQ_CLEAR()   EXIF &= ~0x10      // IE2_

#define EZUSB_STALL_EP0()            EP0CS |= bmEPSTALL
#define EZUSB_STALL_EP(ep_id)             // fx2bug
#define EZUSB_UNSTALL_EP(ep_id)           // fx2bug
#define   EZUSB_GET_EP_STATUS(ep_id)      // fx2bug
#define EZUSB_SET_EP_BYTES(ep_id,count)   // fx2bug


/*
// WRITEDELAY() has been replaced by SYNCDELAY; macro in fx2sdly.h
// ...it is here for backwards compatibility...

// the WRITEDELAY macro compiles to the time equivalent of 3 NOPs.
// It is used in the frameworks to allow for write recovery time
// requirements of certain registers.  This is only necessary for
// EZ-USB FX parts.  See the EZ-USB FX TRM for
// more information on write recovery time issues.
*/
#define WRITEDELAY() {char writedelaydummy = 0;}
/*
// if this firmware will never run on an EZ-USB FX part replace
// with:
// #define WRITEDELAY()
*/

/*
// macro to reset and endpoint data toggle
*/
#define EZUSB_RESET_DATA_TOGGLE(ep)     TOGCTL = (((ep & 0x80) >> 3) + (ep & 0x0F)); TOGCTL |= bmRESETTOGGLE


#define EZUSB_ENABLE_RSMIRQ()      (EICON |= 0x20)      // Enable Resume Interrupt (EPFI_)
#define EZUSB_DISABLE_RSMIRQ()      (EICON &= ~0x20)   // Disable Resume Interrupt (EPFI_)
#define EZUSB_CLEAR_RSMIRQ()      (EICON &= ~0x10)   // Clear Resume Interrupt Flag (PFI_)

#define EZUSB_GETI2CSTATUS()      (I2CPckt.status)
#define EZUSB_CLEARI2CSTATUS()      if((I2CPckt.status == I2C_BERROR) || (I2CPckt.status == I2C_NACK)) I2CPckt.status = I2C_IDLE;

#define EZUSB_ENABLEBP()         (BREAKPT |= bmBPEN)    // TGE fx2bug
#define EZUSB_DISABLEBP()         (BREAKPT &= ~bmBPEN)  // TGE fx2bug
#define EZUSB_CLEARBP()            (BREAKPT |= bmBREAK) // TGE fx2bug
#define EZUSB_BP(addr)            BPADDRH = (BYTE)(((WORD)addr >> 8) & 0xff);      BPADDRL = (BYTE)addr                              // TGE fx2bug

#define EZUSB_EXTWAKEUP()      (((WAKEUPCS & bmWU2) && (WAKEUPCS & bmWU2EN)) || ((WAKEUPCS & bmWU) &&  (WAKEUPCS & bmWUEN)))

#define EZUSB_HIGHSPEED()      (USBCS & bmHSM)

/*
//-----------------------------------------------------------------------------
// Datatypes
//-----------------------------------------------------------------------------
*/
//typedef unsigned char   BYTE;   -> already typedef'ed in fx2regs.h
//typedef unsigned short  WORD;   -> already typedef'ed in fx2regs.h
typedef unsigned long   DWORD;
typedef bit             BOOL;

#define  INT0_VECT   0
#define  TMR0_VECT   1
#define  INT1_VECT   2
#define  TMR1_VECT   3
#define  COM0_VECT   4
#define  TMR2_VECT   5
#define  WKUP_VECT   6
#define  COM1_VECT   7
#define  USB_VECT    8
#define  I2C_VECT    9
#define  INT4_VECT   10
#define  INT5_VECT   11
#define  INT6_VECT   12


/*
// TGE fx2bug 
*/
#define   SUDAV_USBVECT       (0 << 2)
#define   SOF_USBVECT         (1 << 2)
#define   SUTOK_USBVECT       (2 << 2)
#define   SUSP_USBVECT        (3 << 2)
#define   URES_USBVECT        (4 << 2)
#define   HS_USBVECT          (5 << 2)
#define   EP0ACK_USBVECT      (6 << 2)
#define   SPARE0_USBVECT      (7 << 2)
#define   IN0BUF_USBVECT      (8 << 2)
#define   OUT0BUF_USBVECT     (9 << 2)
#define   IN1BUF_USBVECT      (10 << 2)
#define   OUT1BUF_USBVECT     (11 << 2)
#define   INOUT2BUF_USBVECT   (12 << 2)
#define   INOUT4BUF_USBVECT   (13 << 2)
#define   INOUT6BUF_USBVECT   (14 << 2)
#define   INOUT8BUF_USBVECT   (15 << 2)
#define   IBN_USBVECT         (16 << 2)
#define   SPARE1_USBVECT      (17 << 2)
#define   EP0PINGNAK_USBVECT  (18 << 2)
#define   EP1PINGNAK_USBVECT  (19 << 2)
#define   EP2PINGNAK_USBVECT  (20 << 2)
#define   EP4PINGNAK_USBVECT  (21 << 2)
#define   EP6PINGNAK_USBVECT  (22 << 2)
#define   EP8PINGNAK_USBVECT  (23 << 2)
#define   ERRLIM_USBVECT      (24 << 2)
#define   SPARE2_USBVECT      (25 << 2)
#define   SPARE3_USBVECT      (26 << 2)
#define   SPARE4_USBVECT      (27 << 2)
#define   EP2PIDERR_USBVECT   (28 << 2)
#define   EP4PIDERR_USBVECT   (29 << 2)
#define   EP6PIDERR_USBVECT   (30 << 2)
#define   EP8PIDERR_USBVECT   (31 << 2)

typedef struct
{
   BYTE   length;
   BYTE   type;
}DSCR;

typedef struct            // Device Descriptor
{
   BYTE   length;         // Descriptor length ( = sizeof(DEVICEDSCR) )
   BYTE   type;         // Decriptor type (Device = 1)
   WORD   spec_ver;      // USB Specification Version (BCD)
   BYTE   dev_class;      // Device class
   BYTE   sub_class;      // Device sub-class
   BYTE   protocol;      // Device sub-sub-class
   BYTE   max_packet;      // Maximum packet size
   WORD   vendor_id;      // Vendor ID
   WORD   product_id;      // Product ID
   WORD   version_id;      // Product version ID
   BYTE   mfg_str;      // Manufacturer string index
   BYTE   prod_str;      // Product string index
   BYTE   serialnum_str;   // Serial number string index
   BYTE   configs;      // Number of configurations
}DEVICEDSCR;

typedef struct            // Device Qualifier Descriptor
{
   BYTE   length;         // Descriptor length ( = sizeof(DEVICEQUALDSCR) )
   BYTE   type;         // Decriptor type (Device Qualifier = 6)
   WORD   spec_ver;      // Specification Version (BCD) minor
   BYTE   dev_class;      // Device class
   BYTE   sub_class;      // Device sub-class
   BYTE   protocol;      // Device sub-sub-class
   BYTE   max_packet;      // Maximum packet size
   BYTE   configs;      // Number of configurations
   BYTE  reserved0;
}DEVICEQUALDSCR;

typedef struct
{
   BYTE   length;         // Configuration length ( = sizeof(CONFIGDSCR) )
   BYTE   type;         // Descriptor type (Configuration = 2)
   WORD   config_len;      // Configuration + End Points length
   BYTE   interfaces;      // Number of interfaces
   BYTE   index;         // Configuration number
   BYTE   config_str;      // Configuration string
   BYTE   attrib;         // Attributes (b7 - buspwr, b6 - selfpwr, b5 - rwu
   BYTE   power;         // Power requirement (div 2 ma)
}CONFIGDSCR;

typedef struct
{
   BYTE   length;         // Interface descriptor length ( - sizeof(INTRFCDSCR) )
   BYTE   type;         // Descriptor type (Interface = 4)
   BYTE   index;         // Zero-based index of this interface
   BYTE   alt_setting;   // Alternate setting
   BYTE   ep_cnt;         // Number of end points 
   BYTE   class;         // Interface class
   BYTE   sub_class;      // Interface sub class
   BYTE   protocol;      // Interface sub sub class
   BYTE   interface_str;   // Interface descriptor string index
}INTRFCDSCR;

typedef struct
{
   BYTE   length;         // End point descriptor length ( = sizeof(ENDPNTDSCR) )
   BYTE   type;         // Descriptor type (End point = 5)
   BYTE   addr;         // End point address
   BYTE   ep_type;      // End point type
   WORD   mp;           // Maximum packet size
   BYTE   interval;      // Interrupt polling interval
}ENDPNTDSCR;

typedef struct
{
   BYTE   length;         // String descriptor length
   BYTE   type;         // Descriptor type
}STRINGDSCR;

typedef struct
{
   BYTE   cntrl;         // End point control register
   BYTE   bytes;         // End point buffer byte count
}EPIOC;

typedef struct 
{
   BYTE   length;
   BYTE   *dat;
   BYTE   count;
   BYTE   status;
}I2CPCKT;

/*
//-----------------------------------------------------------------------------
// Globals
//-----------------------------------------------------------------------------
*/
extern code BYTE   USB_AutoVector;

extern WORD   pDeviceDscr;
extern WORD   pDeviceQualDscr;
extern WORD	  pHighSpeedConfigDscr;
extern WORD	  pFullSpeedConfigDscr;	
extern WORD   pConfigDscr;
extern WORD   pOtherConfigDscr;
extern WORD   pStringDscr;

extern code DEVICEDSCR        DeviceDscr;
extern code DEVICEQUALDSCR    DeviceQualDscr;
extern code CONFIGDSCR        HighSpeedConfigDscr;
extern code CONFIGDSCR        FullSpeedConfigDscr;
extern code STRINGDSCR        StringDscr;
extern code DSCR              UserDscr;

extern I2CPCKT volatile I2CPckt;

/*
//-----------------------------------------------------------------------------
// Function Prototypes
//-----------------------------------------------------------------------------
// fx2bug #ifdef CHIPREV_B
// fx2bug extern void EZUSB_IRQ_CLEAR(void);
// fx2bug #endif
*/

extern void EZUSB_Renum(void);
extern void EZUSB_Discon(BOOL renum);

extern void EZUSB_Susp(void);
extern void EZUSB_Resume(void);

extern void EZUSB_Delay1ms(void);
extern void EZUSB_Delay(WORD ms);

extern CONFIGDSCR xdata*   EZUSB_GetConfigDscr(BYTE ConfigIdx);
extern INTRFCDSCR xdata*   EZUSB_GetIntrfcDscr(BYTE ConfigIdx, BYTE IntrfcIdx, BYTE AltSetting);
extern STRINGDSCR xdata*   EZUSB_GetStringDscr(BYTE StrIdx);
extern DSCR xdata*      EZUSB_GetDscr(BYTE index, DSCR* dscr, BYTE type);

extern void EZUSB_InitI2C(void);
extern BYTE EZUSB_WriteI2C_(BYTE addr, BYTE length, BYTE xdata *dat);
extern BYTE EZUSB_ReadI2C_(BYTE addr, BYTE length, BYTE xdata *dat);
extern BYTE EZUSB_WriteI2C(BYTE addr, BYTE length, BYTE xdata *dat);
extern BYTE EZUSB_ReadI2C(BYTE addr, BYTE length, BYTE xdata *dat);
extern void EZUSB_WaitForEEPROMWrite(BYTE addr);

extern void modify_endpoint_stall(BYTE epid, BYTE stall);

#endif   // FX2_H
