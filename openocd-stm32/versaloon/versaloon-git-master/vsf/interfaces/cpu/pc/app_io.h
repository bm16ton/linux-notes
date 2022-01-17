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
#ifndef __APP_IO_H_INCLUDED__
#define __APP_IO_H_INCLUDED__

#include <stdio.h>

#define APP_IO_INIT()					

#define FOPEN							fopen
#define FCLOSE							fclose
#define FEOF							feof
#define REWIND							rewind
#define FFLUSH							fflush
#define FREAD							fread
#define FWRITE							fwrite
#define FSEEK							fseek
#define FTELL							ftell
#define FVALID(f)						(f != NULL)

#define FPRINTF							fprintf
#define PRINTF							printf
#define SNPRINTF						snprintf

#define FGETS							fgets
#define GETCHAR							getchar

#endif	// __APP_IO_H_INCLUDED__

