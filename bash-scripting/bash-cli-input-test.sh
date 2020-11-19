#!/bin/bash
main() {
   case "$1" in
    start)
        echo worked
        ;;
    ip)
        get_ip
        ;;
    esac
    exit 0
}

get_ip() {
    RADDR=$(curl -s https://ipinfo.io/ip)
    echo "remote ip: $RADDR"
}

main "${@}"
