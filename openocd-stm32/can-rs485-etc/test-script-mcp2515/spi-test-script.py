#!/usr/bin/env python
# -*- coding: utf8 -*-

# MFRC522_test.py  -  Copyright 2017-2019, Phil Elwell, Raspberry Pi (Trading) Ltd.

import RPi.GPIO as GPIO
import spi
import signal
import time

NRSTPD = 22

dev = spi.openSPI(device='/dev/spidev16.0', speed=1000000)
GPIO.setwarnings(False)
GPIO.setmode(GPIO.BOARD)
GPIO.setup(NRSTPD, GPIO.OUT)
GPIO.output(NRSTPD, 0)
time.sleep(0.1)
GPIO.output(NRSTPD, 1)
time.sleep(0.1)

line = ''
for addr in range(0,64):
    col = addr % 8
    val = spi.transfer(dev, (((addr<<1)&0x7E) | 0x80,0))
    if col == 0:
        line = '%02x:' % addr
    line += ' %02x' % val[1]
    if col == 7:
        print line

