#!/bin/bash
for i in $(seq 0 40) ; do
FILET=$(echo /sys/class/hwmon/hwmon$i)
    if [[ -L $FILET ]]; then
        TYPE=$(cat /sys/class/hwmon/hwmon$i/name)
        if [[ -f $FILET/temp1_input ]]; then
            TEMP=$(echo "$(cat /sys/class/hwmon/hwmon$i/temp1_input)F")
            FTEMP=$(echo "$TEMP / 10000" |bc)
            FTEMP2=$(echo "scale=2;((9/5) * $FTEMP) + 32" |bc)
            CRITT=$(cat /sys/class/thermal/thermal_zone$i/trip_point_*_temp)
            FTEMPC=$(echo $FTEMP"C")
            FTEMP2F=$(echo $FTEMP2"F")
        else
            TEMP="0"
            POOP="temp not available"
            FTEMP=NA
            FTEMP2=NA
        fi
        echo "$i $TYPE = $FTEMPC $FTEMP2F $POOP $(echo -n "Crit temps "$CRITT)"
    fi
done

#cat /sys/class/hwmon/hwmon21/name
#cat /sys/class/hwmon/hwmon21/temp1_label
#cat /sys/class/hwmon/hwmon21/temp2_label
#cat /sys/class/hwmon/hwmon22/name
#cat /sys/class/hwmon/hwmon22/temp1_label
#cat /sys/class/hwmon/hwmon22/temp2_label
#cat /sys/class/hwmon/hwmon23/name
#cat /sys/class/hwmon/hwmon23/temp1_label
#cat /sys/class/hwmon/hwmon23/temp2_label
exit
