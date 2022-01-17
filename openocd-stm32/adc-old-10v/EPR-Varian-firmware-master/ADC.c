#include "all.h" 
 
                                 
 unsigned int SPI_MasterTransmitSoft(unsigned int data)
 {
   register unsigned  char i;
   //register unsigned int tmp=0;
   
   for (i=0; i<16; i++) {
     
     if (BitOn( data, 15)) SetBit(PB, MOSI); else ClrBit(PB, MOSI);
       
     data <<=1;
     ClrBit(PB, SCK);
     
     if (BitOn(PINB, MISO)) data |= 1; 
      
     SetBit(PB, SCK);
      
   } /* for */
   
   return data;
 }
  
 unsigned int GetADCResult1(unsigned char channel) 
 { 
   unsigned int result, tmp;
   /* write data to ADC  */
   ClrBit(PB, RFS);
   tmp = channel;
   tmp <<= 13;
   tmp |= (1<<12);   /*  set CONVST bit   */ 
   
   result = SPI_MasterTransmitSoft(tmp);  /* select channel*/
   SetBit(PB, RFS);
   Wait(100);
        
   /* read data from ADC  */
   ClrBit(PB, RFS);
   _NOP();
   result = SPI_MasterTransmitSoft(0);  /* read 1st byte */
                
   result &= 0x0FFF;
     
   SetBit(PB, RFS);
   Wait(1);
   return result; 
 }
 
 unsigned int GetADCResult(unsigned char channel)
 { 
 register unsigned int res;
  
 res = GetADCResult1(channel);
 res = GetADCResult1(channel);
 
 return res; 
 } 
