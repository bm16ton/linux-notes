#!/bin/bash
echo 1100000 > /sys/devices/system/cpu/cpu0/cpufreq/scaling_min_freq
echo 1100000 > /sys/devices/system/cpu/cpu1/cpufreq/scaling_min_freq
echo 1100000 > /sys/devices/system/cpu/cpu2/cpufreq/scaling_min_freq
echo 1100000 > /sys/devices/system/cpu/cpu3/cpufreq/scaling_min_freq

echo 1700000 > /sys/devices/system/cpu/cpu0/cpufreq/scaling_max_freq
echo 1700000 > /sys/devices/system/cpu/cpu1/cpufreq/scaling_max_freq
echo 1700000 > /sys/devices/system/cpu/cpu2/cpufreq/scaling_max_freq
echo 1700000 > /sys/devices/system/cpu/cpu3/cpufreq/scaling_max_freq

echo ondemand > /sys/devices/system/cpu/cpu0/cpufreq/scaling_governor
echo ondemand > /sys/devices/system/cpu/cpu1/cpufreq/scaling_governor
echo ondemand > /sys/devices/system/cpu/cpu2/cpufreq/scaling_governor
echo ondemand > /sys/devices/system/cpu/cpu3/cpufreq/scaling_governor

