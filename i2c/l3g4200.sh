#!/bin/bash
echo l3g4200d 0x69 | sudo tee /sys/class/i2c-adapter/i2c-17/new_device
i2cset -f -y 17 0x69 0x20 0x0F
i2cget -f -y 17 0x69 0x20 b 0x0f
while true; do echo x $(cat /sys/bus/iio/devices/iio:device1/in_anglvel_x_raw) y $(cat /sys/bus/iio/devices/iio:device1/in_anglvel_y_raw) z $(cat /sys/bus/iio/devices/iio:device1/in_anglvel_z_raw) ; sleep 1 ; done

