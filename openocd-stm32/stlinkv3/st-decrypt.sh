#!/bin/sh

dir=$(dirname $(readlink -f $0))

java -cp $dir/dist/lib/commons-cli-1.3.1.jar:$dir/dist/st_decrypt.jar st_decrypt.ST_decrypt "$@"
