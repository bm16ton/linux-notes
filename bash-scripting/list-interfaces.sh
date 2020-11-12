#!/bin/bash
ifconfig | grep flags | grep -v "lo:" | awk '{print $1}'
