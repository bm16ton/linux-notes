#!/bin/bash

VAR1="Linuxize"
VAR2="Linuxize"
VAR3="poo"
VAR4="poop"

echo "bash with [ and = should result equal"
if [ "$VAR1" = "$VAR2" ]; then
    echo "Strings are equal."
else
    echo "Strings are not equal."
fi

echo ""
echo "bash with [ and = should result not equal"
if [ "$VAR1" = "$VAR3" ]; then
    echo "Strings are equal."
else
    echo "Strings are not equal."
fi

echo ""
echo "bash with [[ and == should result in equal"
if [[ "$VAR3" == "$VAR3" ]]; then
    echo "Strings are equal."
else
    echo "Strings are not equal."
fi

echo ""
echo "bash with [[ and == should result in not equal"
if [[ "$VAR3" == "$VAR4" ]]; then
    echo "Strings are equal."
else
    echo "Strings are not equal."
fi

echo ""
echo "You can also use the logical and && and or || to compare strings, should result in equal"
[[ "$VAR3" == "$VAR3" ]] && echo "Equal" || echo "Not equal"
echo "You can also use the logical and && and or || to compare strings, should result in no equal"
[[ "$VAR3" == "$VAR4" ]] && echo "Equal" || echo "Not equal"
