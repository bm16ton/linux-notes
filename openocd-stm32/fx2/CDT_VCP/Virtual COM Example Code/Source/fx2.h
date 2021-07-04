//-----------------------------------------------------------------------------
//   File:      FX2.h
//   Contents:  EZ-USB FX2/FX2LP/FX1 constants, macros, datatypes, globals, and library
//              function prototypes.
//
// $Archive: /USB/Target/Inc/Fx2.h $
// $Date: 3/23/05 2:30p $
// $Revision: 16 $
//
//   Copyright (c) 2005 Cypress Semiconductor, All rights reserved
//-----------------------------------------------------------------------------
#ifndef FX2_H     //Header sentry
#define FX2_H
#endif
#define INTERNAL_DSCR_ADDR 0x0080   // Relocate Descriptors to 0x80
#define bmSTRETCH 0x07
#define FW_STRETCH_VALUE 0x0      // Set stretch to 0 in frameworks

//-----------------------------------------------------------------------------
// Constants
//-----------------------------------------------------------------------------
#define   TRUE    1
#define FALSE   0

#define bmBIT0   0x01
#define bmBIT1   0x02
#define bmBIT2   0x04
#define bmBIT3   0x08
#define bmBIT4   0x10
#define bmBIT5   0x20
#define bmBIT6   0x40
#define bmBIT7   0x80

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

//////////////////////////////////////////////////////////////////////////////
//Added for HID

#define SETUP_MASK				0x60	//Used to mask off request type
#define SETUP_STANDARD_REQUEST	0		//Standard Request
#define SETUP_CLASS_REQUEST		0x20	//Class Request
#define SETUP_VENDOR_REQUEST	0x40	//Vendor Request
#define SETUP_RESERVED_REQUEST 	0x60	//Reserved or illegal request

//////////////////////////////////////////////////////////////////////////////


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

#define SWAP_ENDIAN(word)   ((BYTE*)&word)[0] ^= ((BYTE*)&word)[1];\
