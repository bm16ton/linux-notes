#!/bin/bash
echo "testing ipv6" 
curl -6 https://suip.biz/ip/

echo "testing ipv4"
curl https://suip.biz/ip/
