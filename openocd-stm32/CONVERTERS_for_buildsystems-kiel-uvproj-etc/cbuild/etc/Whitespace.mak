# CMSIS_Build whitespace handling

# whitespace to question mark
ws2qm=$(subst $() ,?,$1)

# question mark to whitespace
qm2ws=$(subst ?, ,$1)

# escaped whitespace to question mark
ews2qm=$(subst \ ,?,$1)

# question mark to escaped whitespace
qm2ews=$(subst ?,\ ,$1)

# whitespace pattern substitute
ws_patsubst = $(call qm2ws,$(patsubst $1,$2,$(call ws2qm,$3)))

# escaped whitespace pattern substitute
ews_patsubst = $(call qm2ws,$(patsubst $1,$2,$(call ews2qm,$3)))

# end of line
define EOL


endef