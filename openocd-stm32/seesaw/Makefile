#ifneq ($(KERNELRELEASE),)

obj-m := seesaw.o


#else

KDIR ?= /lib/modules/`uname -r`/build

default:
	$(MAKE) -C $(KDIR) M=$(PWD) modules

#endif

.PHONY: clean

clean:
	rm -f modules.order module.symvers Module.symvers *.o *.ko *.mod.* *.mod

