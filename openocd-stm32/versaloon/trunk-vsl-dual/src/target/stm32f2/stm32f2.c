/***************************************************************************
 *   Copyright (C) 2009 - 2010 by Simon Qian <SimonQian@SimonQian.com>     *
 *                                                                         *
 *   This program is free software; you can redistribute it and/or modify  *
 *   it under the terms of the GNU General Public License as published by  *
 *   the Free Software Foundation; either version 2 of the License, or     *
 *   (at your option) any later version.                                   *
 *                                                                         *
 *   This program is distributed in the hope that it will be useful,       *
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of        *
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the         *
 *   GNU General Public License for more details.                          *
 *                                                                         *
 *   You should have received a copy of the GNU General Public License     *
 *   along with this program; if not, write to the                         *
 *   Free Software Foundation, Inc.,                                       *
 *   59 Temple Place - Suite 330, Boston, MA  02111-1307, USA.             *
 ***************************************************************************/
#ifdef HAVE_CONFIG_H
#include "config.h"
#endif

#include <stdlib.h>
#include <ctype.h>

#include "app_cfg.h"
#if TARGET_STM32F2_EN || TARGET_STM32F4_EN

#include "app_type.h"
#include "app_io.h"
#include "app_err.h"
#include "app_log.h"

#include "vsprog.h"
#include "interfaces.h"
#include "target.h"
#include "scripts.h"

#include "stm32f2.h"
#include "stm32f2_internal.h"
#include "comisp.h"
#include "cm.h"
#include "adi_v5p1.h"

struct program_area_map_t stm32f2_program_area_map[] =
{
	{APPLICATION_CHAR, 1, 0, 0, 0, AREA_ATTR_EWR | AREA_ATTR_RAE | AREA_ATTR_RAW},
	{FUSE_CHAR, 0, 0, 0, 0, AREA_ATTR_WR | AREA_ATTR_RAW},
	{UNIQUEID_CHAR, 0, 0, 0, 0, AREA_ATTR_R},
	{OTPROM_CHAR, 1, 0, 0, 0, AREA_ATTR_WR},
	{0, 0, 0, 0, 0, AREA_ATTR_NONE}
};

const struct program_mode_t stm32f2_program_mode[] =
{
	{'j', SET_FREQUENCY, IFS_JTAG_HL},
	{'s', "", IFS_SWD},
	{'i', USE_COMM, 0},
	{0, NULL, 0}
};

struct program_functions_t stm32f2_program_functions;

VSS_HANDLER(stm32f2_help)
{
	VSS_CHECK_ARGC(1);
	PRINTF("Usage of %s:"LOG_LINE_END, STM32F2_STRING);
	PRINTF("  -C,  --comport <COMM_ATTRIBUTE>           set com port"LOG_LINE_END);
	PRINTF("  -m,  --mode <MODE>                        set mode<j|s|i>"LOG_LINE_END);
	PRINTF("  -x,  --execute <ADDRESS>                  execute program"LOG_LINE_END);
	PRINTF("  -F,  --frequency <FREQUENCY>              set JTAG frequency, in KHz"LOG_LINE_END);
	PRINTF(LOG_LINE_END);
	return VSFERR_NONE;
}

VSS_HANDLER(stm32f4_help)
{
	VSS_CHECK_ARGC(1);
	PRINTF(
"Usage of %s:"LOG_LINE_END
"  -C,  --comport <COMM_ATTRIBUTE>           set com port"LOG_LINE_END
"  -m,  --mode <MODE>                        set mode<j|s|i>"LOG_LINE_END
"  -x,  --execute <ADDRESS>                  execute program"LOG_LINE_END
"  -F,  --frequency <FREQUENCY>              set JTAG frequency, in KHz"LOG_LINE_END
LOG_LINE_END, STM32F4_STRING);
	return VSFERR_NONE;
}

VSS_HANDLER(stm32f2_mode)
{
	uint8_t mode;
	
	VSS_CHECK_ARGC(2);
	mode = (uint8_t)strtoul(argv[1], NULL,0);
	switch (mode)
	{
	case STM32F2_JTAG:
	case STM32F2_SWD:
		stm32f2_program_area_map[0].attr |= AREA_ATTR_NP;
		vss_call_notifier(cm_notifier, "chip", "cm_stm32f2");
		memcpy(&stm32f2_program_functions, &cm_program_functions,
				sizeof(stm32f2_program_functions));
		break;
	case STM32F2_ISP:
		stm32f2_program_area_map[0].attr &= ~AREA_ATTR_NP;
		vss_call_notifier(comisp_notifier, "chip", "comisp_stm32f2");
		memcpy(&stm32f2_program_functions, &comisp_program_functions,
				sizeof(stm32f2_program_functions));
		break;
	}
	return VSFERR_NONE;
}

VSS_HANDLER(stm32f2_extra)
{
	char cmd[2];
	
	VSS_CHECK_ARGC(1);
	cmd[0] = '0' + COMISP_STM32F2;
	cmd[1] = '\0';
	return vss_call_notifier(comisp_notifier, "E", cmd);
}

const struct vss_cmd_t stm32f4_notifier[] =
{
	VSS_CMD(	"help",
				"print help information of current target for internal call",
				stm32f4_help,
				NULL),
	VSS_CMD(	"mode",
				"set programming mode of target for internal call",
				stm32f2_mode,
				NULL),
	VSS_CMD(	"extra",
				"print extra information for internal call",
				stm32f2_extra,
				NULL),
	VSS_CMD_END
};

const struct vss_cmd_t stm32f2_notifier[] =
{
	VSS_CMD(	"help",
				"print help information of current target for internal call",
				stm32f2_help,
				NULL),
	VSS_CMD(	"mode",
				"set programming mode of target for internal call",
				stm32f2_mode,
				NULL),
	VSS_CMD(	"extra",
				"print extra information for internal call",
				stm32f2_extra,
				NULL),
	VSS_CMD_END
};

void stm32f4_print_device(uint32_t mcuid)
{
	char rev_char = 0;
	uint16_t den, rev;
	
	den = mcuid & STM32F2_DEN_MSK;
	rev = (mcuid & STM32F2_REV_MSK) >> 16;
	switch (den)
	{
	case STM32F4_DEN_XL:
		LOG_INFO("STM32F2 type: XL device");
		switch (rev)
		{
		case 0x1000:
			rev_char = 'A';
			break;
		}
		break;
	default:
		LOG_INFO("STM32F4 type: unknown device(%08X)", mcuid);
		break;
	}
	if (rev_char != 0)
	{
		LOG_INFO("STM32F2 revision: %c", rev_char);
	}
}

void stm32f2_print_device(uint32_t mcuid)
{
	char rev_char = 0;
	uint16_t den, rev;
	
	den = mcuid & STM32F2_DEN_MSK;
	rev = (mcuid & STM32F2_REV_MSK) >> 16;
	switch (den)
	{
	case STM32F2_DEN_XL:
		LOG_INFO("STM32F2 type: XL device");
		switch (rev)
		{
		case 0x1000:
			rev_char = 'A';
			break;
		case 0x2000:
			rev_char = 'B';
			break;
		case 0x1001:
			rev_char = 'z';
			break;
		case 0x2001:
			rev_char = 'Y';
			break;
		}
		break;
	default:
		LOG_INFO("STM32F2 type: unknown device(%08X)", mcuid);
		break;
	}
	if (rev_char != 0)
	{
		LOG_INFO("STM32F2 revision: %c", rev_char);
	}
}

#endif
