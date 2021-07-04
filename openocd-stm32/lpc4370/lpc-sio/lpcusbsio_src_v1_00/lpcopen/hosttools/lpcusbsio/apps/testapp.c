/*
 * @brief LPC USB serial I/O test application
 *
 * @note
 * Copyright(C) NXP Semiconductors, 2013
 * All rights reserved.
 *
 * @par
 * Software that is described herein is for illustrative purposes only
 * which provides customers with programming information regarding the
 * LPC products.  This software is supplied "AS IS" without any warranties of
 * any kind, and NXP Semiconductors and its licensor disclaim any and
 * all warranties, express or implied, including all implied warranties of
 * merchantability, fitness for a particular purpose and non-infringement of
 * intellectual property rights.  NXP Semiconductors assumes no responsibility
 * or liability for the use of the software, conveys no license or rights under any
 * patent, copyright, mask work right, or any other intellectual property rights in
 * or to any products. NXP Semiconductors reserves the right to make changes
 * in the software without notification. NXP Semiconductors also makes no
 * representation or warranty that such application will be suitable for the
 * specified use without further testing or modification.
 *
 * @par
 * Permission to use, copy, modify, and distribute this software and its
 * documentation is hereby granted, under NXP Semiconductors' and its
 * licensor's relevant copyrights in the software, without fee, provided that it
 * is used in conjunction with NXP Semiconductors microcontrollers.  This
 * copyright, permission, and disclaimer notice must appear in all copies of
 * this code.
 */

#include <string.h>
#include <stdlib.h>
#include <stdio.h>
#include <wchar.h>
#include <string.h>
// Headers needed for sleeping.
#ifdef _WIN32
#include <windows.h>
#else
#include <unistd.h>
#endif

#include "lpcusbsio.h"

/*****************************************************************************
 * Private types/enumerations/variables
 ****************************************************************************/
#define USE_XFER

static LPC_HANDLE g_hI2CPort = NULL;

/*****************************************************************************
 * Public types/enumerations/variables
 ****************************************************************************/

/*****************************************************************************
 * Private functions
 ****************************************************************************/

/*****************************************************************************
 * Public functions
 ****************************************************************************/

int main(int argc, char *argv[])
{
	int res;

	I2C_PORTCONFIG_T cfgParam;
	I2C_FAST_XFER_T xfer;

	res = I2C_GetNumPorts();

	if (res > 0) {
		printf("Total I2C devices: %d \r\n ", res);

		/*open device at index 0 */
		g_hI2CPort = I2C_Open(0);

		cfgParam.ClockRate = I2C_CLOCK_STANDARD_MODE;
		cfgParam.Options = 0;
		/*Init the I2C port for standard speed communication */
		res = I2C_Init(g_hI2CPort, &cfgParam);

		if (res < 0) {
			printf("Unable to init I2C port.\n");
			printf("%ls", I2C_Error(g_hI2CPort));
		}
		else {
			int i;
			uint8_t buff[8] = {0x06, 0x55, 0x0, };

			printf("Device version: %s \r\n ", I2C_GetVersion(g_hI2CPort));

			xfer.options = 0;
			xfer.txSz = 0;
			xfer.rxSz = 1;
			xfer.rxBuff = &buff[0];

			printf("Probing available I2C devices...\r\n");
			printf("\r\n     00 01 02 03 04 05 06 07 08 09 0A 0B 0C 0D 0E 0F");
			printf("\r\n====================================================");
			for (i = 0; i <= 0x7F; i++) {
				if (!(i & 0x0F)) {
					printf("\r\n%02X  ", i >> 4);
				}
				if ((i <= 7) || (i > 0x78)) {
					printf("   ");
					continue;
				}

#ifndef USE_XFER
				res = I2C_DeviceRead(
					g_hI2CPort,
					i,
					buff,
					1,
					I2C_TRANSFER_OPTIONS_START_BIT | I2C_TRANSFER_OPTIONS_STOP_BIT |
					I2C_TRANSFER_OPTIONS_NACK_LAST_BYTE);
#else
				xfer.slaveAddr = i;
				res = I2C_FastXfer(g_hI2CPort, &xfer);
#endif
				if (res > 0) {
					printf(" %02X", i);
				}
				else {
					if (res == LPCUSBSIO_ERR_TIMEOUT) {
						/* issue reset to break loops */
						I2C_Reset(g_hI2CPort);
					}
					printf(" --");
				}
			}
			printf("\r\n");

			res = 2;
			buff[0] = 0x16;
			buff[1] = 0x55;
			buff[2] = 0x00;
			buff[3] = 0x55;
			buff[4] = 0x00;

			xfer.options = 0;
			xfer.txSz = 5;
			xfer.rxSz = 0;
			xfer.txBuff = &buff[0];
			xfer.slaveAddr = 0x60;

			while (res > 0) {
#ifndef USE_XFER
				res = I2C_DeviceWrite(g_hI2CPort,
									  0x60,
									  buff,
									  5,
									  I2C_TRANSFER_OPTIONS_START_BIT | I2C_TRANSFER_OPTIONS_STOP_BIT);
#else
				res = I2C_FastXfer(g_hI2CPort, &xfer);
#endif

#ifdef WIN32
				Sleep(500);
#else
				usleep(500 * 1000);
#endif
				/* swap LED toggles */
				buff[2] = buff[1];
				buff[1] ^= 0x55;
				/* do the same for green LEDs */
				buff[3] = buff[1];
				buff[4] = buff[2];

			}
			printf("Error: %ls", I2C_Error(g_hI2CPort));

		}

	}
	else {
		printf("Error: No free ports. \r\n");
	}
	printf("Exiting \r\n");
	return 0;
}
