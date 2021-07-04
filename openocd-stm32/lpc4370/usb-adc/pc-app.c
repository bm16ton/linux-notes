#include "stdio.h"
#include <libusb-1.0/libusb.h>
#include "string.h"
//#include "ncurses.h"
#include <unistd.h>
#include <sys/time.h>
#include <sys/resource.h>
//Vendor ID and Product ID indicated in USB descriptors (Change if needed).
#define ProID 0x008A
#define VenID 0x1FC9
///////////////////////////////////////////////////////
//Text Colours definition
#define GRN "\x1B[32m"
#define RED "\x1B[31m"
#define NRM "\x1B[0m"
/////////////////////////
//Function declarations
int menu();
int kbhit();
int chkErrors(char*);
///////////////////////
//Main function (argv not used)
int main(int argc, char *argv[]){
///////////Local variables section////////
    int result, cnt = 0, srate;
    FILE *ptr_file;
    libusb_device_handle *dev_handle;
    libusb_context *ctx;
    int aux, i, e;
    char name[50];
    unsigned char data[8192], datao[2];
    int actuallengths = 0, actuallengthr = 0;
//////////////////////////////////////////
//Init sequence
    libusb_init(&ctx);
    aux = setpriority(PRIO_PROCESS, 0, -20);
    printf("%d", aux);
///////////////
//Main loop
    while (1){
    result = menu(cnt);
//Prints menu, returns the selection.
    if (result == 1){
//Connect usb OPTION.
        printf("Connecting...");
        dev_handle = libusb_open_device_with_vid_pid(ctx, VenID, ProID);
//Open specified device
        if (dev_handle != NULL){
//libusb_set_configuration(dev_handle, 1);
            printf("%sSuccessfully connected.\n", GRN);
//Enters here if device is connected.
            cnt = 1;//Indicates that device is connected
        }
        else {
            printf("%sConnection fail.", RED);
            cnt = 0;
        }
        printf("%s\n", NRM);
    }
    else if (result == 2){
//Dump data to file OPTION.
        if (cnt == 0) printf("Board not connected, try to connect first.\n");//Ends if device is not connected.
        else{
            printf("Select a name for the file: ");
            scanf("%s", name);
//Scan the filename
            strcat(name, ".bin");
//ADDs .bin extension (can be anyone)
            ptr_file = fopen(name, "w+b");
//Open
 //           the specified file R&W (creates if not exists)
            do{
//Sample rate selection, loop to avoid
//incorrect values.
                printf("%sSelect sample rate:\n", RED);
                printf("(0) 100KSps ; (1) 250KSps ; (2) 400 KSps ; (3) 500KSps ; (4) 1 MSps ; (5) 2 MSps ; (6) 4 MSps\n");
                scanf("%d", &srate);
                printf("%s", NRM);
    } while (srate != 0 && srate != 1 && srate != 2 &&
    srate != 3 && srate != 4 && srate != 5 && srate != 6);
    libusb_claim_interface(dev_handle, 0);
//Start a
//device interface
    printf("Reading...\n");
    printf("Press a key to end reading process...\n");
//prepare to send 10: beginning of data dump process
//(INDICATES TO MCU START DUMP)
    data[0] = '1';
    data[1] = '0' + srate;;
i = libusb_bulk_transfer(dev_handle, 0x1, data, 2,
    &actuallengths, 10000);// write 10
    while (kbhit() == 0){
//USB reading loop, when
//key is pressed exits.
//for(i=0;i<1000000;i++);
        libusb_bulk_transfer(dev_handle, 0x81, data,
            4096, &actuallengthr, 0); //Read package
            fwrite(data, 1, 4096, ptr_file);
//write package to the file
//break;
}
//data[0] = 0xFF;
//data[1] = 0xFF;
//fwrite(data,2,1,ptr_file);
//prepare to send 2: finish data dump process
//(INDICATES TO MCU STOP DUMP)
    data[0] = '2';
    actuallengths = 0;
    i = libusb_bulk_transfer(dev_handle, 0x1, data, 1,
        &actuallengths, 1000);// write 2
//Write EOF in File
    data[0] = 0xFF;
    data[1] = 0xFF;
    fwrite(data, 1, 2, ptr_file);
//write package to the file
//Close and save file
    fclose(ptr_file);
    printf("File was saved.\n");
//Error checking. ONLY FOR TESTS
    printf("checking for errors...\n");
    aux = chkErrors(name);
    printf("errors: %d\n", aux);
//close libusb procedure
    libusb_release_interface(dev_handle, 0);
//release device
    libusb_close(dev_handle);
//close handler
    libusb_exit(ctx);
//close libusb
    break;
//finish program
    }
}
else printf("Introduce a valid value.\n");
printf("\n");
}
return 0;
}
int menu(int state){ //Function that prints Menu, and returns the user selection.
    int result;
    printf("-----------MENU-----------\n");
    if (state == 0)printf("%s1. Connect USB.\n", RED);
    else printf("%s1. Connect USB.\n", GRN);
    printf("%s2. Dump data to file.\n", NRM);
    printf("\n");
    printf("Select an option: ");
    scanf("%d", &result);
    return result;
}
int kbhit(){
//Function that returns a value different from 0 if key is
//pressed.
    struct timeval tv;
    fd_set fds;
    tv.tv_sec = 0;
    tv.tv_usec = 0;
    FD_ZERO(&fds);
    FD_SET(STDIN_FILENO, &fds);
    select(STDIN_FILENO + 1, &fds, NULL, NULL, &tv);
    return FD_ISSET(0, &fds);
}
int chkErrors(char* filename){
//Function that checks errors (TESTS ONLY)
    FILE *ptr_file;
    unsigned char vector[2];
    int lastvalue;
    int error = 0, r;
    long int pos = 1;
    ptr_file = fopen(filename, "r+b");
    r = fread(vector, 1, 2, ptr_file);
    lastvalue = vector[1] * 0x100 + vector[0];
    while (vector[1] != 0xFF && vector[0] != 0xFF){
        if ((vector[1] * 0x100 + vector[0]) >= (lastvalue + 300)){
        error++;
        printf("%li \n", pos);
    }
    else if ((vector[1] * 0x100 + vector[0]) <= (lastvalue - 300)){
        error++;
        printf("%li \n", pos);
    }
    lastvalue = vector[1] * 0x100 + vector[0];
    r = fread(vector, 1, 2, ptr_file);
    pos++;
    }
fclose(ptr_file);
return error;
}
