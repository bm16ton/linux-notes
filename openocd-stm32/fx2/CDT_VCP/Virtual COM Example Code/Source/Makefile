INCLUDES = -I./
CC = sdcc -mmcs51
BASENAME = Virtual
CYCFX2PROG = cycfx2prog

$(BASENAME).ihx: $(BASENAME).c
	$(CC) -I./ $(INCLUDES) $(BASENAME).c

clean:
	rm -f $(BASENAME).{asm,ihx,lnk,lst,map,mem,rel,rst,sym}

.PHONY:run
run: $(BASENAME).ihx
	$(CYCFX2PROG) prg:$(BASENAME).ihx run
