#!/bin/bash
gdb --silent -nx -q \
-ex "set confirm off" \
-ex "tar ext /dev/ttyBmpGdb" \
-ex "monitor version" \
-ex "monitor tpwr" \
-ex "monitor tpwr enable" \
-ex "monitor tpwr" \
-ex quit
