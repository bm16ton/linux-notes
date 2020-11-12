#!/bin/bash
ip route list | grep default | awk '{print $5}'
