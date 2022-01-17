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

#ifndef __EE24CXX_DRV_H_INCLUDED__
#define __EE24CXX_DRV_H_INCLUDED__

struct ee24cxx_drv_param_t
{
	uint16_t iic_khz;
	uint8_t iic_addr;
};

struct ee24cxx_drv_interface_t
{
	uint8_t iic_port;
};

extern const struct mal_driver_t ee24cxx_drv;

#endif /*  __EE24CXX_DRV_H_INCLUDED__ */

