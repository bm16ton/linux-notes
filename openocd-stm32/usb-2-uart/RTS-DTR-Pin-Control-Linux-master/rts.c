	
	/*====================================================================================================*/
	/* Program to access the RTS,of a Serial Port(ttyS* or ttyUSB0) using ioctl() system call.            */
	/*                                                                                                    */
	/*====================================================================================================*/
	/*                                                                                                    */
	/* If your are using FT232 based USB to Serial Converter all the pins are inverted internally         */
	/* Modem Pins of FT232 based Serial Port -> ~RTS,,~DTR.                                               */
	/* SETTING the Pins will make it LOW,while CLEARING the Pins will make it HIGH.                       */ 
	/*----------------------------------------------------------------------------------------------------*/

	/*----------------------------------------------------------------------------------------------------*/
	/* Compiler/IDE  : gcc 4.6.3                                                                          */
	/* Library       :                                                                                    */
	/* Commands      : gcc -o rts rts.c                                                                   */
	/* OS            : Linux(x86) (Linux Mint 13 Maya/Ubuntu 14.04)(Linux Kernel 3.x.x)                  */                              
	/* Programmer    : Rahul.S                                                                            */
	/* Date	         : 27-December-2014                                                                   */
	/*====================================================================================================*/

	/*====================================================================================================*/
	/* Running the executable                                                                             */
	/* ---------------------------------------------------------------------------------------------------*/ 
	/* 1) Compile the  serialport_read.c  file using gcc on the terminal (without quotes)                 */
        /*                                                                                                    */
	/*	" gcc -o rts rts.c  "                                                                         */
	/*                                                                                                    */
        /* 2) Linux will not allow you to access the serial port from user space,you have to be root.So use   */
        /*    "sudo" command to execute the compiled binary as super user.                                    */
        /*                                                                                                    */
        /*       "sudo ./rts"                                                                   */
	/*                                                                                                    */
	/*====================================================================================================*/

	/*====================================================================================================*/
	/* Sellecting the Serial port Number on Linux                                                         */
	/* ---------------------------------------------------------------------------------------------------*/ 
	/* /dev/ttyUSBx - when using USB to Serial Converter, where x can be 0,1,2...etc                      */
	/* /dev/ttySx   - for PC hardware based Serial ports, where x can be 0,1,2...etc                      */
        /*====================================================================================================*/
	
	/*==================================*/
	/*       MODEM bits                 */
	/*------------------- --------------*/
	/*   TIOCM_DTR --- DTR Line         */
	/*   TIOCM_RTS --- RTS Line         */
	/*==================================*/

	#include <stdio.h>
    	#include <fcntl.h>   	 /* File Control Definitions           */
    	#include <termios.h>	 /* POSIX Terminal Control Definitions */
    	#include <unistd.h> 	 /* UNIX Standard Definitions 	       */ 
    	#include <errno.h>   	 /* ERROR Number Definitions           */
	#include <sys/ioctl.h>   /* ioctl()                            */
    	void main(void)
    	{
        	int fd;	/*File Descriptor*/
		printf("\n  +--------------------------------------------+");
		printf("\n  | Program to Control RTS pins of Serial Port |");
		printf("\n  +--------------------------------------------+");

		/*------------------ Opening the Serial port ------------------*/

		/* Change /dev/ttyUSB0 to the one corresponding to your system */

        	fd = open("/dev/ttyUSB0",O_RDWR | O_NOCTTY );	        /* ttyUSB0 is the FT232 based USB2SERIAL Converter   */
			   						/* O_RDWR Read/Write access to serial port           */
									/* O_NOCTTY - No terminal will control the process   */
									/* Blocking Mode  */                       
									
        	if(fd == -1)						/* Error Checking */
            	   printf("\n    Error! in Opening ttyUSB0  ");
        	else
            	   printf("\n    ttyUSB0 Opened Successfully \n");
		
		
		/*--------- Controlling the RTS pins  of Serial Port --------*/

		int RTS_flag;

		RTS_flag = TIOCM_RTS;	/* Modem Constant for RTS pin */
		

		/*--------------------- Controlling the RTS pin using ioctl() system call ---------------------*/
		
		/* setting RTS = 1,~RTS = 0 */

		ioctl(fd,TIOCMBIS,&RTS_flag);		/* fd -file descriptor pointing to the opened Serial port */
						        /* TIOCMBIS - Set the bit corrosponding to  RTS_flag      */
		printf("\n    Setting RTS = 1,~RTS = 0 "); 
		printf("\n\n    Press any Key...");
		getchar();

		/* setting RTS = 0,~RTS = 1 */

		ioctl(fd,TIOCMBIC,&RTS_flag); 		 /* fd -file descriptor pointing to the opened Serial port */
						         /* TIOCMBIC - Clear the bit corrosponding to  RTS_flag    */           
		printf("\n    Setting RTS = 0,~RTS = 1 ");
		printf("\n\n    Press any Key...");
		getchar();
		
		close(fd); /* Close the Opened Serial Port */
		printf("\n  +--------------------------------------------+\n\n");
	}
