/*
 * erase_eeprom.c -- FX2: erase connected EEPROM. 
 * 
 * Copyright (c) 2009 by Wolfgang Wieser ] wwieser (a) gmx <*> de [ 
 * 
 * This file may be distributed and/or modified under the terms of the 
 * GNU General Public License version 2 as published by the Free Software 
 * Foundation. (See COPYING.GPL for details.)
 * 
 * This file is provided AS IS with NO WARRANTY OF ANY KIND, INCLUDING THE
 * WARRANTY OF DESIGN, MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE.
 * 
 */

#include <fx2regs.h>
#define SYNCDELAY       _asm  nop; _endasm
        
#define I2CREAD     0x01    /* 00000001 */
#define I2CWRITE    0x00    /* 00000000 */
#define EEPROM_ADR  0xa2    /* 1010 A2 A1 A0 RW -> 1010 0010 */

typedef unsigned char uint8;
typedef unsigned short uint16;

#define I2CS_START   0x80
#define I2CS_STOP    0x40
#define I2CS_LASTRD  0x20
#define I2CS_ACK     0x02
#define I2CS_DONE    0x01


// Write one byte into EEPROM. 
// This takes about 3msec for the Microchip 24LC64. 
// Returns 0 on success and >0 on error. 
// Will wait for write operation to complete (ACK polling). 
static uint8 EEErase(uint16 ee_adr)
{
	I2CS = I2CS_START; 
	I2DAT = EEPROM_ADR | I2CWRITE;
	while(!(I2CS & I2CS_DONE));
	
	// If ACK is set, the slave acknowledges (OK). 
	if(!(I2CS & I2CS_ACK)) return(1);
	
	// Write high address. 
	I2DAT = (ee_adr>>8);
	while(!(I2CS & I2CS_DONE));
	
	// If ACK is set, the slave acknowledges (OK). 
	if(!(I2CS & I2CS_ACK)) return(2);
	
	// Write low addres. 
	I2DAT = (ee_adr & 0xff);
	while(!(I2CS & I2CS_DONE));
	
	// If ACK is set, the slave acknowledges (OK). 
	if(!(I2CS & I2CS_ACK)) return(3);
	
	// Write data. 
	I2DAT = 0xff;
	while(!(I2CS & I2CS_DONE));
	
	I2CS = I2CS_STOP;
	// If ACK is set, the slave acknowledges (OK). 
	if(!(I2CS & I2CS_ACK)) return(4);
	
	// Wait for WRITE to complete (ACK polling). 
	for(;;)
	{
		I2CS = I2CS_START; 
		I2DAT = EEPROM_ADR | I2CWRITE;
		while(!(I2CS & I2CS_DONE));
		
		if((I2CS & I2CS_ACK)) break;
	}
	
	return(0);
}


void main(void)
{
	uint16 adr;
	
	// Sett 400kHz: 
	I2CTL = 0x01;
	
	// Erase 8192 bytes of EEPROM. 
	for(adr=0; adr<8192; adr++)
	{
		if(EEErase(adr)) break;
	}
	
	for(;;);
}
