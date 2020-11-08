#!/bin/sh
echo min_power > /sys/class/scsi_host/host0/link_power_management_policy
echo min_power > /sys/class/scsi_host/host1/link_power_management_policy
echo 'auto' > '/sys/bus/usb/devices/1-8/power/control'
usbreset /dev/bus/usb/001/015 
echo 'auto' > '/sys/bus/usb/devices/1-8/power/control'
