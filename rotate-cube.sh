#!/bin/bash
#
# compiz-rotate-wmctrl - Rotate the cube using wmctrl
#
# Author: Shang-Feng Yang
# Released under GPLv3

VER="1.0"


function rotate() {
  # The target face number (begins with 0)
  TVPN=$(( $1 % ${NF} ))

  # The X coordinate of the target viewport
  TVPX=$(( ${TVPN} * ${WW} ))

  # Change to the target viewport
  wmctrl -o ${TVPX},0
}

function usage() {
  echo -e "$(basename $0) v${VER}\n"
  echo -e "Usage:\n"
  echo -e "\t$(basename $0) {left|right|#}\n"
  echo -e "\tWhere:\n"
  echo -e "\t\tleft - rotate the cube to the left"
  echo -e "\t\tright - rotate the cube to the right"
  echo -e "\t\t# - rotate to #th face (begins with 0)\n\n"
  echo -e "Author: Shang-Feng Yang <storm dot sfyang at gmail dot com>"
  echo -e "Released under GPLv3"
}

# The action to be performed. $ACT could be 'left' or 'right' to rotate
# left or right, accordingly. $ACT could also be the number of the face
# to rotate into.
ACT=$(echo $1 |tr '[A-Z]' '[a-z]')

[ "x$ACT" == "x" ] && { usage; exit 1; } || {
  case $ACT in
    left|right|[0-9]|[0-9][0-9])
      ;;
    *)
      usage
      exit 1
      ;;
  esac
}


# The informations about the desktop
INFO=$(wmctrl -d)
# The width of the desktop
DW=$(echo "${INFO}"| awk '{sub(/x[0-9]+/, "", $4); print $4}')
# The width of the workarea
WW=$(echo "${INFO}"| awk '{sub(/x[0-9]+/, "", $9); print $9}')
# The number of faces on the cube
NF=$(($DW/$WW))
# The X coordinate of the viewport
CVPX=$(echo "${INFO}" |awk '{sub(/,[0-9]+/, "", $6); print $6}')
# Current number of the face in all faces (begins with 0)
CVPN=$(( ${CVPX} / ${WW} ))

[ "$ACT" == "right" ] && {
  ACT=$(( ${CVPN} + 1 ))
} || {
  [ "$ACT" == "left" ] && {
    ACT=$(( ${CVPN} - 1 ))
  }
}

rotate ${ACT}
