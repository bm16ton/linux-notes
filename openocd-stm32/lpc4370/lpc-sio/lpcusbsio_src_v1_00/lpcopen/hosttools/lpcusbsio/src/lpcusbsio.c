/*
 * @brief LPC USB serial I/O interface definition
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
#include "hidapi.h"
#include "lpcusbsio.h"
#include "lpcusbsio_i2c.h"

/* ###############
    TODO LIST
    ----------
    - cpu_to _le convertion
    - Reset

 */
/*****************************************************************************
 * Private types/enumerations/variables
 ****************************************************************************/

#define NUM_LIB_ERR_STRINGS         3
#define NUM_FW_ERR_STRINGS          6
#define NUM_BRIDGE_ERR_STRINGS      4

#define MAX_XFER_TX_LENGTH          (HID_I2C_PACKET_SZ - sizeof(HID_I2C_OUT_REPORT_T) - sizeof(HID_I2C_XFER_PARAMS_T))
#define MAX_XFER_RX_LENGTH          (HID_I2C_PACKET_SZ - sizeof(HID_I2C_IN_REPORT_T))
#define MAX_WRITE_LENGTH            (HID_I2C_PACKET_SZ - sizeof(HID_I2C_OUT_REPORT_T) - sizeof(HID_I2C_RW_PARAMS_T))
#define MAX_READ_LENGTH             (HID_I2C_PACKET_SZ - sizeof(HID_I2C_IN_REPORT_T))

typedef struct LPCUSBSIO_I2C_Ctrl {
	struct hid_device_info *hidInfo;

	hid_device *hidDev;
	int32_t status;
	uint8_t sesionId;
	uint8_t transId;
	char fwVersion[60];
	uint8_t outPacket[HID_I2C_PACKET_SZ + 1];
	uint8_t inPacket[HID_I2C_PACKET_SZ + 1];

	struct LPCUSBSIO_I2C_Ctrl *next;

} LPCUSBSIO_I2C_Ctrl_t;

struct LPCUSBSIO_Ctrl {
	struct hid_device_info *devInfoList;

	LPCUSBSIO_I2C_Ctrl_t *devList;
};

static const char *g_LibVersion = "LPCUSBSIO v1.00 (" __DATE__ " " __TIME__ ")";
static const char *g_fwInitVer = "FW Ver Unavailable";
static char g_Version[128];

static struct LPCUSBSIO_Ctrl g_Ctrl = {0, };

static const wchar_t *g_LibErrMsgs[NUM_LIB_ERR_STRINGS] = {
	L"No errors are recorded.",
	L"HID library error.",							/* LPCUSBSIO_ERR_HID_LIB */
	L"Handle passed to the function is invalid.",	/* LPCUSBSIO_ERR_BAD_HANDLE */
};

static const wchar_t *g_fwErrMsgs[NUM_FW_ERR_STRINGS] = {
	L"Firmware error.",								/* catch-all firmware error */
	L"Fatal error happend",							/* LPCUSBSIO_ERR_FATAL */
	L"Transfer aborted due to NAK",					/* LPCUSBSIO_ERR_I2C_NAK */
	L"Transfer aborted due to bus error",			/* LPCUSBSIO_ERR_I2C_BUS */
	L"No acknowdlegement received from slave address",	/* LPCUSBSIO_ERR_I2C_SLAVE_NAK */
	L"I2C bus arbitration lost to other master",	/* LPCUSBSIO_ERR_I2C_SLAVE_NAK */
};

static const wchar_t *g_BridgeErrMsgs[NUM_BRIDGE_ERR_STRINGS] = {
	L"Transaction timed out.",						/* LPCUSBSIO_ERR_TIMEOUT */
	L"Invalid HID_I2C Request or Request not supported in this version.",	/* LPCUSBSIO_ERR_INVALID_CMD */
	L"Invalid parameters are provided for the given Request.",	/* LPCUSBSIO_ERR_INVALID_PARAM */
	L" Partial transfer completed.",						/* LPCUSBSIO_ERR_PARTIAL_DATA */
};

/*****************************************************************************
 * Public types/enumerations/variables
 ****************************************************************************/

/*****************************************************************************
 * Private functions
 ****************************************************************************/

static struct hid_device_info *GetDevAtIndex(uint32_t index) {
	struct hid_device_info *cur_dev = g_Ctrl.devInfoList;
	int32_t count = 0;

	while (cur_dev) {
		if (count++ == index) {
			break;
		}

		cur_dev = cur_dev->next;
	}
	return cur_dev;
}

static int32_t validHandle(LPCUSBSIO_I2C_Ctrl_t *dev)
{
	LPCUSBSIO_I2C_Ctrl_t *curDev = g_Ctrl.devList;

	while (dev != curDev) {
		curDev = curDev->next;
	}

	return (curDev == NULL) ? 0 : 1;
}

static void freeDevice(LPCUSBSIO_I2C_Ctrl_t *dev)
{
	LPCUSBSIO_I2C_Ctrl_t *curDev = g_Ctrl.devList;

	if (curDev == dev) {
		g_Ctrl.devList = dev->next;
	}
	else {
		while (curDev) {
			if (curDev->next == dev) {
				/* update linked list */
				curDev->next = dev->next;
				break;
			}
		}
	}
	free(dev);

	/* unload HID library if all devices are closed. */
	if (g_Ctrl.devList == NULL) {
		hid_free_enumeration(g_Ctrl.devInfoList);
		hid_exit();
	}
}

static const wchar_t *GetErrorString(int32_t err)
{
	const wchar_t *retStr = g_LibErrMsgs[0];
	int index = abs(err);

	if (index < 0x10) {
		retStr = (index < NUM_LIB_ERR_STRINGS) ? g_LibErrMsgs[index] : g_LibErrMsgs[0];
	}
	else if (index < 0x20) {
		index -= 0x10;
		retStr = (index < NUM_FW_ERR_STRINGS) ? g_fwErrMsgs[index] : g_fwErrMsgs[0];
	}
	else if (index < 0x20) {
		index -= 0x30;
		retStr = (index < NUM_BRIDGE_ERR_STRINGS) ? g_BridgeErrMsgs[index] : g_LibErrMsgs[0];
	}

	return retStr;
}

static int32_t ConvertResp(int32_t res)
{
	int ret;

	if (res == HID_I2C_RES_OK) {
		ret = LPCUSBSIO_OK;
	}
	else {
		ret = -(res + 0x10);
	}
	return ret;
}

static int32_t I2C_SendRequest(LPCUSBSIO_I2C_Ctrl_t *dev, uint8_t req, uint32_t paramLen)
{
	HID_I2C_OUT_REPORT_T *pOut;
	HID_I2C_IN_REPORT_T *pIn;
	int32_t res = 0;

	/* construct I2C_INIT request and send to device. */
	dev->outPacket[0] = 0;
	dev->status = LPCUSBSIO_OK;
	pOut = (HID_I2C_OUT_REPORT_T *) &dev->outPacket[1];
	pOut->sesId = dev->sesionId;
	pOut->transId = dev->transId++;
	pOut->req = req;
	pOut->length = HID_I2C_HEADER_SZ + paramLen;

	res = hid_write(dev->hidDev, &dev->outPacket[0], HID_I2C_PACKET_SZ + 1);

	while (res > 0) {
		res = hid_read_timeout(dev->hidDev, &dev->inPacket[0], HID_I2C_PACKET_SZ + 1, LPCUSBSIO_READ_TMO);
		// res = hid_read(dev->hidDev, &dev->inPacket[0], HID_I2C_PACKET_SZ + 1);

		if (res > 0) {
			/* check reponse received from LPC */
			pIn = (HID_I2C_IN_REPORT_T *) &dev->inPacket[0];
			if (pIn->transId != pOut->transId) {
				/* May be previous response discard it. */
				continue;
			}
			else {
				/* update status */
				res = ConvertResp(pIn->resp);
				break;
			}
		}
		else if (res == 0) {
			res = LPCUSBSIO_ERR_TIMEOUT;
			break;
		}
	}

	return dev->status = res;
}

/*****************************************************************************
 * Public functions
 ****************************************************************************/

LPCUSBSIO_API int32_t I2C_GetNumPorts(void)
{
	struct hid_device_info *cur_dev;

	int32_t count = 0;

	/* free any HID device structures if we were called previously */
	if (g_Ctrl.devInfoList != NULL) {
		hid_free_enumeration(g_Ctrl.devInfoList);
		g_Ctrl.devInfoList = NULL;
	}

	g_Ctrl.devInfoList = hid_enumerate(LPCUSBSIO_VID, LPCUSBSIO_PID);
	cur_dev = g_Ctrl.devInfoList;
	while (cur_dev) {
		count++;
		cur_dev = cur_dev->next;
	}

	return count;
}

LPCUSBSIO_API LPC_HANDLE I2C_Open(uint32_t index)
{
	hid_device *pHid = NULL;
	LPCUSBSIO_I2C_Ctrl_t *dev = NULL;
	struct hid_device_info *cur_dev = GetDevAtIndex(index);

	if (cur_dev) {
		pHid = hid_open_path(cur_dev->path);

		if (pHid) {
			dev = malloc(sizeof(LPCUSBSIO_I2C_Ctrl_t));
			memset(dev, 0, sizeof(LPCUSBSIO_I2C_Ctrl_t));
			dev->hidDev = pHid;
			dev->hidInfo = cur_dev;
			dev->sesionId = rand();
			dev->status = LPCUSBSIO_OK;
			memcpy(&dev->fwVersion[0], g_fwInitVer, strlen(g_fwInitVer));

			/* insert at top */
			dev->next = g_Ctrl.devList;
			g_Ctrl.devList = dev;
			/* Set all calls to this hid device as blocking. */
			// hid_set_nonblocking(dev->hidDev, 0);

		}
	}
	return (LPC_HANDLE) dev;
}

LPCUSBSIO_API int32_t I2C_Init(LPC_HANDLE handle, I2C_PORTCONFIG_T *config)
{
	LPCUSBSIO_I2C_Ctrl_t *dev = (LPCUSBSIO_I2C_Ctrl_t *) handle;
	int32_t res;
	HID_I2C_IN_REPORT_T *pIn;

	if ((validHandle(handle) == 0) || (config == NULL)) {
		return LPCUSBSIO_ERR_BAD_HANDLE;
	}

	memcpy(&dev->outPacket[HID_I2C_HEADER_SZ + 1], config, sizeof(I2C_PORTCONFIG_T));
	res = I2C_SendRequest(dev, HID_I2C_REQ_INIT_PORT, sizeof(I2C_PORTCONFIG_T));
	if (res == LPCUSBSIO_OK) {
		/* parse response */
		pIn = (HID_I2C_IN_REPORT_T *) &dev->inPacket[0];
		res = pIn->length - HID_I2C_HEADER_SZ;
		/* copy data back to user buffer */
		memcpy(&dev->fwVersion[0], &pIn->data[0], res);
	}

	return res;
}

LPCUSBSIO_API int32_t I2C_Close(LPC_HANDLE handle)
{
	LPCUSBSIO_I2C_Ctrl_t *dev = (LPCUSBSIO_I2C_Ctrl_t *) handle;
	int32_t res;

	if (validHandle(handle) == 0) {
		return LPCUSBSIO_ERR_BAD_HANDLE;
	}

	res = I2C_SendRequest(dev, HID_I2C_REQ_DEINIT_PORT, 0);
	hid_close(dev->hidDev);
	freeDevice(dev);

	return LPCUSBSIO_OK;
}

LPCUSBSIO_API int32_t I2C_DeviceRead(LPC_HANDLE handle,
									 uint8_t deviceAddress,
									 uint8_t *buffer,
									 uint16_t sizeToTransfer,
									 uint8_t options)
{
	LPCUSBSIO_I2C_Ctrl_t *dev = (LPCUSBSIO_I2C_Ctrl_t *) handle;
	int32_t res;
	HID_I2C_RW_PARAMS_T param;
	HID_I2C_IN_REPORT_T *pIn;

	if (validHandle(handle) == 0) {
		return LPCUSBSIO_ERR_BAD_HANDLE;
	}

	/* do parameter check */
	if ((sizeToTransfer > MAX_READ_LENGTH) ||
		((sizeToTransfer > 0) && (buffer == NULL)) ||
		(deviceAddress > 127)) {

		return LPCUSBSIO_ERR_INVALID_PARAM;
	}

	param.length = sizeToTransfer;
	param.options = options;
	param.slaveAddr = deviceAddress;
	memcpy(&dev->outPacket[HID_I2C_HEADER_SZ + 1], &param, sizeof(HID_I2C_RW_PARAMS_T));

	res = I2C_SendRequest(dev, HID_I2C_REQ_DEVICE_READ, sizeof(HID_I2C_RW_PARAMS_T));
	if (res == LPCUSBSIO_OK) {
		/* parse response */
		pIn = (HID_I2C_IN_REPORT_T *) &dev->inPacket[0];
		res = pIn->length - HID_I2C_HEADER_SZ;
		/* copy data back to user buffer */
		memcpy(buffer, &pIn->data[0], res);
	}

	return res;
}

LPCUSBSIO_API int32_t I2C_DeviceWrite(LPC_HANDLE handle,
									  uint8_t deviceAddress,
									  uint8_t *buffer,
									  uint16_t sizeToTransfer,
									  uint8_t options)
{
	LPCUSBSIO_I2C_Ctrl_t *dev = (LPCUSBSIO_I2C_Ctrl_t *) handle;
	int32_t res;
	HID_I2C_RW_PARAMS_T param;
	uint8_t *desBuff;

	if (validHandle(handle) == 0) {
		return LPCUSBSIO_ERR_BAD_HANDLE;
	}

	/* do parameter check */
	if ((sizeToTransfer > MAX_WRITE_LENGTH) ||
		((sizeToTransfer > 0) && (buffer == NULL)) ||
		(deviceAddress > 127)) {

		return LPCUSBSIO_ERR_INVALID_PARAM;
	}

	param.length = sizeToTransfer;
	param.options = options;
	param.slaveAddr = deviceAddress;
	desBuff = &dev->outPacket[HID_I2C_HEADER_SZ + 1];
	/* copy params */
	memcpy(desBuff, &param, sizeof(HID_I2C_RW_PARAMS_T));
	desBuff += sizeof(HID_I2C_RW_PARAMS_T);
	/* copy data buffer now */
	memcpy(desBuff, buffer, sizeToTransfer);

	res = I2C_SendRequest(dev, HID_I2C_REQ_DEVICE_WRITE, sizeof(HID_I2C_RW_PARAMS_T));

	if (res == LPCUSBSIO_OK) {
		/* update user on transfered size */
		res = sizeToTransfer;
	}

	return res;
}

LPCUSBSIO_API int32_t I2C_FastXfer(LPC_HANDLE handle, I2C_FAST_XFER_T *xfer)
{
	LPCUSBSIO_I2C_Ctrl_t *dev = (LPCUSBSIO_I2C_Ctrl_t *) handle;
	int32_t res;
	HID_I2C_XFER_PARAMS_T param;
	HID_I2C_IN_REPORT_T *pIn;
	uint8_t *desBuff;

	if (validHandle(handle) == 0) {
		return LPCUSBSIO_ERR_BAD_HANDLE;
	}

	/* do parameter check */
	if ((xfer->txSz > MAX_XFER_TX_LENGTH) || (xfer->rxSz > MAX_XFER_RX_LENGTH) ||
		((xfer->txSz > 0) && (xfer->txBuff == NULL)) ||
		((xfer->rxSz > 0) && (xfer->rxBuff == NULL)) ||
		(xfer->slaveAddr > 127) ) {

		return LPCUSBSIO_ERR_INVALID_PARAM;
	}

	param.txLength = xfer->txSz;
	param.rxLength = xfer->rxSz;
	param.options = xfer->options;
	param.slaveAddr = xfer->slaveAddr;
	desBuff = &dev->outPacket[HID_I2C_HEADER_SZ + 1];
	/* copy params */
	memcpy(desBuff, &param, sizeof(HID_I2C_XFER_PARAMS_T));
	desBuff += sizeof(HID_I2C_XFER_PARAMS_T);
	/* copy data buffer now */
	memcpy(desBuff, &xfer->txBuff[0], xfer->txSz);

	res = I2C_SendRequest(dev, HID_I2C_REQ_DEVICE_XFER, sizeof(HID_I2C_XFER_PARAMS_T) + xfer->txSz);

	if (res == LPCUSBSIO_OK) {
		/* parse response */
		pIn = (HID_I2C_IN_REPORT_T *) &dev->inPacket[0];
		res = pIn->length - HID_I2C_HEADER_SZ;
		if (res != 0) {
			/* copy data back to user buffer */
			memcpy(&xfer->rxBuff[0], &pIn->data[0], res);
		}
		else {
			/* else it should be Tx only transfer. Update transferred size. */
			res = xfer->txSz;
		}
	}

	return res;
}

LPCUSBSIO_API int32_t I2C_Reset(LPC_HANDLE handle)
{
	LPCUSBSIO_I2C_Ctrl_t *dev = (LPCUSBSIO_I2C_Ctrl_t *) handle;
	int32_t res;

	if (validHandle(handle) == 0) {
		return LPCUSBSIO_ERR_BAD_HANDLE;
	}

	res = I2C_SendRequest(dev, HID_I2C_REQ_RESET, 0);

	return res;
}

LPCUSBSIO_API const wchar_t *I2C_Error(LPC_HANDLE handle)
{
	LPCUSBSIO_I2C_Ctrl_t *dev = (LPCUSBSIO_I2C_Ctrl_t *) handle;
	const wchar_t *retStr = NULL;

	if (validHandle(handle) != 0) {
		if ((dev->status == LPCUSBSIO_OK) || (LPCUSBSIO_ERR_HID_LIB == dev->status)) {
			retStr = hid_error(dev->hidDev);
		}
		else {
			retStr = GetErrorString(dev->status);
		}
	}
	else {
		retStr = hid_error(NULL);
	}

	return retStr;
}

LPCUSBSIO_API const char *I2C_GetVersion(LPC_HANDLE handle)
{
	LPCUSBSIO_I2C_Ctrl_t *dev = (LPCUSBSIO_I2C_Ctrl_t *) handle;
	uint32_t index = 0;

	/* copy library version */
	memcpy(&g_Version[index], &g_LibVersion[0], strlen(g_LibVersion));
	index += strlen(g_LibVersion);

	/* if handle is good copy firmware version */
	if (validHandle(handle) != 0) {
		g_Version[index] = '/';
		index++;
		/* copy firmware version */
		memcpy(&g_Version[index], &dev->fwVersion[0], strlen(dev->fwVersion));
		index += strlen(dev->fwVersion);
	}

	return &g_Version[0];
}