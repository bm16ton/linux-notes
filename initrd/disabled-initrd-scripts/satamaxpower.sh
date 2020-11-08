#!/bin/sh
echo max_performance > /sys/class/scsi_host/host0/link_power_management_policy
echo max_performance > /sys/class/scsi_host/host1/link_power_management_policy
