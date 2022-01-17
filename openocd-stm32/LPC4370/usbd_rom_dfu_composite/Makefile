TARGET = $(lastword $(subst /, ,$(realpath .))).elf
LINKFILE = libopencm3_lpc43xx.ld

CC = arm-none-eabi-gcc

INCLUDES += -Iinc
SOURCES += $(wildcard src/*.c)
OBJECTS += $(SOURCES:.c=.o)

CFLAGS += -DCORE_M4 -mcpu=cortex-m4 -mfloat-abi=softfp -mfpu=fpv4-sp-d16 -mthumb -Os -ffreestanding $(INCLUDES)
LDFLAGS += -nostartfiles --specs=nano.specs -Xlinker --gc-sections -T$(LINKFILE)
LDLIBS +=

.PHONY: clean

$(TARGET): $(OBJECTS)
	$(CC) $(LDFLAGS) -o $@ $^ $(LDLIBS)

clean:
		rm -f $(TARGET) $(OBJECTS)

