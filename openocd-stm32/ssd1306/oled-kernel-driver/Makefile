ifneq ($(KERNELRELEASE),)
obj-m := ssd1306.o
else
KDIR ?= /lib/modules/`uname -r`/build
all:
	$(MAKE) -C $(KDIR) M=$$PWD

clean:
	rm -f *.mod* *.o *.ko modules.order Module.symvers
endif
