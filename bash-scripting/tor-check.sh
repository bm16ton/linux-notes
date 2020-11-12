#!/bin/bash
curl --socks5 localhost:9050 --socks5-hostname localhost:9050 -s https://check.torproject.org/ | cat | grep -m 1 Congratulations | xargs
curl -s https://check.torproject.org/ | cat | grep -m 1 Congratulations | xargs

curl --socks5 localhost:9050 --socks5-hostname localhost:9050 -s https://check.torproject.org/ | cat | grep -m 1 Sorry | xargs
curl -s https://check.torproject.org/ | cat | grep -m 1 Sorry | xargs
