#pragma NOIV               // Do not generate interrupt vectors
//-----------------------------------------------------------------------------
//   File:      bulkloop.c
//   Contents:   Hooks required to implement USB peripheral function.
//
//   Copyright (c) 2000 Cypress Semiconductor All rights reserved
//-----------------------------------------------------------------------------
#include "fx2.h"
//#include "fx2regs.h"
#include "8052.h"
#include "fx2sdly.h"			// SYNCDELAY macro
extern BOOL   GotSUD;         // Received setup data flag
extern BOOL   Sleep;
extern BOOL   Rwuen;
extern BOOL   Selfpwr;
xdata volatile unsigned char D3ON         _at_ 0x9800;
xdata volatile unsigned char D3OFF        _at_ 0x9000;

xdata volatile unsigned char D6ON         _at_ 0x9900;
xdata volatile unsigned char D6OFF        _at_ 0x9100;

 //static int x;
 //unsigned char duk;
 static int bcl,i;
 static int bcl_1, j;

xdata volatile unsigned char D5ON         _at_ 0xB800;
xdata volatile unsigned char D5OFF        _at_ 0xB000;

xdata volatile unsigned char D7ON         _at_ 0xB900;
xdata volatile unsigned char D7OFF        _at_ 0xB100;

 unsigned char dum;
 unsigned char dum_1;
 static int z;
 static int w;

extern BYTE xdata LineCode[7] ;

BYTE   Configuration;      // Current configuration
BYTE   AlternateSetting;   // Alternate settings

void display_product(void);
void TD_Poll(void);


//-----------------------------------------------------------------------------
// Task Dispatcher hooks
//   The following hooks are called by the task dispatcher.
//-----------------------------------------------------------------------------
BOOL DR_SetConfiguration();


   BYTE TxByte0,RxByte0;
   BYTE TxByte1,RxByte1;

void transmit(void)// Sends data to SBUF0
{
	if (!(EP1OUTCS & 0x02))
	{

		if(i<bcl)
		{

			SBUF0=EP1OUTBUF[i];
			i++;

			dum=D5ON;
	  		z^=1;
	  		if (z)
	  		{dum=D5OFF;}
		}
		else
		{
		 	EP1OUTBC = 0x40;// Arms EP1 endpoint
		}
	}
}

void transmit_1(void)// Sends data to SBUF1
{

	if (!(EP4CS & 0x04))
	{

		if(j < bcl_1)
		{

			SBUF1=EP4FIFOBUF[j];
			j++;

			dum_1=D7ON;
	  		w^=1;
	  		if (w)
	  		{dum_1=D7OFF;}
		}
		else
		{

		 	  OUTPKTEND =0x84;   //arming the EP4 OUT quadruple times, as it's quad buffered.
				SYNCDELAY;
			  OUTPKTEND =0x84;
				SYNCDELAY;
		}
	}
}

void  SerialInit ()
{

UART230 = 0X03;
SCON0  = 0x5A;
SCON1  = 0x5A;		    //	Set Serial Mode = 1, Recieve enable bit = 1

//comment out the below lines to use 230400 as baud rate
//EICON |= 0x80;      // serial port 1
//PCON |= 0x80;       // serial port 0

}

void  Serial0Init () // serial UART 0 with Timer 2 in mode 1 or high speed baud rate generator
{

    	    SCON0  = 0x5A;		    //	Set Serial Mode = 1, Recieve enable bit = 1
			T2CON  = 0x34;		    //	Int1 is detected on falling edge, Enable Timer0, Set Timer overflow Flag

		if ((LineCode[0] == 0x60) && (LineCode[1] == 0x09 ))	  // 2400

		{
    		RCAP2H = 0xFD;	     	//  Set TH2 value for timer2
			RCAP2L = 0x90;  		//	baud rate is set to 2400 baud
		}
   else if ((LineCode[0] == 0xC0) && (LineCode[1] == 0x12 ))	  // 4800

		{
    		RCAP2H = 0xFE;	     	//  Set TH2 value for timer2
			RCAP2L = 0xC8;  		//	baud rate is set to 4800 baud
		}
		else if ((LineCode[0] == 0x80) && (LineCode[1] == 0x25 ))	  // 9600

		{
    		RCAP2H = 0xFF;	     	//  Set TH2 value for timer2
			RCAP2L = 0x64;  		//	baud rate is set to 9600 baud
		}
		else if ((LineCode[0] == 0x00) && (LineCode[1] == 0x4B ))	  // 19200

		{
    		RCAP2H = 0xFF;	     	//  Set TH2 value for timer2
			RCAP2L = 0xB2;  		//	baud rate is set to 19200 baud
		}
		else if ((LineCode[0] == 0x80) && (LineCode[1] == 0x70 ))	  // 28800

		{
    		RCAP2H = 0xFF;	     	//  Set TH2 value for timer2
			RCAP2L = 0xCC;  		//	baud rate is set to 28800 baud
		}
		else if ((LineCode[0] == 0x00) && (LineCode[1] == 0x96 ))	  // 38400

		{
    		RCAP2H = 0xFF;	     	//  Set TH2 value for timer2
			RCAP2L = 0xD9;  		//	baud rate is set to 38400 baud
		}
		else if ((LineCode[0] == 0x00) && (LineCode[1] == 0xE1 ))	  // 57600

		{
    		RCAP2H = 0xFF;	     	//  Set TH2 value for timer2
			RCAP2L = 0xE6;  		//	baud rate is set to 57600 baud
		}

       	else //if ((LineCode[0] == 0x21) && (LineCode[1] == 0x20 ))	  // 115200 (LineCode[0] == 0x00) && (LineCode[1] == 0xC2 ))

		{
		   RCAP2L = 0xF3;
           RCAP2H = 0xFF;
		}

		TH2    = RCAP2H;		//  Upper 8 bit of 16 bit counter to FF
		TL2    = RCAP2L;		//  value of the lower 8 bits of timer set to baud rate


}






void TD_Init(void)             // Called once at startup
{


// set the CPU clock to 48MHz
     CPUCS = ((CPUCS & ~bmCLKSPD) | bmCLKSPD1) ;

   // set the slave FIFO interface to 48MHz
     IFCONFIG |= 0x40;
     SYNCDELAY;
     REVCTL = 0x03;
     SYNCDELAY;



	FIFORESET = 0x80; // activate NAK-ALL to avoid race conditions
	SYNCDELAY;       // see TRM section 15.14
	FIFORESET = 0x08; // reset, FIFO 8
	SYNCDELAY; //
	FIFORESET = 0x06; // reset, FIFO 8
	SYNCDELAY; //
	FIFORESET = 0x04; // reset, FIFO 8
	SYNCDELAY; //
	FIFORESET = 0x02; // reset, FIFO 8
	SYNCDELAY; //
	FIFORESET = 0x00; // deactivate NAK-ALL
	SYNCDELAY;


 	 EP1OUTCFG = 0xA0;    // Configure EP1OUT as BULK EP
	 SYNCDELAY;
     EP1INCFG = 0xB0;     // Configure EP1IN as INT IN EP
     SYNCDELAY;                    // see TRM section 15.14
     EP2CFG =  0xF2;       // Configure EP2 as INT IN, 512 bytes, double buffered
     SYNCDELAY;
     EP4CFG =  0xA0;      // Configure EP4 as bulk OUT EP
     SYNCDELAY;
     EP6CFG = 0xE2;      // Configure EP6 as bulk IN EP, 512 bytes, double buffered
     SYNCDELAY;

     EP8CFG = 0xE0;      // Configure EP8 as BULK IN EP
     SYNCDELAY;

     EP8FIFOCFG = 0x00;  // Configure EP8 FIFO in 8-bit Manual Commit mode
     SYNCDELAY;
     EP6FIFOCFG = 0x00;  // Configure EP6 FIFO in 8-bit Manual Commit mode
     SYNCDELAY;
	 EP4FIFOCFG = 0x00;  // Configure EP4 FIFO in 8-bit Manual Commit mode
     SYNCDELAY;
	 EP2FIFOCFG = 0x00;  // Configure EP2 FIFO in 8-bit Manual Commit mode
     SYNCDELAY;

  OUTPKTEND =0x84;   //arming the EP4 OUT quadruple times, as it's quad buffered.
  SYNCDELAY;
  OUTPKTEND =0x84;
  SYNCDELAY;
 OUTPKTEND =0x84;   //arming the EP4 OUT quadruple times, as it's quad buffered.
  SYNCDELAY;



     //T2CON  = 0x34;
//   EP4FIFOIE |= 0x0A;    // enable EP4 FIFO interrupts
//   INTSETUP |= 0X03;
    EPIE |= bmBIT5 | bmBIT3;              // Enable EP4 Endpoint interrupts
	//EPIE |= bmBIT3 ;              // Enable EP1 OUT Endpoint interrupts



	  AUTOPTRSETUP |= 0x01;         // enable dual autopointer feature
	  Rwuen = TRUE;                 // Enable remote-wakeup

	  EP1OUTBC = 0x04;
      SYNCDELAY;

	  EP4BCH = 0x00;
      SYNCDELAY;
	  EP4BCL = 0x04;
      SYNCDELAY;


ES0 = 1; /* enable serial interrupts */
ES1 = 1; /* enable serial interrupts */

PS0 = 1; /* set serial interrupts to low priority */
PS1 = 1;


TI = 1; /* clear transmit interrupt */
RI = 0; /* clear receiver interrupt */


TI1 = 1; /* clear transmit interrupt */
RI1 = 0; /* clear receiver interrupt */

EA = 1;   /* Enable Interrupts on INT0 and INT1 pin */
//IE |= 0xD0;  //enable all requires interrupts: global, serial port1,  serial port 2, external


SerialInit();




}

void TD_Poll(void)             // Called repeatedly while the device is idle
{

  // Serial State Notification that has to be sent periodically to the host

  if (!(EP1INCS & 0x02))      // check if EP1IN is available
  {
    EP1INBUF[0] = 0x0A;       // if it is available, then fill the first 10 bytes of the buffer with
	EP1INBUF[1] = 0x20;       // appropriate data.
	EP1INBUF[2] = 0x00;
	EP1INBUF[3] = 0x00;
	EP1INBUF[4] = 0x00;
	EP1INBUF[5] = 0x00;
	EP1INBUF[6] = 0x00;
	EP1INBUF[7] = 0x02;
    EP1INBUF[8] = 0x00;
	EP1INBUF[9] = 0x00;
  	EP1INBC = 10;            // manually commit once the buffer is filled
  }

  if ((EP2CS & 0x04))      // check if EP2 IN is available
  {
    EP2FIFOBUF[0] = 0x0A;       // if it is available, then fill the first 10 bytes of the buffer with
	EP2FIFOBUF[1] = 0x20;       // appropriate data.
	EP2FIFOBUF[2] = 0x00;
	EP2FIFOBUF[3] = 0x00;
	EP2FIFOBUF[4] = 0x00;
	EP2FIFOBUF[5] = 0x00;
	EP2FIFOBUF[6] = 0x00;
	EP2FIFOBUF[7] = 0x02;
    EP2FIFOBUF[8] = 0x00;
	EP2FIFOBUF[9] = 0x00;

  	EP2BCH = 0x00;
	SYNCDELAY;
	EP2BCL = 0x0A;
	SYNCDELAY;            // manually commit once the buffer is filled

  }


// recieving the data from the USB Host and send it out through UART



// recieve the data from UART and send it out to the USB Host



}

BOOL TD_Suspend(void)          // Called before the device goes into suspend mode
{
   return(TRUE);
}

BOOL TD_Resume(void)          // Called after the device resumes
{
   return(TRUE);
}

//-----------------------------------------------------------------------------
// Device Request hooks
//   The following hooks are called by the end point 0 device request parser.
//-----------------------------------------------------------------------------

BOOL DR_GetDescriptor(void)
{
   return(TRUE);
}

BOOL DR_SetConfiguration(void)   // Called when a Set Configuration command is received
{

   Configuration = SETUPDAT[2];
   return(TRUE);            // Handled by user code
}

BOOL DR_GetConfiguration(void)   // Called when a Get Configuration command is received
{
   EP0BUF[0] = Configuration;
   EP0BCH = 0;
   EP0BCL = 1;
   return(TRUE);            // Handled by user code
}

BOOL DR_SetInterface(void)       // Called when a Set Interface command is received
{
   AlternateSetting = SETUPDAT[2];
   return(TRUE);            // Handled by user code
}

BOOL DR_GetInterface(void)       // Called when a Set Interface command is received
{
   EP0BUF[0] = AlternateSetting;
   EP0BCH = 0;
   EP0BCL = 1;
   return(TRUE);            // Handled by user code
}

BOOL DR_GetStatus(void)
{
   return(TRUE);
}

BOOL DR_ClearFeature(void)
{
   return(TRUE);
}

BOOL DR_SetFeature(void)
{
   return(TRUE);
}

BOOL DR_VendorCmnd(void)
{
   return(TRUE);
}

//-----------------------------------------------------------------------------
// USB Interrupt Handlers
//   The following functions are called by the USB interrupt jump table.
//-----------------------------------------------------------------------------

// Setup Data Available Interrupt Handler


void ISR_Sudav(void) interrupt 0
{

   GotSUD = TRUE;            // Set flag
   EZUSB_IRQ_CLEAR();
   USBIRQ = bmSUDAV;         // Clear SUDAV IRQ
}

// Setup Token Interrupt Handler
void ISR_Sutok(void) interrupt 0
{
   EZUSB_IRQ_CLEAR();
   USBIRQ = bmSUTOK;         // Clear SUTOK IRQ
}

void ISR_Sof(void) interrupt 0
{
   EZUSB_IRQ_CLEAR();
   USBIRQ = bmSOF;            // Clear SOF IRQ
}

void ISR_Ures(void) interrupt 0
{
   if (EZUSB_HIGHSPEED())
   {
      pConfigDscr = pHighSpeedConfigDscr;
      pOtherConfigDscr = pFullSpeedConfigDscr;
   }
   else
   {
      pConfigDscr = pFullSpeedConfigDscr;
      pOtherConfigDscr = pHighSpeedConfigDscr;
   }

   EZUSB_IRQ_CLEAR();
   USBIRQ = bmURES;         // Clear URES IRQ
}

void ISR_Susp(void) interrupt 0
{
    Sleep = TRUE;
   EZUSB_IRQ_CLEAR();
   USBIRQ = bmSUSP;

}

void ISR_Highspeed(void) interrupt 0
{
   if (EZUSB_HIGHSPEED())
   {
      pConfigDscr = pHighSpeedConfigDscr;
      pOtherConfigDscr = pFullSpeedConfigDscr;
   }
   else
   {
      pConfigDscr = pFullSpeedConfigDscr;
      pOtherConfigDscr = pHighSpeedConfigDscr;
   }

   EZUSB_IRQ_CLEAR();
   USBIRQ = bmHSGRANT;
}
void ISR_Ep0ack(void) interrupt 0
{
}
void ISR_Stub(void) interrupt 0
{
}
void ISR_Ep0in(void) interrupt 0
{
}
void ISR_Ep0out(void) interrupt 0
{


}
void ISR_Ep1in(void) interrupt 0
{
}


void ISR_Ep1out(void) interrupt 0// Places first byte of EP1 OUT buffer in SBUF0
{

	EZUSB_IRQ_CLEAR();		//Clears the USB interrupt
	EPIRQ = bmBIT3;			//Clears EP1 OUT interrupt request
    while (TI == 1) ;

  	i=0;
  	bcl=EP1OUTBC;
	SBUF0=EP1OUTBUF[i];
	i++;


}
void ISR_Ep2inout(void) interrupt 0
{
}
void ISR_Ep4inout(void) interrupt 0
{

	EZUSB_IRQ_CLEAR();		//Clears the USB interrupt
	EPIRQ = bmBIT5;			//Clears EP4 OUT interrupt request


	while (TI1 == 1) ;

  	j=0;
  	bcl_1 = (EP4BCH<<4) | (EP4BCL);
	SBUF1=EP4FIFOBUF[j];
	j++;
}
void ISR_Ep6inout(void) interrupt 0
{
}
void ISR_Ep8inout(void) interrupt 0
{
}
void ISR_Ibn(void) interrupt 0
{
}
void ISR_Ep0pingnak(void) interrupt 0
{
}
void ISR_Ep1pingnak(void) interrupt 0
{
}
void ISR_Ep2pingnak(void) interrupt 0
{
}
void ISR_Ep4pingnak(void) interrupt 0
{
}
void ISR_Ep6pingnak(void) interrupt 0
{
}
void ISR_Ep8pingnak(void) interrupt 0
{
}
void ISR_Errorlimit(void) interrupt 0
{
}
void ISR_Ep2piderror(void) interrupt 0
{
}
void ISR_Ep4piderror(void) interrupt 0
{
}
void ISR_Ep6piderror(void) interrupt 0
{
}
void ISR_Ep8piderror(void) interrupt 0
{
}
void ISR_Ep2pflag(void) interrupt 0
{
}
void ISR_Ep4pflag(void) interrupt 0
{
}
void ISR_Ep6pflag(void) interrupt 0
{
}
void ISR_Ep8pflag(void) interrupt 0
{
}
void ISR_Ep2eflag(void) interrupt 0
{
}
void ISR_Ep4eflag(void) interrupt 0
{
}
void ISR_Ep6eflag(void) interrupt 0
{
}
void ISR_Ep8eflag(void) interrupt 0
{
}
void ISR_Ep2fflag(void) interrupt 0
{
}
void ISR_Ep4fflag(void) interrupt 0
{
}
void ISR_Ep6fflag(void) interrupt 0
{
}
void ISR_Ep8fflag(void) interrupt 0
{
}
void ISR_GpifComplete(void) interrupt 0
{
}
void ISR_GpifWaveform(void) interrupt 0
{
}
