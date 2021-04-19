#!/bin/bash
#check for non printable charactors in file = $1
FILENAME=$1
< $FILENAME python3 -c 'import sys; [print(repr(line.rstrip("\n"))) for line in sys.stdin]' |
    grep -n '\\'
