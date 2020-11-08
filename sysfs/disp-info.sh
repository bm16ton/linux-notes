#!/bin/sh
while sleep 3; do ./new-temp.sh > temps; done &
GTKDIALOG=gtkdialog

MAIN_DIALOG='
<window title="Text Advanced" resizable="true">
	<vbox>
		<vbox border-width="10" spacing="10">
			<text use-markup="true">
				<label>"<span fgcolor='"'black'"' bgcolor='"'white'"'>  Current sdm850 temps cpu gpu wlan </span>"</label>
			</text>
			<vbox scrollable="true" height="400">
				<text wrap="false" xalign="0" file-monitor="true" auto-refresh="true">
					<variable export="false">txt0</variable>
					<label>Yoga hardware info</label>
					<input file>"temps"</input>
				</text>
			</vbox>
			<vbox>
		<text use-markup="true" xalign="0">
		    <label>"<span fgcolor='"'black'"' bgcolor='"'white'"'>  Panel </span>"</label></text>
		    <text><input>cat /sys/devices/platform/panel/modalias | cut -c 17-</input></text>
		</vbox>	
	</vbox>
				<hbox>
			<button cancel></button>
			<button ok></button>
		</hbox>
	</vbox>
</window>
'
export MAIN_DIALOG

case $1 in
	-d | --dump) echo "$MAIN_DIALOG" ;;
	*) $GTKDIALOG --program=MAIN_DIALOG ;;
esac

