#!/bin/bash
if command -v poo > /dev/null; then
	echo "poo part"
elif command -v ls > /dev/null; then
	echo "ls part"
else
  echo "no commands found"
  exit
fi


