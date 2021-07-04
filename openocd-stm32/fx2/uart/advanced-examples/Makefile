SUBDIRS = convert_serial convert_serial2 erase_eeprom

all:
	for i in $(SUBDIRS) ; do $(MAKE) -C $$i ; done

clean:
	for i in $(SUBDIRS) ; do $(MAKE) -C $$i clean ; done
