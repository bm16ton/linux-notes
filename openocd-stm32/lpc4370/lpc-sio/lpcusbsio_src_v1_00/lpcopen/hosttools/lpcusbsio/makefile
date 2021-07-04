###########################################
###############################################################################
# Makefile to build LPCUSBSIO library and test application
#
# Copyright(C) NXP Semiconductors, 2013
# All rights reserved.
#
# Software that is described herein is for illustrative purposes only
# which provides customers with programming information regarding the
# LPC products.  This software is supplied "AS IS" without any warranties of
# any kind, and NXP Semiconductors and its licensor disclaim any and
# all warranties, express or implied, including all implied warranties of
# merchantability, fitness for a particular purpose and non-infringement of
# intellectual property rights.  NXP Semiconductors assumes no responsibility
# or liability for the use of the software, conveys no license or rights under any
# patent, copyright, mask work right, or any other intellectual property rights in
# or to any products. NXP Semiconductors reserves the right to make changes
# in the software without notification. NXP Semiconductors also makes no
# representation or warranty that such application will be suitable for the
# specified use without further testing or modification.
#
# Permission to use, copy, modify, and distribute this software and its
# documentation is hereby granted, under NXP Semiconductors' and its
# licensor's relevant copyrights in the software, without fee, provided that it
# is used in conjunction with NXP Semiconductors micro-controllers.  This
# copyright, permission, and disclaimer notice must appear in all copies of
# this code.
###############################################################################


CC=gcc
CXX=g++
AR=ar -rcs
UNAME := $(shell uname)
VPATH:=src:apps
CFLAGS+=-Iinc -Ihid_api/hidapi -I../../software/lpcusbsio -Wall -g -c
LSRCS :=lpcusbsio.c hid.c
SRCS = testapp.c

dir_guard=@mkdir -p $(@D)

ifeq ($(UNAME), Linux)
BINDIR=bin/linux
VPATH+=hid_api/linux
LIBS = `pkg-config libusb-1.0 libudev --libs`
CFLAGS+=`pkg-config libusb-1.0 --cflags`
endif
ifeq ($(UNAME), Darwin)
BINDIR=bin/osx
VPATH+=hid_api/mac
LIBS=-framework IOKit -framework CoreFoundation
endif
LPCLIB=$(BINDIR)/lpcusbsio.a
TESTAPP=$(BINDIR)/testapp

LOBJS := $(addprefix obj/,$(notdir $(LSRCS:.c=.o)))
OBJS := $(addprefix obj/,$(notdir $(SRCS:.c=.o)))

all: $(LPCLIB) $(TESTAPP)

$(LPCLIB): $(LOBJS)
	$(dir_guard)
	@$(AR) $@ $(LOBJS)

$(TESTAPP): $(LPCLIB) $(OBJS)
	$(CC) -Wall -g $^ $(LPCLIB) -o $@ $(LIBS)

obj/%.o: %.c
	$(dir_guard)
	@$(CC) $(CFLAGS) $< -o $@

clean:
	rm -f *.o $(OBJS) $(LOBJS)

.PHONY: clean
.PHONY: all
