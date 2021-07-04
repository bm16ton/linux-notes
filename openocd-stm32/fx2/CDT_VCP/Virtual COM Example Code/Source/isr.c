#include <stdio.h>
#include "fx2.h"
#include "fx2regs.h"
#include "fx2sdly.h"
//extern WriteByteS0();
extern	transmit();
extern  transmit_1();
xdata volatile unsigned char D2ON         _at_ 0x8800;
xdata volatile unsigned char D2OFF        _at_ 0x8000;
xdata volatile unsigned char D4ON         _at_ 0x8100;      
xdata volatile unsigned char D4OFF        _at_ 0x8200;      
unsigned char dut;
unsigned char dut_1;
static int w;
static int v;

void ISR_USART(void) interrupt 4
  { 
	if (RI)
		{  
			if((EP2468STAT & bmEP8EMPTY))   // check if EP8 is empty
	  			{  
			  		 RI=0;
					 EP8FIFOBUF [0] = SBUF0;// copies received data to SBUF0
					 EP8BCH = 0;    
			         SYNCDELAY;   
			         EP8BCL = 1; 
			         SYNCDELAY;  
				     dut=D2ON;
				     w^=1;	
					 if (w)
				       {
				           dut=D2OFF;
						} 
		      	}
	 	}
	   	if (TI)
			{	
				TI=0;
				transmit();
    	   	}
}
  
void ISR_USART1(void) interrupt 7       // SERIAL PORT 1 INTERRUPT
{

	if (RI1)
		{  
			if((EP2468STAT & bmEP6EMPTY))   // check if EP6 is empty
	  			{  
			  		 RI1=0;
					 EP6FIFOBUF [0] = SBUF1;// copies received data to SBUF0
					 EP6BCH = 0;    
			         SYNCDELAY;   
			         EP6BCL = 1; 
			         SYNCDELAY;  
				     dut_1=D4ON;
				     v^=1;	
					 if (v)
				       {
				           dut_1=D4OFF;
						} 
		      	}
	 	}
	   		if (TI1)
				{	
					TI1=0;
					transmit_1();
	    	   	}
   }
 

