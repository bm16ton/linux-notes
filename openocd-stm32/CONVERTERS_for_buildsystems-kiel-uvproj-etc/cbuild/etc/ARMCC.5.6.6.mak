# Version: 0.10.0
# Date: 2020-09-30
# This file maps the CMSIS project options to toolchain settings.
#
#   - Applies to toolchain: ARMCC.5.06.update.6.(build.750)

############### EDIT BELOW ###############
# Set base directory of toolchain
TOOLCHAIN_ROOT:=/usr/bin

############ DO NOT EDIT BELOW ###########

AS:=$(TOOLCHAIN_ROOT)/armasm
CC:=$(TOOLCHAIN_ROOT)/armcc
CXX:=$(TOOLCHAIN_ROOT)/armcc
LD:=$(TOOLCHAIN_ROOT)/armlink
AR:=$(TOOLCHAIN_ROOT)/armar
OC:=$(TOOLCHAIN_ROOT)/fromelf

# Assembler

ifeq ($(CPU),Cortex-M0)
  AS_CPU:=--cpu=$(CPU)
else ifeq ($(CPU),Cortex-M0+)
  AS_CPU:=--cpu=Cortex-M0plus
else ifeq ($(CPU),Cortex-M1)
  AS_CPU:=--cpu=$(CPU)
else ifeq ($(CPU),Cortex-M3)
  AS_CPU:=--cpu=$(CPU)
else ifeq ($(CPU),Cortex-M4)
  ifeq ($(FPU),SP_FPU)
    AS_CPU:=--cpu=$(CPU).fp.sp
  else
    AS_CPU:=--cpu=$(CPU)
  endif
else ifeq ($(CPU),Cortex-M7)
  ifeq ($(FPU),DP_FPU)
    AS_CPU:=--cpu=$(CPU).fp.dp
  else ifeq ($(FPU),SP_FPU)
    AS_CPU:=--cpu=$(CPU).fp.sp
  else
    AS_CPU:=--cpu=$(CPU)
  endif
else ifeq ($(CPU),SC000)
  AS_CPU:=--cpu=$(CPU)
else ifeq ($(CPU),SC300)
  AS_CPU:=--cpu=$(CPU)
endif
ifndef AS_CPU
$(error Error: CPU is not supported!)
endif

AS_DEFINES:=$(call ews_patsubst,%,--pd "% SETA 1",$(DEFINES))

ifeq ($(BYTE_ORDER),Little-endian)
  AS_BYTE_ORDER:=--littleend
else ifeq ($(BYTE_ORDER),Big-endian)
  AS_BYTE_ORDER:=--bigend
endif

AS_FILE:=--via=

AS_FLAGS=\
--depend "$(call ws_patsubst,%.o,%.d,$@)"

# C Compiler

CC_CPU:=$(AS_CPU)

CC_DEFINES:=$(call patsubst,%,-D%,$(DEFINES))
_I:=-I
_PI:=--preinclude=

ifeq ($(BYTE_ORDER),Little-endian)
  CC_BYTE_ORDER:=--littleend
else ifeq ($(BYTE_ORDER),Big-endian)
  CC_BYTE_ORDER:=--bigend
endif

CC_FILE:=--via=

CC_FLAGS=\
-c\
--depend "$(call ws_patsubst,%.o,%.d,$@)"

# C++ Compiler

CXX_CPU:=$(CC_CPU)
CXX_DEFINES:=$(CC_DEFINES)
CXX_BYTE_ORDER:=$(CC_BYTE_ORDER)
CXX_FILE:=$(CC_FILE)
CXX_FLAGS:=$(CC_FLAGS)

# Linker

LD_CPU:=$(AS_CPU)

ifdef LD_SCRIPT
  LD_SCRIPT:=--scatter="$(LD_SCRIPT)"
endif

LD_FILE:=--via=

LD_FLAGS=\
--list "$(subst \,,$(OUT_DIR)/$(TARGET)).map"

# Archiver

AR_FILE:=--via=

AR_FLAGS=\
--create

# Target output

TARGET_LIB:=$(OUT_DIR)/$(TARGET).lib
TARGET_ELF:=$(OUT_DIR)/$(TARGET).axf

# ELF to HEX conversion
ELF2HEX:=\
--i32combined --output "$(subst \,,$(TARGET_ELF:.axf=.hex))" "$(subst \,,$(TARGET_ELF))"

# ELF to BIN conversion
ELF2BIN:=\
--bin --output "$(subst \,,$(TARGET_ELF:.axf=.bin))" "$(subst \,,$(TARGET_ELF))"
