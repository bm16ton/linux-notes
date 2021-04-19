#!/bin/bash
echo "Running file before converting, rsults;"
tr -d '\0' < $1 > $1
echo "Running file after converting, should detect, UTF-8 Unicode now"
file $1
