#!/bin/bash
#ifconfig | grep -i ether | awk '{print $2}'
ip -o link | grep ether | awk '{ print $2" : "$17 }'
