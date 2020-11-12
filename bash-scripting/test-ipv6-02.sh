#!/bin/bash
echo "" > results.txt
echo $(curl -s -6 https://ipv6.vm3.test-ipv6.com/ip/?callback=?&testdomain=test-ipv6.com&testname=test_aaaa) > results.txt
