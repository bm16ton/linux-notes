
/* STLink download/debug interface for Linux. */ 
/*
 This program interacts with the STMicro USB STLink programming/debug
 interface for STMicro microcontrollers. The STLink is found on STM8
 and STM32VLDiscovery devices.

 Written December 2010 by Donald Becker and William Carlson.
 MS-Windows support July 2011 by Anton Eltchaninov
 This program may be used under the terms of the Gnu General Public License,
 (GPL) v2 or v3. Distribution under other terms requires an explicit
 license from the authors.

 The communication is based on standard USB mass storage device, with
 its SCSI command protocol. The STLink operations encapsulated in
 vendor-specific SCSI commands.

 We directly use the SCSI Generic (sg) ioctl() and data structures to
 communicate with the STLink. The alternative of using the
 sgutils2/pass-through libraries might have taken less initial
 development time, but otherwise add no value. Those libraries are not
 always installed, causing extra build and installation headaches.
 Most of their functions are simple wrappers that add more complexity
 than they hide. Their only significant benefit, combining status values
 from a unpredictable mix of different driver, host adapter, transport
 and target combinations, does not apply when those are all emulated by
 the STLink firmware.

 References
 ST Micro Applications Notes
 AN3154 Specification of the CAN bootloader protocol
 AN3155 Specification of the USART bootloader protocol
 AN3156 Specification of the USB DFU (Direct Firmware Upload) protocol
 Related documents
 http://www.usb.org/developers/devclass_docs/DFU_1.1.pdf
 [Note: I have omitted all DFU support from this release.]
 USB Device Class Definition for Mass Storage Devices:
 www.usb.org/developers/devclass_docs/usbmassbulk_10.pdf

 Build notes:
 gcc -O0 -g3 -Wall -c -std=gnu99 -o stlink-download.o stlink-download.c
 gcc -o stlink-download stlink-download.o -lsgutils2
 This requires the SCSI Generic library.
 If missing, do'sudo apt-get install libsgutils2-dev'

 Usage notes:
 This is a deeply broken device. They apparently built the mass storage
 interface by cribbing the USB device table from a 32MB flash stick. But
 the device doesn't have 32MB, only hard-wired responses that presents
 three tiny'files'. Not arbitrary responses, only ones to the exact
 USB commands that Windows would use, and only accurately filling in the
 fields that Windows uses.

 The result is that non-Windows machines choke on this device. (It's likely
 that future Windows versions will as well.) Linux automatically checks the
 partition table and validates the extents. It takes several minutes of
 periodic retries before the kernel gives up and decides it is truly broken.

 Distributed with this utility is a udev rule file that speeds up
 the process by avoiding an automatic mount.

 The "Capt'ns Missing Link" people also suggest doing
 modprobe -r usb-storage && modprobe usb-storage quirks=483:3744:l
 or adding the equivalent to /etc/modprobe.conf or /etc/modprobe.d/local.conf
 options usb-storage quirks=483:3744:l
 This is kernel version dependent and difficult to automatically install.
 */

#define __USE_GNU 
#include <stdlib.h> 
#include <unistd.h> 
#include <stdint.h> 
#include <stdio.h> 
#include <string.h> 
#include <getopt.h> 
#include <fcntl.h> 
#include <errno.h> 
#include <sys/types.h> 
#include <sys/stat.h>

#if defined(__linux__) 
#include <sys/ioctl.h> 
#include <sys/mman.h> 
#include <scsi/sg.h>

#elif defined(__ms_windows__) 
#include <windows.h>
 enum SCSI_Generic_Direction
{SG_DXFER_TO_DEV = 0 , SG_DXFER_FROM_DEV = 1 };

#elif defined(__APPLE__)
 /* We have only the libusb API on Apple OSX. */ 
#include <libusb- 1.0 /libusb.h>
 #else 
#error "No host OS defined."
 #endif

/* $Vbase: 1.54 14 January 2011 00:25:11 becker$ */ 
static  const  char version_msg[] =
   " STLink programmer/debugging utility, written by Donald Becker\n " 
    " $Id$\n " 
    " Built " __DATE__ " from " __FILE__;

static  const  char usage_msg[] =
 #if defined(__ms_windows__)
   " \nUsage: %s \\\\.\\E: <command> ...\n\n " 
#else 
  " \nUsage: %s [/dev /stlink] <command> ...\n\n " 
#endif 
    " Commands are:\n " 
    "   info version blink\n " 
    "   debug reg<regnum> wreg<regnum>=<value> regs reset run step status\ n " 
    "   erase=<addr> erase=all<addr>\n " 
    "   read<memaddr> write<memaddr>=<val>\n " 
    "   flash:r:<file>flash:w:<file> flash:v:<file>\n " 
    " \n "
    " Note: The STLink firmware does a flawed job of pretending to be a USB\n " 
    " storage devices. It may take several minutes after plugging in before\n " 
    " it is usable.\n " 
    " To speed up the process unplug the STLink and do:\n " 
    " sudo modprobe -r usb-storage && \n " 
    " sudo modprobe usb-storage quirks=483:3744:lrwsro\n " ;

static  char short_opts[] = " BC:D:U:huvV " ;
 static  struct option long_options[] =
{
  {
    " blink " ,
     0 ,
    NULL,
    ' B ' },
  {
    " check " ,
     1 ,
    NULL,
    ' C ' },
  {
    " verify " ,
     1 ,
    NULL,
    ' C ' },
  {
    " download " ,
     1 ,
    NULL,
    ' D ' },
  {
    " upload " ,
     1 ,
    NULL,
    ' U ' },
  {
    " help " ,
     0 ,
    NULL,
    ' h ' }, /* Print a long usage message. */
  {
    " usage " ,
     0 ,
    NULL,
    ' u ' },
  {
    " verbose " ,
     0 ,
    NULL,
    ' v ' }, /* Report each action taken.   */
  {
    " version " ,
     0 ,
    NULL,
    ' V ' }, /* Emit version information.   */
  {
    NULL,
    0 ,
    NULL,
    0 }, };

/* A global verbose flag, although most places use the object-local copy
 * sl->verbose. */ 
int verbose = 0 ;

/* There are several IDs at different points inside the chip.
 * STMicro wants the debugger writers to'lock' their code to only work with
 * known chips. Hmmm, perhaps good for the proprietary tool vendors so that
 * you have to update. But this tool is for microcontroller developers so
 * I have no qualms about being far more flexible.
 */ 
#define DBGMCU_IDCODE 0xE0042000 /* The MCU device ID. */
 struct stm_chip_params
{ /* Unused/placeholder parameter table. */ 
  const  char * name;
   int cap_flags; /* Bitmapped capability indicators. */
  uint32_t core_id, dbgmcu_idcode;
  uint32_t flash_base, flash_size, flash_pgsize;
  uint32_t sysflash_base, sysflash_size, sysflash_pgsize;
  uint32_t sram_base, sram_size;
} stm_devids[] =
{
  /* Devices have 4k or 8k SRAM and 16k-128k flash. */
  {
    " STM32 " ,
     0 , /* Generic fall-back. */ 
    0x1ba01477 ,
     0x10000400 ,
     0x08000000 ,
     128 * 1024 ,
     1024 ,
     0x1ffff000 ,
     2 * 1024 ,
     1024 ,
     0x20000000 ,
     8 * 1024 },
  {
    " STM32F100 " ,
     0 ,
     0x1ba01477 ,
     0x10016420 , /* STM32F100 on Discovery. */ 
    0x08000000 ,
     128 * 1024 ,
     1024 ,
     0x1ffff000 ,
     2 * 1024 ,
     1024 ,
     0x20000000 ,
     8 * 1024 },
  {
    " STM32F103R4T6 " ,
     0 ,
     0x1ba01477 ,
     0x00005e7d , /* Low-density devices. */ 
    0x08000000 ,
     32 * 1024 ,
     1024 ,
     0x1ffff000 ,
     2 * 1024 ,
     1024 ,
     0x20000000 ,
     4 * 1024 },
  {
    " STM32F10x " ,
     0 ,
     0x1ba01477 ,
     0x10016412 , /* Low-density devices. */ 
    0x08000000 ,
     32 * 1024 ,
     1024 ,
     0x1ffff000 ,
     2 * 1024 ,
     1024 ,
     0x20000000 ,
     4 * 1024 },
  {
    " STM32F10x " ,
     0 ,
     0x1ba01477 ,
     0x10016410 , /* Medium-density devices. */ 
    0x08000000 ,
     128 * 1024 ,
     1024 ,
     0x1ffff000 ,
     2 * 1024 ,
     1024 ,
     0x20000000 ,
     8 * 1024 },
  {
    " STM32F10x " ,
     0 ,
     0x1ba01477 ,
     0x10016414 , /* High-density devices. */ 
    0x08000000 ,
     512 * 1024 ,
     1024 ,
     0x1ffff000 ,
     2 * 1024 ,
     1024 ,
     0x20000000 ,
     8 * 1024 },
  {
    " STM32F10x " ,
     0 ,
     0x1ba01477 ,
     0x10016430 , /* XL-density devices. */ 
    0x08000000 ,
     1024 * 1024 ,
     2048 ,
     0x1fffe000 ,
     6 * 1024 ,
     1024 ,
     0x20000000 ,
     8 * 1024 },
  {
    " STM32F107 " ,
     0 ,
     0x1ba01477 ,
     0x10016418 , /* Connectivity devices. */ 
    0x08000000 ,
     256 * 1024 ,
     2048 ,
     0x1fffb000 ,
     18 * 1024 ,
     1024 ,
     0x20000000 ,
     8 * 1024 },
  {
    " STM32L152 " ,
     0 ,
     0x1ba01477 ,
     0x10186416 , /* L152RBT6 as on 32L-Discovery. */ 
    0x08000000 ,
     128 * 1024 ,
     2048 ,
     0x1fffb000 , 16 * 1024 ,
     0x1fffb000 ,
     16 * 1024 ,
     0x20000000 ,
     8 * 1024 }, 1024
  {
    " STM32F4xx " ,
     0 ,
     0x2ba01477 ,
     0x10006420 , /* F4 (Cortex M4) devices. */ 
    0x08000000 ,
     256 * 1024 ,
     2048 ,
     0x1fffb000 ,
     18 * 1024 ,
     1024 ,
     0x20000000 ,
     8 * 1024 },
  {
    0 ,
     0 ,
     0 ,} };

/* We check that we are talking to a STLink device by the verifying the
 * the Vendor and Product IDentification numbers.
 * The VID is common across bus types eg PCI, USB, SCSI.
 */ 
#define USB_ST_VID 0x0483
 #define USB_STLINK_PID 0x3744
 #define USB_STLINKv2_PID 0x3748

/* Commands specify a size and direction of additional data.
 * We use the same mapping as SCSI Generic.
 * {SG_DXFER_TO_DEV=0, SG_DXFER_FROM_DEV=1};
 */ 
enum STLinkParamDirection
{
  STLinkParamToDev = 0 ,
  STLinkParamFromDev = 1 ,
};

/* A command should complete in well under one second. Most take a few
 * milliseconds, with a more complex ones taking about 250 ms.
 */ 
#define TIMEOUT_MSEC 800
 /* The maximum number of times to loop waiting for the flash page write
 * program to finish. This is under 50 cycles for a 1 millisecond USB 1.0
 * poll, but takes 120-140 cycles for a 250 microsecond poll 
 */ 
#define FLASH_POLL_LIMIT 200

/* The v1 device presents itself as a USB mass storage device. Debug access
 * is through additional SCSI Command Descriptor Blocks (CDB) commands.
 *   http://en.wikipedia.org/wiki/SCSI_CDB
 * We access these with the SCSI Generic (SG) mechanism.
 * The STLink appears to always use a 10 byte CDB, so we use that as the
 * buffer size for both v1 and v2.
 */ 
#define CDB_SIZE 10

/* The SCSI Request Sense command is used to obtain sense data
 * (error information) from the target.
 * http://en.wikipedia.org/wiki/SCSI_Request_Sense_Command
 * We should only need 18 bytes, but double just in case.
 */ 
#define SENSE_BUF_LEN 36

/* The maximum data transfer seems to be about 6KB, likely limited by
 * the RAM on the STLink 32F103 chip. This is not a painful limit. There
 * is usually only 4KB or 8KB of RAM on the target chip. The only
 * use for larger transfer is reading or verifying flash.
 * When we iterate for large transfers, we are often conservative and
 * avoid pushing the size limits. There is little point to finding the
 * rest of their fencepost bugs.
 * We use 4KB memory read and write block size, and a 2KB flash write
 * chunk.
 */ 
#define Q_BUF_LEN (6*1024 + 4)

/* Many commands return two bytes of status.
 * Only the lower byte has useful bits, so we often check only that. */ 
#define STLINK_OK 0x80
 #define STLINK_FALSE 0x81
 #define STLINK_CORE_RUNNING 0x80
 #define STLINK_CORE_HALTED 0x81
 #define STLINK_CORE_UNKNOWN_STATE 2 /* Not reported, internal use. */

/* I have mostly converted my names to be similar to other code.
 * I started with gdb-friendly enums, so they do slightly differ.
 */ 
enum STLink_Cmds
{
  STLinkGetVersion = 0xF1 ,
  STLinkDebugCommand = 0xF2 ,
  STLinkDFUCommand = 0xF3 , /* Device/Direct Firmware Update */ 
  STLinkGetCurrentMode = 0xF5 ,
};

enum STLink_Device_Modes
{ /* Response to STLinkGetCurrentMode */ 
  STLinkDevMode_Unknown = -1 ,
  STLinkDevMode_DFU = 0 ,
  STLinkDevMode_Mass = 1 ,
  STLinkDevMode_Debug = 2 ,
  STLinkDevMode_SWIM = 3 ,
  STLinkDevMode_Bootloader = 4 ,
  STLinkDFUModeExit = 7 , /* Errrm, not really part of this set. */ 
  STLinkDebugEnterSWD = 0xA3 , /* Subcommand to STLinkDebugEnterMode */ 
  STLinkDebugEnterJTAG = 0x00 , /* Subcommand to STLinkDebugEnterMode */
};

/* Sub-commands in JTAG or SWD mode.
 * These are prefixed by STLinkDebugCommand */ 
enum STLink_JTAG_Cmds
{
  STLinkDebugEnterMode = 0x20 , /* One of JTAG or SWD mode. */ 
  STLinkDebugExit = 0x21 ,
  STLinkDebugReadCoreID = 0x22 , /* Must be the first command. */ 
  /* New interface commands. Do not exit on v1? */ 
  STLinkDebugUseAltAPI = 0x30 ,
  STLinkDebugAltAPIReadID = 0x31 ,
  STLinkDebugAltAPIResetTarget = 0x32 ,
  STLinkDebugAltAPIReadReg = 0x33 ,
  STLinkDebugAltAPIWriteReg = 0x34 ,
  STLinkDebugAltAPIReadAllRegs = 0x3A ,
   /* The regular commands. */ 
  STLinkDebugGetStatus = 0x01 ,
  STLinkDebugForceDebug = 0x02 ,
  STLinkDebugResetSys = 0x03 ,
   /* Read or write ARM regs, see struct ARMcoreRegs for ordering and index. */ 
  STLinkDebugReadAllRegs = 0x04 ,
  STLinkDebugReadOneReg = 0x05 ,
  STLinkDebugWriteReg = 0x06 ,
  STLinkDebugReadMem32bit = 0x07 ,
  STLinkDebugWriteMem32bit = 0x08 ,
  STLinkDebugRunCore = 0x09 ,
  STLinkDebugStepCore = 0x0A ,
  STLinkDebugSetFP = 0x0B , /* Flash Patch breakpoint */
   /* Command12 is unknown. It returns no data, and seems to be a NoOp */ 
  STLinkDebugWriteMem8bit = 0x0D ,
  STLinkDebugClearFP = 0x0E ,
  STLinkDebugWriteDebugReg = 0x0F ,
};

/* The ARM processor core registers, in their STLink transfer order.
 * Index Register
 * 0..15 r0..r15 R15 is the ARM PC
 * 16 XPSR
 * 17/18 Main_SP/Process_SP
 * 19/20 RW, RW2
 */ 
struct ARMcoreRegs
{
  uint32_t r[ 16 ];
  uint32_t xpsr;
  uint32_t main_sp;
  uint32_t process_sp;
  uint32_t rw;
  uint32_t rw2; /* Hmmm, is this returned? Here just in case. */
} __attribute__( (packed) );

/* The packed-field version information. */ 
struct STLinkVersion
{
  unsigned int STLink_ver: 4 ;
  unsigned int JTAG_ver: 6 ;
  unsigned int SWIM_ver: 6 ;
  uint16_t ST_VendorID;
  uint16_t ST_ProductID;
} __attribute__( (packed) );

/* Hmmm, briefly seemed like a good idea. */
typedef uint32_t stm32_addr_t;

struct stlink
{
  const  char * dev_path;
 #if defined(__linux__) || defined(__APPLE__)
   int fd;
 #if defined(USE_LIBUSB) 
  libusb_device_handle * usb_hand;
 #endif 
#elif defined(__ms_windows__)
  HANDLE fd;
#else 
#warning "Undefined OS."
   int fd;
 #endif 
  int verbose; /* A local copy of'verbose'. */

  int chip_index; /* Index into stm_devids[], if known. */ 
  int flash_mem_size; /* Reported flash memory size in KB. */
  stm32_addr_t flash_base;

  /* Information we keep about the device state and recent transfers. */ 
  int core_state;
   struct STLinkVersion ver;
   struct ARMcoreRegs reg;

  /* Parameters for the SCSI data transfer blocks. */ 
  enum STLinkParamDirection xfer_dir;
   int cmd_len;
  unsigned char cmd_buf[ CDB_SIZE ];
   int data_len;
  unsigned char data_buf[ Q_BUF_LEN ];
 /* The older names were:
 * scsi_cmd_blk[]/cmd_len is now cmd_buf[]/cmd_len
 * q_buf[]/q_len is now data_buf[]/data_len
 * sense_buf is mostly passed-and-ignored and locally declared
 */
};

int stl_do_cmd( struct stlink * stl );

// Endianness
 //  http://www.ibm.com/developerworks/aix/library/au-endianc/index.html 
// const int i = 1;
 // #define is_bigendian() ((*(char*) &i) == 0) 
static inline unsigned int is_bigendian( void )
{
  static  volatile  const unsigned int i = 1 ;
   return *( volatile  const  char *) &i == 0 ;
}

static  void write_uint32( unsigned char * buf, uint32_t ui)
{
  if (! is_bigendian())
  { // le -> le (don't swap) 
    buf[ 0 ] = ((unsigned char *) &ui )[ 0 ];
    buf[ 1 ] = ((unsigned char *) &ui )[ 1 ];
    buf[ 2 ] = ((unsigned char *) &ui )[ 2 ];
    buf[ 3 ] = ((unsigned char *) &ui )[ 3 ];
  }
  else
  {
    buf[ 0 ] = ((unsigned char *) &ui )[ 3 ];
    buf[ 1 ] = ((unsigned char *) &ui )[ 2 ];
    buf[ 2 ] = ((unsigned char *) &ui )[ 1 ];
    buf[ 3 ] = ((unsigned char *) &ui )[ 0 ];
  }
}

static  void write_uint16( unsigned char * buf, uint16_t ui)
{
  if (!is_bigendian())
  { // le -> le (don't swap) 
    buf[ 0 ] = ((unsigned char *) &ui )[ 0];
    buf[ 1 ] = ((unsigned char *) &ui )[ 1];
  }
  else
  {
    buf[ 0 ] = ((unsigned char *) &ui )[ 1 ];
    buf[ 1 ] = ((unsigned char *) &ui )[ 0 ];
  }
}

static uint32_t read_uint32( const unsigned char *c, const  int pt)
{
  uint32_t ui;
  char *p = ( char *) & ui;

  if (!is_bigendian())
  { // le -> le (don't swap) 
    p[ 0 ] = c[ pt ];
    p[ 1 ] = c[ pt + 1 ];
    p[ 2 ] = c[ pt + 2 ];
    p[ 3 ] = c[ pt + 3 ];
  }
  else
  {
    p[ 0 ] = c[ pt + 3 ];
    p[ 1 ] = c[ pt + 2 ];
    p[ 2 ] = c[ pt + 1 ];
    p[ 3 ] = c[ pt ];
  }
  return ui;
}

struct stlink global_stlink; /* Yes, there can be only one. */

/* Open the STLink device at path DEV_NAME.
 * The program expects to open a SCSI Generic device, but
 * we do not verify that we have opened such a device.
 */ 
struct stlink *stl_init( struct stlink *sl, const  char * dev_name)
{
#if defined(__ms_windows__) 
  HANDLE fd = CreateFile(dev_name, GENERIC_READ | GENERIC_WRITE,
      FILE_SHARE_READ | FILE_SHARE_WRITE, NULL,
      OPEN_EXISTING, FILE_ATTRIBUTE_NORMAL, NULL);
#else 
  int fd = open( dev_name, O_RDWR );
 #endif

  if (sl->fd < 0 )
  {
    fprintf( stderr, " Failed to open STLink device %s: %s.\n " , dev_name,
      strerror( errno) );
    return NULL;
  }

  memset( sl, 0 , sizeof * sl );
  sl ->dev_path = dev_name;
  sl ->fd = fd;
   if (sl->fd < 0 )
  {
    fprintf( stderr, " Error opening the STLink'%s': %s\n " , dev_name,
      strerror( errno) );
    return NULL;
  }
  else  if (verbose)
    fprintf( stderr, " Open the STLink'%s': %s\n " , dev_name,
      strerror( errno) );

  sl ->verbose = verbose;
  sl ->core_state = STLINK_CORE_UNKNOWN_STATE;

  return sl;
}

/* Close the device.
 * We are always exiting and thus do not need to free any structures. */ 
void stl_close( struct stlink * sl)
{
#if defined(__ms_windows__) 
  CloseHandle(sl -> fd);
 #else 
  if (sl->fd >= 0 )
    close( sl -> fd );
 #endif
}

/* Execute a general command, with arbitrary parameters.
 * This is only used for commands to the STLink device itself, not for
 * commands to the target processor.
 */ 
void st_gcmd( struct stlink * sl, uint8_t st_cmd0, uint8_t st_cmd1,
   int resp_len)
{
  sl ->cmd_buf[ 0 ] = st_cmd0;
  sl ->cmd_buf[ 1 ] = st_cmd1;
  sl ->cmd_len = 2 ;
  sl ->data_len = resp_len;
  sl ->xfer_dir = STLinkParamFromDev;
  stl_do_cmd( sl );
  return ;
}

#define stl_get_version(sl) st_gcmd(sl, STLinkGetVersion, 0, 6)
 #define stl_mode(sl) (st_gcmd(sl, STLinkGetCurrentMode, 0, 2), \
            *(uint16_t *)sl-> data_buf)
 #define stl_exit_dfu_mode(sl) \ 
  st_gcmd(sl, STLinkDFUCommand, STLinkDFUModeExit, 0 )

/* Execute a regular-form STLink Debug command.
 * This is the generic operation for most simple commands.
 */ 
int stlink_cmd( struct stlink * sl, uint8_t st_cmd1, uint8_t st_cmd2,
   int response_len)
{
#if 0
   /* Deducing what the STLink v1 does often requires knowing how many
   * bytes were returned. */ 
  memset(sl ->cmd_buf, 0x55 , sizeof (sl-> cmd_buf));
 #endif 
  sl ->cmd_buf[ 0 ] = STLinkDebugCommand;
  sl ->cmd_buf[ 1 ] =st_cmd1;
  sl ->cmd_buf[ 2 ] = st_cmd2;
  sl ->data_len = response_len;
  sl ->xfer_dir = STLinkParamFromDev;
  memset( sl ->data_buf, 0x55555555 , response_len + 12 ); /* Debugging only */
  stl_do_cmd( sl );
  if (response_len == 2 )
     return *(uint16_t *) sl-> data_buf;
   else  if (response_len == 4 )
     return read_uint32( sl->data_buf, 0 );
   return  0 ;
}

/* The debug-mode entry and exit commands do not return a status. */ 
#define stl_enter_SWD_mode(sl) \ 
  stlink_cmd(sl, STLinkDebugEnterMode, STLinkDebugEnterSWD, 0 )
 #define stl_enter_JTAG_mode(sl) \ 
  stlink_cmd(sl, STLinkDebugEnterMode, STLinkEnterJTAG, 0 )
 #define stl_exit_debug_mode(sl) stlink_cmd(sl, STLinkDebugExit, 0, 0)
 #define stl_get_core_id(sl) (stlink_cmd(sl, STLinkDebugReadCoreID, 0, 4))
 #define stl_get_status(sl) stlink_cmd(sl, STLinkGetStatus, STLinkGetStatus, 2)
 #define stl_enter_debug(sl) ​​stlink_cmd(sl, STLinkDebugForceDebug, 0, 2)
 #definestl_reset(sl) stlink_cmd(sl, STLinkDebugResetSys, 0, 2)
 #define stl_get_allregs(sl) stlink_cmd(sl, STLinkDebugReadAllRegs, 0, 80)
 #define stl_state_run(sl) stlink_cmd(sl, STLinkDebugRunCore, 0, 2) #define stl_stepRunCore , 0, 2) #define stl_get_allregs( sl)
 sl) stlink_cmd(sl, STLinkDebugStepCore, 0, 2)
 #define stl_clear_bp(sl, fp_nr) stlink_cmd(sl, STLinkDebugClearFP, fp_nr, 2)
 /* Read a single ARM register. See'struct ARMcoreRegs' for the index. */ 
# define stl_get_reg(sl, reg_idx) \ 
  stlink_cmd(sl, STLinkDebugReadOneReg, (reg_idx), 4 )

/* These commands need additional parameters. */ 
#define stl_write_reg(sl, reg_val, reg_idx) {\ 
    write_uint32(sl ->cmd_buf + 3 , (reg_val)); \
    stlink_cmd(sl, STLinkDebugWriteReg, (reg_idx), 2 ); \
  }
#define stl_set_fp(sl, fp_nr) stlink_cmd(sl, STLinkDebugSetFP, fp_nr, 2)
 #define stl_set_breakpoint1(sl, fp_nr, addr, fptype) (\ 
  write_uint32(sl ->cmd_buf+ 3 , addr), \
  sl ->cmd_buf[ 7 ] = fptype, \
  stlink_cmd(sl, STLinkDebugSetFP, fp_nr, 2 ))

#define is_core_halted(sl) (stl_get_status(sl) == STLINK_CORE_HALTED)

/* Basic target memory read and write functions.
 * Both bulk and single 32 bit word functions are here.
 * The 32 bit versions use function parameters and return a value.
 * The bulk version has the caller fill/empty sl->data_buf.
 */ 
/* Write to the ARM memory starting at ADDR for LEN bytes.
 * The *_mem8 variant has a maximum LEN of 64 bytes.
 * The *_mem32 variant must have LEN be a multiple of 4.
 */ 
static inline int stl_wr32_cmd( struct stlink* sl, uint32_t addr, uint16_t len)
{
  sl ->cmd_buf[ 0 ] = STLinkDebugCommand;
   if ((len & 3 ) == 0 )
    sl ->cmd_buf[ 1 ] = STLinkDebugWriteMem32bit;
   else  if (len < 64 )
    sl ->cmd_buf[ 1 ] = STLinkDebugWriteMem8bit;
   else 
    return - 1 ;
  write_uint32( sl ->cmd_buf + 2 , addr );
  write_uint16( sl ->cmd_buf + 6 , len );
  sl ->cmd_len = 8 ;
  sl ->data_len = len;
  sl ->xfer_dir = STLinkParamToDev;
  stl_do_cmd( sl );
  return  0 ;
}
static inline void sl_wr32( struct stlink* sl, uint32_t addr, uint32_t val)
{
  write_uint32( sl -> data_buf, val );
  stl_wr32_cmd( sl, addr, sizeof (uint32_t) );
}

/* Read target memory command.
 * Reads must be aligned 32 bit words.
 * Something is wonky with the actual size. We need to request +1 byte
 * or we get residue errors. Also, there may be an issue with reads that
 * are exact 1K multiples.
 */ 
uint32_t stl_rd32_cmd( struct stlink* sl, uint32_t addr, uint16_t len)
{
#if 1
   /* This version forces alignment, which should never be needed as
   * calls always pass the correct alignment and size. */ 
  write_uint32( sl ->cmd_buf + 2 , addr & ~ 3 );
  write_uint16( sl ->cmd_buf + 6 , (len + 3 ) & ~ 3 );
 #else 
  /* This version adds one to compensate for a STLink bug that causes
   * a residue error. However it causes incorrect results with some
   * combinations of kernel and virtual machine hypervisors.
   */ 
  write_uint32(sl ->cmd_buf + 2 , addr);
  write_uint16(sl ->cmd_buf + 6 , len + 1 );
 #endif
  stlink_cmd( sl, STLinkDebugReadMem32bit, addr, len );
  return *(uint32_t*) sl-> data_buf;
}
static inline uint32_t sl_rd32( struct stlink * sl, uint32_t addr)
{
  stl_rd32_cmd( sl, addr, sizeof (uint32_t) );
   return *(uint32_t*) sl-> data_buf;
}

#if defined(linux)
 /* Enqueue a command to the STLink.
 * v1 uses SCSI transport over USB.
 * Most of the work is filling in the struct sg_io_hdr.
 * stl->cmd_buf
 * stl->data_buf, stl->data_len
 */ 
int stl_do_cmd( struct stlink * stl)
{
  struct sg_io_hdr io_hdr = 
  { 0 ,};
   /* Sense (error information) data */ 
  unsigned char sense_buf[SENSE_BUF_LEN];
   int ret;

  io_hdr.interface_id = ' S ' ;
  io_hdr.pack_id = 0 ;

  /* Provide buffers for the SCSI transfer.
   * The Request Sense (error info) command is used for responses.
   * http://en.wikipedia.org/wiki/SCSI_Request_Sense_Command 
   */ 
  io_hdr.cmdp = stl-> cmd_buf;
  io_hdr.cmd_len = sizeof (stl-> cmd_buf);
  io_hdr.sbp = sense_buf;
  io_hdr.mx_sb_len = sizeof (sense_buf);
  memset(io_hdr.sbp, 0 , io_hdr.sb_len_wr);

  /* Set a buffer to be used for data transferred from/to device */ 
  io_hdr.iovec_count = 0 ;
  io_hdr.dxferp = stl-> data_buf;
  io_hdr.dxfer_len = stl-> data_len;
  io_hdr.dxfer_direction = 
  (stl ->xfer_dir == STLinkParamToDev? SG_DXFER_TO_DEV:SG_DXFER_FROM_DEV);

  io_hdr.timeout = TIMEOUT_MSEC;
  io_hdr.flags = 0 ;
  ret = ioctl(stl->fd, SG_IO, & io_hdr);
   /* Report SCSI results. Really, note useful variable if we need
   * to write better reporting code. */
  if (stl-> verbose)
  {
    if (stl->verbose> 3 )
    fprintf(stderr, " SCSI command status %4.4x, took %d ms.\n " ,
        io_hdr.status, io_hdr.duration);
    if (io_hdr.resid || io_hdr.sb_len_wr)
    fprintf(stderr, " SCSI residue was %d, sense length %d.\n " ,
        io_hdr.resid, io_hdr.sb_len_wr);
  }
  returnret;
}
#elif defined(__ms_windows__)
 /* Code written by Anto Eltchaninov */ 
#define IOCTL_SCSI_PASS_THROUGH_DIRECT 0x4D014

typedef struct _SCSI_PASS_THROUGH_DIRECT
{
  USHORT Length;
  UCHAR ScsiStatus;
  UCHAR PathId;
  UCHAR TargetId;
  UCHAR Lun;
  UCHAR CdbLength;
  UCHAR SenseInfoLength;
  UCHAR DataIn;
  ULONG DataTransferLength;
  ULONG TimeOutValue;
  PVOID DataBuffer;
  ULONG SenseInfoOffset;
  UCHAR Cdb[ 16 ];
}SCSI_PASS_THROUGH_DIRECT, * PSCSI_PASS_THROUGH_DIRECT;

#pragma pack(push,4) 
typedef struct _SCSI_PASS_THROUGH_DIRECT_WITH_BUFFER
{
  SCSI_PASS_THROUGH_DIRECT sptd;
  ULONG Filler;       // realign buffer to double word boundary
   UCHAR ucSenseBuf[SENSE_BUF_LEN];
}SCSI_PASS_THROUGH_DIRECT_WITH_BUFFER,
* PSCSI_PASS_THROUGH_DIRECT_WITH_BUFFER;
 #pragma pack(pop)

SCSI_PASS_THROUGH_DIRECT_WITH_BUFFER sptdwb;

/* Enqueue a command to the SCSI Generic driver.
 * Most of the work is filling in the struct sg_io_hdr.
 */ 
int stl_do_cmd( struct stlink * stl)
{
  int ret;
  DWORD junk;                    // discard results 
  int length;
   int i;
   /* Sense (error information) data */ 
  unsigned char sense_buf[SENSE_BUF_LEN];

  length = sizeof (SCSI_PASS_THROUGH_DIRECT_WITH_BUFFER);

  memset( &sptdwb, 0 , length);

  sptdwb.sptd.Length = sizeof (SCSI_PASS_THROUGH_DIRECT);
  sptdwb.sptd.PathId = 0 ;
  sptdwb.sptd.TargetId = 1 ;
  sptdwb.sptd.Lun = 0 ;
  sptdwb.sptd.CdbLength = sizeof (stl-> cmd_buf);
  sptdwb.sptd.DataIn = stl-> xfer_dir;
  sptdwb.sptd.SenseInfoLength = 0 ;
  sptdwb.sptd.DataTransferLength = stl-> data_len;
   /* With only full-second granularity, use a full 1 second timeout. */ 
  sptdwb.sptd.TimeOutValue = SG_TIMEOUT_MSEC/ 1000 + 1 ;
  sptdwb.sptd.DataBuffer = stl-> data_buf;
  sptdwb.sptd.SenseInfoOffset =
  offsetof(SCSI_PASS_THROUGH_DIRECT_WITH_BUFFER,ucSenseBuf);
  memcpy(sptdwb.sptd.Cdb, stl ->cmd_buf, sizeof (stl-> cmd_buf));

  ret = DeviceIoControl(stl->fd, /* device to be queried */ 
      IOCTL_SCSI_PASS_THROUGH_DIRECT, /* operation to perform */ 
      &sptdwb, length, /* input buffer */ 
      &sptdwb, length, /* output buffer */ 
      &junk, /* # bytes returned */ 
      (LPOVERLAPPED) NULL); /* synchronous I/O */ 
  if (stl-> verbose)
  {
    if (! ret)
    fprintf(stderr, " DeviceIoControl failed. Error %ld.\n " ,
        GetLastError ());
  }
  memcpy(sense_buf, sptdwb.ucSenseBuf, sptdwb.sptd.SenseInfoLength);

  /* Report SCSI results. Really, note useful variable if we need
   * to write better reporting code. */ 
  if (stl-> verbose)
  {
    if (sptdwb.sptd.SenseInfoLength)
    fprintf(stderr, " sense length %d [%2.2x %2.2x ... ].\n " ,
        sptdwb.sptd.SenseInfoLength, sense_buf[ 0 ], sense_buf[ 1 ]);
  }
  return ret;
}
#endif

static  void stl_print_version( struct STLinkVersion * ver)
{
  if (ver->ST_VendorID == USB_ST_VID && ver->ST_ProductID == USB_STLINK_PID)
    fprintf( stderr, " Standard Vendor/Product ID 0x%04x 0x%04x\n " ,
      ver ->ST_VendorID, ver-> ST_ProductID );
   else 
    fprintf( stderr, " Incorrect Vendor/Product ID 0x%04x 0x%04x " 
      " (%04x %04x expected)\n " , ver->ST_VendorID, ver-> ST_ProductID , USB_ST_VID,
      USB_STLINK_PID );
  fprintf( stderr, " Versions STLink: 0x%x JTAG: 0x%x SWIM: 0x%x\n " 
    "     The firmware %sa JTAG/SWD interface.\n " 
    "     The firmware %sa SWIM interface.\n " , ver ->STLink_ver, ver-> JTAG_ver,
    ver ->SWIM_ver, ver->JTAG_ver == 0 ? " does not support " : " supports " ,
    ver ->SWIM_ver == 0 ? " does not support " : " supports " );
}

void stlink_print_arm_regs( struct ARMcoreRegs * regs)
{
  int i;
   for (i = 0 ; i < 16 ; i++ )
    fprintf( stderr, " r%02d=0x%08x%c " , i, regs-> r[ i ],
      i % 4 == 3 ? ' \n ' : '  ' );
  fprintf( stderr, " xPSR = 0x%08x\n " 
    " main_sp = 0x%08x process_sp = 0x%08x\n " 
    " rw = 0x%08x rw2 = 0x%08x\n " , regs->xpsr, regs-> main_sp,
    regs ->process_sp, regs->rw, regs-> rw2 );
   return ;
}

/*
 * Set and clear hardware breakpoints.
 * A breakpoint is set with the "flash patch" module.
 * When executing from Flash instead of RAM, we need hardware support
 * to implement breakpoints. We only get four registers, but that is
 * enough for most debugging.
 * 2 The index, 0..3, of the Flash Patch register.
 * 3-6 Address of the breakpoint (LSB first)
 * 7 FP_ALL (0x02) / FP_UPPER (0x01) / FP_LOWER (0x00)
 */ 
int stl_set_breakpoint( struct stlink *sl, int fp_nr, uint32_t addr, int fp)
{
  write_uint32( sl ->data_buf + 3 , addr );
  sl ->data_buf[ 7 ] = fp;
   return stl_set_fp(sl, fp_nr);
}

/* FPEC flash controller interface, PM0063 or PM0075 manual. */ 
#define FLASH_REGS_ADDR 0x40022000

#define FLASH_ACR (FLASH_REGS_ADDR + 0x00)
 #define FLASH_KEYR (FLASH_REGS_ADDR + 0x04)
 #define FLASH_SR (FLASH_REGS_ADDR + 0x0C)
 #define FLASH_CR (FLASH_REGS_ADDR + 0x10)
 #define FLASH_AR (FLASH_REGS_ADDR + 0x14)
 #define FLASH_OBR (FLASH_REGS_ADDR + 0x1C)
 #define FLASH_WRPR (FLASH_REGS_ADDR + 0x20)

/* Flash unlock key values ​​from PM0075 2.3.1 */ 
#define FLASH_RDPTR_KEY 0x00a5
 #define FLASH_KEY1 0x45670123
 #define FLASH_KEY2 0xcdef89ab

#define FLASH_SR_BSY 0x0001
 #define FLASH_SR_PGERR 0x0004
 #define FLASH_SR_WRPRTERR 0x0010
 #define FLASH_SR_EOP 0x0020

/ * Names and Definitions 3.5 sec from PM0075 * / 
#define FLASH_CR_PG 0x0001
 #define FLASH_CR_PER 0x0002
 #define FLASH_CR_MER 0x0004
 #define FLASH_CR_OPTPG 0x0010
 #define FLASH_CR_OPTER 0x0020
 #define FLASH_CR_STRT 0x0040
 #define FLASH_CR_LOCK 0x0080

/* Unlock the flash. This takes two write cycles with two key values.
 * The two key values ​​are sequentially written to the FLASH_KEYR register.
 */

/*
 * After much experimentation, I finally came to understand that the
 * STLink cannot generate the 16 bit memory cycle needed to directly
 * write the flash.
 * You have to download a program that writes it.
 *
 * This was confirmed by reading the OpenOCD code.
 * My implementation uses a similar approach, with a better implementation.
 * They download a program, the data, pass parameters using registers
 * (individually written) and run the program. This might seem
 * efficient, but the cost is largely in triggering a transfer, not how
 * much is in each transfer.
 *
 * It's a bit more work to embed the parameters in the program and pack
 * it together with the data into a single transfer, but the better
 * performance is worth it.
 *
 * Note: RAM starts at 0x20000000. Some chips have up to 32KB, but we
 * must support the devices with only 4KB.
 */

/* The OpenOCD code. Someday I'll do a speed comparisons.
 * From openocd, contrib/loaders/flash/stm32.s
 * i = STM32_FLASH_BASE; 0x08+r3 0x0800,0000
 * r0 = fl->buf_addr;//source
 * r1 = target; // target
 * r2 = count; // count (16 bits half words)
 * r3 = 0; // flash bank 0 (input)
 * r15 = fl->loader_addr; // pc register
 */

static  const uint8_t loader_code[] =
{
  0x08 ,
   0x4c , /* ldr r4, STM32_FLASH_BASE */ 
  0x1c ,
   0x44 , /* add r4, r3 */ 
  /* write_half_word: */ 
  0x01 ,
   0x23 , /* movs r3, #0x01 str */ 
  0x23 ,
   0x61 , /* r3, [r4, #STM32_FLASH_CR_OFFSET] */ 
  ,
   0x3b , /* strh r3, [r1], #0x02 */ /* busy: */ 0xe3 ,
   0x68 , /* 0x30 ,
   0xf8 ,
   0x02 ,
   0x3b , /* ldrh r3, [r0], #0x02 */ 
  0x21 ,
   0xf8 ,
  0x02 ldr r3, [r4, #STM32_FLASH_SR_OFFSET] */ 0x13 ,
   0xf0 ,
   0x01 ,
   0x0f , /* tst r3, #0x01 */ 0xfb ,
   0xd0 , /* beq busy */ 0x13 ,
   0xf0 ,
   0x14 ,
   0x0f , /* tst r3, #0x14 */ 0x01
  
  
  
  
  
  ,
   0xd1 , /* bne exit */ 
  0x01 ,
   0x3a , /* subs r2, r2, #0x01 */ 
  0xf0 ,
   0xd1 , /* bne write_half_word */ 
  /* exit: */ 
  0x00 ,
   0xbe , /* bkpt #0x00 * / 
  0x00 ,
   0x20 ,
   0x02 ,
   0x40 , /* STM32_FLASH_BASE: .word 0x40022000 */
};

/* A working version of our ARM code. Here as a back-up since we break it
 * so frequently. */ 
static  const uint16_t db_loader_code_working[] =
{
  0x480B , / * LDR r0 of, .SRC_ADDR * / 
  0x490C , / * LDR R1, .TARGET_ADDR * / 
  0x4A0C , / * LDR R2, .count   * / 
  0x4c09 , / * LDR R4, .STM32_FLASH_BASE * / 
  0x2501 , / * MOVS R5 , #FLASH_CR_PG_BIT 0x0001 */ 
  0x6125 , /* str r5, [r4, #STM32_FLASH_CR_OFFSET] */ 
  /* write_hword: */ 
  0xf830 ,
   0x3b02 , /* ldrh r3, [r0], #0x02 */ 
  0xf821 ,
  0x3b02 , /* strh r3, [r1], #0x02 */ 
  /* busy: */ 
#if 0
   0x3201 , /* add r2, r2, #0x01 */ 
#endif 
  0x68e3 , /* ldr r3, [r4, # STM32_FLASH_SR_OFFSET] */ 
  0xf013 ,
   0x0f01 , /* tst r3, #0x01 */ 
  0xd1fb , /* bne busy */ 
  0xf013 ,
   0x0f14 , /* tst r3, #0x14 */ 
  0xd101 , /* bne exit */
  0x3a01 , /* subs r2, r2, #0x01 */ 
  0xd1f2 , /* bne write_hword */ 
  /* Normal completion, clear #FLASH_CR_PG_BIT. Note that r2 is now 0. */ 
#if 0
   0x6122 , /* str r2, [ r4, #STM32_FLASH_CR_OFFSET] */ 
#endif 
  /* exit: */ 
  0xbe00 , /* bkpt #0x00 */ 
  0x0000 ,
   0x0000 ,
   0x2000 ,
   0x4002 , /* .STM32_FLASH_BASE: .word 0x40022000 */ 
  0x0040,
   0x2000 , /* .SRC_ADDR: .word 0x20000040 */ 
  0x0bd0 ,
   0x0800 , /* .TARGET_ADDR: .word 0x0800xxxx */ 
  0x0006 ,
   0x0000 , /* .COUNT: .word 0x00000100 */
};

/* The flash write program.
 * The STLink apparently cannot directly generate the memory operations
 * required to write the flash. So we download and run a small program that
 * writes the flash for us.
 *
 * While inconvenient, this does result in much faster writes. To improve
 * the performance even more, we download the program, parameters and data to
 * write in a single transfer.
 * The program finishes by turning off the flash programming enable in
 * FLASH_CR and calling breakpoint#0 - halting.
 * The status is reflected in the registers.
 * A successful completion leaves R2 with a count of zero.
 * The final FLASH_SR status is returned in R3.
 * A count of the busy loop iterations in kept in R5 - a rough estimation
 * of the write speed.
 */ 
static  const uint16_t db_loader_code[] =
{
  0x480B , / * LDR r0 of, .SRC_ADDR * / 
  0x490C , / * LDR R1, .TARGET_ADDR * / 
  0x4A0C , / * LDR R2, .count   * / 
  0x4c09 , / * LDR R4, .STM32_FLASH_BASE * / 
  0x2501 , / * MOVS R5 , #FLASH_CR_PG_BIT 0x0001, then busy_count */ 
  0x6125 , /* str r5, [r4, #STM32_FLASH_CR_OFFSET] */ 
  /* copy_hword: */ 
  0xf830 ,
   0x3b02 , /* ldrh r3, [r0], #0x02 */
   0821x02 0xf,
   0x3b02 , /* strh r3, [r1], #0x02 */ 
  /* busy: */ 
  0x3501 , /* add r5, r5, #0x01; Increment busy_count */ 
  0x68e3 , /* ldr r3, [r4, #STM32_FLASH_SR_OFFSET ] * / 
  0xf013 ,
   0x0f01 , / * TST R3, # 0x01; Check FLASH_SR_BSY * / 
  0xd1fa , / * BNE BUSY * / 
  0xf013 ,
   0x0f14 , / * TST R3, # 0x14; Check for WRPRTERR / PGERR errors * / 
  0xd102 , / *bne exit */ 
  0x3a01 , /* subs r2, r2, #0x01; Decrement COUNT */ 
  0xd1f1 , /* bne copy_hword */ 
  /* Normal completion, clear #FLASH_CR_PG_BIT. Note that r2 is now 0. */ 
  0x6122 , /* str r2, [r4, #STM32_FLASH_CR_OFFSET] */ 
  /* exit: */ 
  0xbe00 , /* bkpt #0x00 */ 
  /* The following parameters will be overwritten before download. */ 
  0x2000 ,
   0x4002 , /* .STM32_FLASH_BASE: .word 0x40022000 */ 
  0x0040 ,
   0x2000 , /* .SRC_ADDR: .word 0x20000040 */ 
  0x0bd0 ,
   0x0800 , /* .TARGET_ADDR: .word 0x0800xxxx */ 
  0x0006 ,
   0x0000 , /* .COUNT: .word 0x00000100 */
};

/*
 * Write the flash at FLASH_ADDR with data BUF of SIZE bytes.
 * This routine downloads the flash-write program, parameters
 * and data to be written, then runs the program.
 * It assumes that the flash address, size and any rounding has been
 * checked by the caller.
 * The flash needs to be unlocked by the caller, but the downloaded code
 * writes FLASH_CR_PG_BIT to enable and disable user flash programing.
 */ 
static  int stl_loader( struct stlink * sl, stm32_addr_t flash_addr,
   const  void *buf, int size)
{
  int offset = 0 ;
  uint32_t prog_base = stm_devids[ 0 ].sram_base;
  uint32_t * params ;

  memcpy( sl ->data_buf, db_loader_code, sizeof (db_loader_code) );
  offset = sizeof (db_loader_code );
   params = (uint32_t *) (sl->data_buf + offset );

  /* Write params[-4] to change the FLASH_REGS_ADDR base.
   * Connectivity devices use an offset of +0x40 eg 0x40022040
   * for a second bank of flash. */ 
  if (stm_devids[ 0 ].flash_size> 256 * 1024 && flash_addr >= 0x08080000 )
     params [ -4 ] = 0x40022040 ;
   params [ -3 ] = prog_base + offset;
   params [ -2 ] = flash_addr;
   params [ -1 ] = size >> 1 ;
  memcpy( params , buf, size );

  /* Transfer both the loader and data at once. */ 
  stl_wr32_cmd( sl, prog_base, offset + size );
   /* Run the program by setting the PC aka r15. */ 
  stl_write_reg( sl, prog_base, 15 );
  stl_state_run( sl );

  return 0 ;
}

#define FLASH_WR_BLK_SIZE 2048

static  int stl_flash_write( struct stlink * sl, stm32_addr_t flash_addr,
   const  void *buf, int size)
{
  int offset = 0 ;
   int status;

  if (sl-> verbose)
    printf( " Flash write %8.8x..%8.8x.\n " , flash_addr, flash_addr + size );
   /* Unlock the flash register. */
  sl_wr32( sl, FLASH_KEYR, FLASH_KEY1 );
  sl_wr32( sl, FLASH_KEYR, FLASH_KEY2 );
  /* Clear the error bits in the control register. */ 
  sl_wr32( sl, FLASH_SR, 0x34 );
   if (sl-> verbose)
    printf( " Flash status %2.2x, control %4.4x.\n " , sl_rd32( sl, FLASH_SR ),
      sl_rd32( sl, FLASH_CR) );

  do
  {
    int this_size;
     int failcount = 0 ;
     if (size> FLASH_WR_BLK_SIZE)
      this_size = FLASH_WR_BLK_SIZE;
     else  if (size & 1 )
      this_size = size + 1 ;
     else 
      this_size = size;
    stl_loader( sl, flash_addr + offset, buf + offset, this_size );
     /* Writing 2KB takes 40-70 msec according to sec. 5.3.9 */ 
    while (stl_get_status(sl) != STLINK_CORE_HALTED)
       if (++failcount> FLASH_POLL_LIMIT )
      {
        if (sl-> verbose)
          printf( " Flash status %2.2x, control %4.4x status %x.\n " ,
            sl_rd32( sl, FLASH_SR ), sl_rd32( sl, FLASH_CR ),
            stl_get_status(sl) );
        return  0 ;
      }
    offset += this_size;
    size -= this_size;
  } while (size> 0 );

  status = sl_rd32( sl, FLASH_SR) & 0x15 ;
   if (status)
  {
    if (status & 0x04 )
      fprintf( stderr, " Flash write failed: trying to write a location " 
        " that was not erased. (%2.2x)\n " , status );
     else  if (status & 0x10 )
      fprintf( stderr, " Flash write failed: trying to modify a " 
        " write-protected region. (%2.2x)\n " , status );
  }
  /* Re-lock the flash. */ 
  sl_wr32( sl, FLASH_CR, 0x80 );
   return status;
}

/* Erase flash memory.
 * Typical use: erase the page of flash memory that contains address ADDR.
 * Pass the address 0xA11 to do a mass erase ("user flash" only).
 * The flash controller should be idle at entry, and this waits for idle
 * before exit.
 */ 
static  int stl_flash_erase_page( struct stlink * sl, stm32_addr_t addr_page)
{
  int i = 0 , status;

  /* Unlock the flash register and clear any previous errors. */
  sl_wr32( sl, FLASH_KEYR, FLASH_KEY1 );
  sl_wr32( sl, FLASH_KEYR, FLASH_KEY2 );
  sl_wr32( sl, FLASH_SR, FLASH_SR_EOP | FLASH_SR_WRPRTERR | FLASH_SR_PGERR );

  if (sl->verbose> 1 )
    fprintf( stderr, " STLink erase flash: status %8.8x " 
      " Flash_CR %8.8x.\n " , sl_rd32( sl, FLASH_SR ), sl_rd32( sl, FLASH_CR) );

  if (addr_page == 0xa11 )
  {
    /* Start the erase-all operation, PM0075 sec 3.5. */
    sl_wr32( sl, FLASH_CR, FLASH_CR_MER );
    sl_wr32( sl, FLASH_CR, FLASH_CR_STRT | FLASH_CR_MER );
  }
  else
  {
    /* Select the page to erase PM0075 sec 3.6 */
    sl_wr32( sl, FLASH_AR, addr_page );
    /* Start the erase operation, PM0075 sec 3.5.
     * Note that a single combined write will not work! */
    sl_wr32( sl, FLASH_CR, FLASH_CR_PER );
    sl_wr32( sl, FLASH_CR, FLASH_CR_STRT | FLASH_CR_PER );
  }
  /* Monitor the busy bit to check for completion. This typically takes
   * only two iterations. */ 
  do
  {
    status = sl_rd32( sl, FLASH_SR );
    i ++ ;
  } while ((status & FLASH_SR_BSY) && i < 1000 );
   if (!( status & FLASH_SR_EOP))
  {
    fprintf( stderr, " STLink erase flash page failed, status %8.8x " 
      " Flash_CR %8.8x (%d checks).\n " , status, sl_rd32( sl, FLASH_SR ), i );
     return  1 ;
  }
  if (sl-> verbose)
    fprintf( stderr, " STLink erase flash page %8.8x: %d status checks to " 
      " complete %8.8x.\n " , addr_page, i, status );
   return  0 ;
}

/* Read from device memory at ADDR into BUF for SIZE bytes.
 * This handles alignment and block size internally.
 */ 
#define READ_BLK_SIZE 1024
 int stl_read( struct stlink* sl, stm32_addr_t addr, void * buf, ssize_t size)
{
  size_t offset = 0 ;

  if (addr & 3 )
  {
    int psz = 4- (addr & 3 );
    stl_rd32_cmd( sl, addr & ~ 3 , sizeof (uint32_t) );
    memcpy( buf, sl ->data_buf + (addr & 3 ), psz );
    offset = psz;
  }
  do
  {
    int xfer_size;
     if (size> READ_BLK_SIZE)
      xfer_size = READ_BLK_SIZE;
     else 
      xfer_size = (size + 3 ) & ~ 3 ;
    stl_rd32_cmd( sl, addr + offset, xfer_size );
     if (size & 3 )
      xfer_size = size;
    memcpy( buf + offset, sl-> data_buf, xfer_size );
    offset += xfer_size;
    size -= xfer_size;
  } while (size> 0 );
   return size;
}

/* Write the contents of file PATH into flash starting at ADDR. */ 
static  int stl_flash_fwrite( struct stlink *sl, const  char * path,
  stm32_addr_t addr, int max_size)
{
  char buf[ 128 * 1024 ];
   int ret;
  ssize_t size;
  const  int fd = open( path, O_RDONLY );

  if (fd < 0 )
  {
    fprintf( stderr, " Failed to open'%s': %s\n " , path, strerror( errno) );
     return - 1 ;
  }
  size = read( fd, buf, sizeof buf );
   if (size < 0 )
  {
    fprintf( stderr, " Failed to read'%s': %s\n " , path, strerror( errno) );
     return - 1 ;
  }
  if (size> max_size)
  {
    fprintf( stderr, " Program is LARGER THAN FLASH and may not fit. " 
      "   Trying anyway.\n " 
      "   Program at %s is %#8.8x bytes, flash is %#8.8x bytes.\n " , path,
      ( int ) size, max_size );
  }

  ret = stl_flash_write( sl, addr, buf, size );
  close( fd );
  if (ret & 0x0004 )
  {
    fprintf( stderr, " \n " );
  }
  return ret;
}

/* Routines still left to implement. */

/* Read from the ARM memory starting at offet ADDR, writing SIZE bytes
 * into file PATH.
 */ 
int stl_fread( struct stlink* sl, const  char * path, stm32_addr_t addr,
  size_t size)
{
  char buf[ size + 8 ];
   const  int fd = open( path, O_RDWR | O_TRUNC | O_CREAT, 0664 );
  size_t wsize, offset;

  if (fd < 0 )
  {
    fprintf( stderr, " Failed to open'%s': %s\n " , path, strerror( errno) );
     return - 1 ;
  }

  stl_read( sl, addr, buf, size );

  /* Should loop until error. */ 
  offset = 0 ;
  wsize = size;
   while (wsize> 0 )
  {
    int res = write( fd, buf + offset, wsize );
     if (res < 0 )
       break ;
    offset += res;
    wsize -= res;
  }
  if (wsize != 0 )
  {
    fprintf( stderr, " Failed to write'%s': %s\n " , path, strerror( errno) );
    close( fd );
    return - 1 ;
  }
  close( fd );
  return  0 ;
}

#if 0
 /* Verify that ARM memory starting at ADDR matches the next chunk from FD.
 * Return the number of bytes successfully compared, zero if finished,
 * or -1 if a mismatch occured.
 */

int stlink_verify_chunk( struct stlink* sl, int fd, stm32_addr_t addr)
{
  char filebuf[ 128 * 1024 ], flashbuf[ 128 * 1024 ];
  ssize_t file_rdsize, flash_rdsize;

  file_rdsize = read(fd, filebuf, sizeof filebuf);
   if (size < 0 )
  {
    fprintf(stderr, " Failed to read file'%s' during verify: %s\n " ,
        path, strerror(errno));
    return - 1 ;
  }
  if (size == 0 )
   return  0 ;

  flash_rdsize = stl_read(sl, addr, flashbuf, file_rdsize);
   /* Unlikely, but check anyway. */ 
  if (flash_rdsize != file_rdsize)
  {
    fprintf(stderr, " Mismatched read size during verify, %d vs %d.\n " ,
        flash_rdsize, file_rdsize);
    return - 1 ;
  }

  /* Extremely uninformative about the failure. */ 
  if (memcmp(filebuf, flashbuf, file_rdsize) != 0 )
  {
    fprintf(stderr, " Failed flash verify.\n " );
     return - 1 ;
  }
  addr += file_rdsize;
}
#endif

/* Verify that ARM memory starting at ADDR matches the contents of file PATH. */ 
int stlink_fverify( struct stlink* sl, const  char * path, stm32_addr_t addr)
{
  char filebuf[ 128 * 1024 ], flashbuf[ 128 * 1024 ];
  ssize_t file_rdsize, flash_rdsize;
  const  int fd = open( path, O_RDONLY );

  if (fd <0 )
  {
    fprintf( stderr, " Failed to open'%s': %s\n " , path, strerror( errno) );
     return - 1;
  }

  while ((file_rdsize = read( fd, filebuf, sizeof filebuf))> 0 )
  {
    flash_rdsize = stl_read( sl, addr, flashbuf, file_rdsize );
     /* Unlikely, but check anyway. */ 
    if (flash_rdsize != 0 && flash_rdsize != file_rdsize)
    {
      fprintf( stderr, " Mismatched read size during verify, %d vs %d.\n " ,
        flash_rdsize, file_rdsize );
      gotofail;
    }

    /* Extremely uninformative about the failure. */ 
    if (memcmp( filebuf, flashbuf, file_rdsize) != 0 )
    {
      fprintf( stderr, " Failed flash verify.\n " );
       goto fail;
    }
    addr += file_rdsize;
  }
  if (file_rdsize < 0 )
  {
    fprintf( stderr, " Failed to read file'%s' during verify: %s\n " , path,
      strerror( errno) );
    goto fail;
  }
  close( fd );
  return  0 ;
  fail: close( fd );
  return - 1 ;
}

#if 0
 #define STLINK_XFER_BLKSZ 2048
 static  int stl_fread( struct stlink* sl, const  char * path,
    stm32_addr_t addr, size_t size)
{
  size_t off;

  const  int fd = open(path, O_RDWR | O_TRUNC | O_CREAT, 00664 );
   if (fd ==- 1 )
  {
    fprintf(stderr, " Failed to open'%s': %s\n " , path, strerror(errno));
     return - 1 ;
  }

  /* Copy using 1K/2K/4K blocks. */ 
  for (off = 0 ; off <size; off += STLINK_XFER_BLKSZ)
  {
    size_t read_size = STLINK_XFER_BLKSZ;
     if ((off + read_size)> size)
    read_size = off + read_size;

    /* Round up size to always read whole words. */ 
    if (read_size & 3 )
    read_size = (read_size + 4 ) & ~( 3 );

    stlink_read_mem32(sl, addr + off, read_size);

    if (write(fd, sl->data_buf, read_size) != (ssize_t)read_size)
    {
      fprintf(stderr, " write() != read_size\n " );
      close(fd);
      return - 1 ;
    }
  }

  return  0 ;
}
#endif

/*
 * Kick a STLink until it is in a workable mode.
 * If the STLink is not in an expected mode, attempt to have it exit back
 * to mass storage mode.
 * The only known unexpected mode is DFU mode, which requires a reset
 * and re-plug process to exit.
 * This has many status messages sinces it's ugly, bogus and flakey.
 */ 
int stl_kick_mode( struct stlink * sl)
{
  int i;
   int stlink_mode = stl_mode(sl);

  /* Check if we are already in a usable mode. */ 
  if (stlink_mode == STLinkDevMode_Debug || stlink_mode == STLinkDevMode_Mass)
     return  0 ;

  if (sl-> verbose)
  {
    sl ->core_state = stl_get_status(sl);
    fprintf( stderr, " STLink mode is %4.4x.\n " 
      " ARM status is 0x%4.4x: %s.\n " , stlink_mode, sl-> core_state,
      sl ->core_state == STLINK_CORE_RUNNING?
         " running " :
        (sl ->core_state == STLINK_CORE_HALTED? " halted " : " unknown " ) );
  }

  /* Otherwise assume that we are in DFU mode and attempt to exit back
   * to mass storage mode. This is super painful and slow. */ 
  fprintf( stderr, " \nAttempting to switch the STLink to a known mode...\n " );
  stl_exit_dfu_mode( sl );
#if defined(__ms_windows__) 
  CloseHandle(sl -> fd);
 #else 
  close( sl -> fd );
 #endif 
  /* If this worked, the device has reset and disconnected.
   * A disconnect lasts for several seconds.
   * Give the kernel time to handle the fresh plug event.
   */ 
  fprintf( stderr, " Waiting to reopen the STLink device...\n " );
   for (i = 0 ; i < 10 ; i++ )
  {
    sl ->fd = open( sl-> dev_path, O_RDWR );
     if (sl->fd >= 0 )
    {
      /* Give the STLink a few rounds to start working. */
      stl_enter_SWD_mode( sl );
      sl ->core_state = stl_get_status(sl);
       if (sl-> verbose)
        printf( " ARM status is 0x%4.4x: %s.\n " , sl-> core_state,
          sl ->core_state == STLINK_CORE_RUNNING?
             " running " :
            (sl ->core_state == STLINK_CORE_HALTED? " halted " : " unknown " ) );
       if (sl->core_state == STLINK_CORE_RUNNING
         || sl->core_state == STLINK_CORE_HALTED)
         return  0 ;
      close( sl -> fd );
      sl ->fd = -1 ;
    }
    else
    {
      if (sl-> verbose)
        printf( " Reopen failed.\n " );
    }
    sleep( 1 );
  }
  return - 1 ;
}

static  void stm_info( struct stlink* sl)
{
  uint32_t idcode, devparam;
  int i;

  idcode = sl_rd32( sl, DBGMCU_IDCODE ); /* At 0xE0042000 */ 
  if (idcode == 0 ) /* Cortex-M0 */ 
    idcode = sl_rd32( sl, 0x40015800 );

  for (i = 0 ; stm_devids[ i ].name; i++ )
     if (idcode == stm_devids[ i ].dbgmcu_idcode)
    {
      sl ->chip_index = i;
       break ;
    }

  printf( " Target DBGMC_IDCODE %3.3x (Rev ID %4.4x) %s.\n " , idcode & 0x0FFF ,
    idcode, stm_devids[ sl -> chip_index ].name );

  /* Read the device parameters: flash size and serial number. */ 
  /* The STM32F1 has the flash size at 0x1FFFf7e0. */ 
  devparam = sl_rd32( sl, 0x1FFFf7e0 );
  sl ->flash_mem_size = devparam & 0xff ;
   if (sl->flash_mem_size == 0xff )
     /* The STM32F2 and STM32F4 have the flash size at 0x1FFF7A22. */ 
    sl ->flash_mem_size = sl_rd32( sl, 0x1F7A );

  printf( " Flash size %dK (register %4.4x).\n " , devparam & 0xff , devparam );
  printf( "   Information block %8.8x %8.8x %8.8x %8.8x.\n " ,
    sl_rd32( sl, 0x1FFFf800 ), sl_rd32( sl, 0x1FFFf804 ),
    sl_rd32( sl, 0x1FFFf808 ), sl_rd32( sl, 0x1FFFf80c ) );
   return ;
}

/* Blink the LEDs on a STM32VLDiscovery board.
 * This may be used as a visual liveness test in scripts.
 * The LEDs are on PortC pins PC8 and PC9
 * RM0041 Reference manual-STM32F100xx advanced ARM-based 32-bit MCUs
 */ 
#define GPIOC 0x40011000 /* PortC register base */
 #define GPIOC_CRH (GPIOC + 0x04) /* Port configuration register high */
 #define GPIOC_ODR (GPIOC + 0x0c) /* Port output data register */
 #define LED_BLUE (1 <<8)
 #define LED_GREEN (1<<9)

static  void stm_discovery_blink( struct stlink* sl)
{
  uint32_t PortC_hi_iocfg, APB1ENR_orig, APB2ENR_orig;
  uint32_t APBnENR_orig[ 2 ];
   int i;

  PortC_hi_iocfg = sl_rd32( sl, GPIOC_CRH );
   /* Read APB2ENR and APB1ENR at 0x40021018-1F */ 
  stl_read( sl, 0x40021018 , APBnENR_orig, sizeof APBnENR_orig );

  /* Future: Enable GPIO ports if needed. */ 
  APB2ENR_orig = APBnENR_orig[ 0 ]; /* 0x40021018 */ 
  APB1ENR_orig = APBnENR_orig[ 1 ]; /* 0x4002101C (yes, 1 is higher) */

  if (sl-> verbose)
    fprintf( stderr, " GPIOC_CRH = 0x%08x, APB1ENR=%#08x, APB2ENR=%#08x\n " ,
      PortC_hi_iocfg, APB1ENR_orig, APB2ENR_orig );

  /* Make certain PC8/PC9 are GPIO outputs - any speed will do. */ 
  if ((PortC_hi_iocfg & 0xCC ) != 0x00 )
    sl_wr32( sl, GPIOC_CRH, (PortC_hi_iocfg & ~ 0xff ) | 0x11 );
   for (i = 0 ; i < 10 ; i++ )
  {
    sl_wr32( sl, GPIOC_ODR, LED_GREEN );
    usleep( 100 * 1000 );
    sl_wr32( sl, GPIOC_ODR, LED_BLUE );
    usleep( 100 * 1000 );
  }
  /* Conditionally restore original GPIO settings. */ 
  if ((PortC_hi_iocfg & 0xCC ) != 0x00 )
    sl_wr32( sl, GPIOC_CRH, PortC_hi_iocfg );
  return ;
}

#if 0
 /* Set an interrupt to pending. This should be used with caution as some
 * interrupt handlers expect only hardware events eg a serial character
 * has arrived. */ 
/* Bitmap, must write as 32 bit word */ 
const  int IntrSetPendingBase = 0xE000E200 ;

static  void stm_raise_irq( struct stlink* sl, int irq_num)
{
  if (irq_num> 248 )
  {
    printf( " Invalid interrupt number %d. Cannot set pending.\n " , irq_num);
     return ;
  }
  sl_wr32(sl, IntrSetPendingBase + ((irq_num & 0xE0 )>> 3 ),
       1 << (irq_num & 0x1F ));
   return ;
}
#endif

struct dev_peripheral
{ /* Peripheral device table */ 
  const  char *name; /* TIM1, CAN1 etc */ 
  uint32_t addr; /* Address in STM32 space */ 
  int unit_num; /* Unit number, 0 if sole unit */ 
  void (*show_func1 )( struct stlink* sl, struct dev_peripheral * dev_per,
    uint32_t data_blk[] );
  int extent; /* Size of peripheral region */ 
  uint32_t avail; /* Chip feature bitmap */ 
  int feature; /* Dev feature bitmap eg ADC2 misisng regs   */
};

static  void stm_show_timer( struct stlink* sl, struct dev_peripheral * dp,
  uint32_t data[])
{
  char active_map[ 4 ] = " HL " ;

  printf( " %s Timer %d at %8.8x: %4.4x %4.4x %4.4x %4.4x " 
    "   %4.4x %4.4x %4.4x %4.4x %4.4x\n " 
    " IntrEnb:%4.4 x Status:%4.4x\n " 
    " Count: %d Prescale: x%d Top: %d.\n " 
    " Ch1: %d %c Ch2: %d %c Ch3: %d %c Ch4: %d %c.\n " , dp->name, dp-> unit_num,
    dp ->addr, data[ 0 ], data[ 1 ], data[ 2 ], data[ 3 ], data[ 4 ], data[ 5 ],
    data[ 6 ], data[ 7 ], data[ 8 ], data[ 3 ], data[ 4 ], data[ 9 ],
    data[ 10 ] + 1 , data[ 11 ], data[ 13 ],
    active_map[ (data[ 8 ] >> 0 ) & 3 ], data[ 14 ],
    active_map[ (data[ 8 ] >> 4 ) & 3 ], data[ 15 ],
    active_map[ (data[ 8 ] >> 8 ) & 3 ], data[ 16 ],
    active_map[ (data[ 8 ] >> 12 ) & 3 ] );
}

static  void stm_show_CAN( struct stlink *sl, struct dev_peripheral * dp,
  uint32_t data[])
{
  uint32_t mode_map, scale_map, fifo_map, active_map;
  int i;

  printf( " %s at %8.8x: MCR %8.8x MSR %8.8x\n " 
    " Tx/Rx0/Rx1 %8.8x %8.8x %8.8x\n " 
    " IntrEnb %8.8x Errors %8.8x BitTiming% 8.8x\n " , dp->name, dp-> addr,
    data[ 0 ], data[ 1 ], data[ 2 ], data[ 3 ], data[ 4 ], data[ 5 ], data[ 6 ],
    data[ 7 ] );
   /* Show FIFO contents. */ 
  stl_rd32_cmd( sl, dp ->addr + 0x180 , 80 );
  printf( " CAN FIFOs\n " 
    "   Tx0: %8.8x %8.8x %8.8x %8.8x\n " 
    "   Tx1: %8.8x %8.8x %8.8x %8.8x\n " 
    "   Tx2: %8.8x %8.8x %8.8x %8.8x\n " 
    "   Rx0: %8.8x %8.8x %8.8x %8.8x\n " 
    "   Rx1: %8.8x %8.8x %8.8x %8.8x\n " , data [ 0 ], data[ 1 ], data[ 2 ],
    data[ 3 ], data[ 4 ], data[ 5 ], data[ 6 ], data[ 7 ], data[ 8 ], data[ 9 ],
    data[ 10 ], data[ 11 ], data[ 12 ], data[ 13 ], data[ 14 ], data[ 15 ],
    data[ 16 ], data[ 17 ], data[ 18 ], data[ 19 ] );

  /* Show filter, Mode/scale/dest/on %8.8x %8.8x %8.8x.\n */ 
  stl_rd32_cmd( sl, 0x40006600 , 32 );
  printf( " Rx filter FMR %8.8x\n " 
    "   Mode/scale/dest/on %8.8x %8.8x %8.8x %8.8x.\n " , data[ 0 ], data[ 1 ],
    data[ 3 ], data[ 5 ], data[ 7 ] );
  mode_map = data[ 1 ];
  scale_map = data[ 3 ];
  fifo_map = data[ 5 ];
  active_map = data[ 7 ];
  stl_rd32_cmd( sl, 0x40006640 , 32 );
   for (i = 0 ; i < 28 ; i++ )
     if (active_map & ( 1 << i))
    {
      printf( "   Filter %d FIFO %c " , i, fifo_map & ( 1 << i)? ' 1 ' : ' 0 ' );
       if (scale_map & ( 1 << i))
        printf( " %8.8x %8.8x\n " , data[ i * 2 ], data[ i * 2 + 1 ] );
       else 
        printf( " %4.4x %4.4x (%3.3x %3.3x) %4.4 x %4.4x (%3.3x %3.3x)\n " ,
          data[ i * 2 ] & 0xffff , data[ i * 2 ] >> 16 ,
          (data[ i * 2 ] >> 5 ) & 0x7ff , (data[ i * 2 ] >> 21 ) & 0x7ff ,
          data[ i * 2 + 1 ] & 0xffff , data[ i * 2 + 1 ] >> 16 ,
          (data[ i * 2 + 1 ] >> 5 ) & 0x7ff ,
          (data[ i * 2 + 1 ] >> 21 ) & 0x7ff );
    }

  return ;
}

static  void stm_show_DMA( struct stlink* sl, struct dev_peripheral * dp,
  uint32_t data[])
{
  inti;
  printf( " %s at %8.8x: interrupts %8.8x %8.8x\n " , dp->name, dp-> addr,
    data[ 0 ], data[ 1 ] );
   for (i = 1 ; i <= 7 ; i++ )
  {
    int CB = I * . 5 - . 3 ;
    printf( " Channel %d: %8.8x %d words %8.8x%s%s %8.8x%s\n " , i, data[ cb ],
      data[ cb + 1 ], data[ cb + 2 ], data[ cb] & 0x40 ? " ++ " : "   " ,
      data[ cb] & 0x10 ? " <- " : " -> " , data[ cb + 3 ],
      data[ cb] & 0x80 ? " ++ " : "   " );
  }
  return ;
}

static  void stm_show_SPI( struct stlink* sl, struct dev_peripheral * dp,
  uint32_t data[])
{
  printf( " %s at %8.8x: %8.8x %8.8x\n " , dp->name, dp->addr, data[ 0 ],
    data[ 1 ] );
}

static  void stm_show_USART( struct stlink* sl, struct dev_peripheral * dp,
  uint32_t data[])
{
  printf( " %s at %8.8x: %4.4x %4.4x %4.4x %4.4x %4.4x %4.4x %4.4x %4.4x\n " ,
    dp ->name, dp->addr, data[ 0 ], data[ 1 ], data[ 2 ], data[ 3 ], data[ 4 ],
    data[ 5 ], data[ 6 ], data[ 7 ] );
}

static  void arm_show_systick( struct stlink* sl, struct dev_peripheral * dp,
  uint32_t data_blk[])
{
  printf( " SysTick at %8.8x: Ctrl %4.4x reload %d, count %d\n " 
    "   calibration %d (%#x)\n " , dp->addr, data_blk[ 0 ], data_blk[ 1 ] ,
    data_blk[ 2 ], data_blk[ 3 ] & 0x00ffffff , data_blk[ 3 ] );
}

static  void stm_show_dev( struct stlink* sl, struct dev_peripheral * dp,
  uint32_t data[])
{
  int i;
  printf( " %s at %8.8x: " , dp->name, dp-> addr );
   for (i = 0 ; i <dp->extent / 4 ; i++ )
    printf( " %4.4x " , data[ i] );
  printf( " \n " );
}

struct dev_peripheral dev_per[] =
{
  {
    " SysTick " ,
     0xE000E010 ,
     0 ,
    arm_show_systick,
    16 },
  {
    " CAN1 " ,
     0x40006400 ,
     1 ,
    stm_show_CAN,
    32 },
  {
    " CAN2 " ,
     0x40006800 ,
     2 ,
    stm_show_CAN,
    32 },
  {
    " DMA1 " ,
     0x40020000 ,
     1 ,
    stm_show_DMA,
    8 + 20 * 7 },
  {
    " DMA2 " ,
     0x40020400 ,
     2 ,
    stm_show_DMA,
    8 + 20 * 7 },
  {
    " PORTA " ,
     0x40010800 ,
     0 ,
    stm_show_dev,
    28 },
  {
    " PORTB " ,
     0x40010C00 ,
     0 ,
    stm_show_dev,
    28 },
  {
    " PORTC " ,
     0x40011000 ,
     0 ,
    stm_show_dev,
    28 },
  {
    " PORTD " ,
     0x40011400 ,
     0 ,
    stm_show_dev,
    28 },
  {
    " PORTE " ,
     0x40011800 ,
     0 ,
    stm_show_dev,
    28 },
  {
    " PORTF " ,
     0x40011C00 ,
     0 ,
    stm_show_dev,
    28 },
  {
    " PORTG " ,
     0x40012000 ,
     0 ,
    stm_show_dev,
    28 },
  {
    " SPI1 " ,
     0x40013000 ,
     1 ,
    stm_show_SPI,
    36 },
  {
    " SPI2 " ,
     0x40003800 ,
     2 ,
    stm_show_SPI,
    36 },
  {
    " SPI3 " ,
     0x40003C00 ,
     3 ,
    stm_show_SPI,
    36 },
  {
    " TIM1 " ,
     0x40012C00 ,
     1 ,
    stm_show_timer,
    76 }, /* Do not read TIMx_DMAR */
  {
    " TIM1a " ,
     0x40010000 ,
     1 ,
    stm_show_timer,
    76 }, /* 32F4xx only */
  {
    " TIM2 " ,
     0x40000000 ,
     2 ,
    stm_show_timer,
    76 },
  {
    " TIM3 " ,
     0x40000400 ,
     3 ,
    stm_show_timer,
    76 },
  {
    " TIM4 " ,
     0x40000800 ,
     4 ,
    stm_show_timer,
    76 },
  {
    " TIM5 " ,
     0x40000C00 ,
     5 ,
    stm_show_timer,
    76 },
  {
    " TIM6 " ,
     0x40001000 ,
     6 ,
    stm_show_timer,
    76 },
  {
    " TIM7 " ,
     0x40001400 ,
     7 ,
    stm_show_timer,
    76 },
  {
    " TIM8 " ,
     0x40010400 ,
     8 ,
    stm_show_timer,
    76 }, /* 32F4xx */
  {
    " TIM9 " ,
     0x40014000 ,
     9 ,
    stm_show_timer,
    76 }, /* 32F4xx */
  {
    " TIM10 " ,
     0x40014400 ,
     10 ,
    stm_show_timer,
    76 }, /* 32F4xx */
  {
    " TIM11 " ,
     0x40014800 ,
     11 ,
    stm_show_timer,
    76 }, /* 32F4xx */
  {
    " TIM12 " ,
     0x40001800 ,
     12 ,
    stm_show_timer,
    76 },
  {
    " TIM13 " ,
     0x40001C00 ,
     13 ,
    stm_show_timer,
    76 },
  {
    " TIM14 " ,
     0x40002000 ,
     14 ,
    stm_show_timer,
    76},
  {
    " TIM15 " ,
     0x40014000 ,
     15 ,
    stm_show_timer,
    76},
  {
    " TIM16 " ,
     0x40014400 ,
     16 ,
    stm_show_timer,
    76},
  {
    " TIM17 " ,
     0x40014800 ,
     17 ,
    stm_show_timer,
    76 },
  {
    " USART1 " ,
     0x40013800 ,
     1 ,
    stm_show_USART,
    7 * 4 },
  {
    " USART2 " ,
     0x40004400 ,
     2 ,
    stm_show_USART,
    7 * 4 },
  {
    " USART3 " ,
     0x40004800 ,
     3 ,
    stm_show_USART,
    7 * 4 },
  {
    " USART4 " ,
     0x40004C00 ,
     4 ,
    stm_show_USART,
    7 * 4 },
  {
    " USART5 " ,
     0x40005000 ,
     5 ,
    stm_show_USART,
    7 * 4 },
  {
    " USART1a " ,
     0x40011000 ,
     1,
    stm_show_USART,
    7 * 4 }, /* 32F4xx */
  {
    " USART6 " ,
     0x40011400 ,
     6 ,
    stm_show_USART,
    7 * 4 },
  {
    " I2C1 " ,
     0x40005400 ,
     1 ,
    stm_show_dev,
    36 },
  {
    " I2C2 " ,
     0x40005800 ,
     2,
    stm_show_dev,
    36 },
  {
    " I2C3 " ,
     0x40005C00 ,
     3,
    stm_show_dev,
    36 },
  {
    " DAC " ,
     0x40007400 ,
     3 ,
    stm_show_dev,
    56 }, 
 #if 0 
  { " I2S2 " , 0x40003400 , 2 , stm_show_dev, 0 },
  { " RTC " , 0x40002800 , 0 , stm_show_RTC, 0 },
  { " WWDG " , 0x40002C00 , 0 , stm_show_WWDG, 0 },
  { " IWDG " , 0x40003000 , 0 , stm_show_IWDG, 0 },
 #endif
};

static  int stm32_dev_show( struct stlink* sl, const  char * cmd_name)
{
  int i;
   for (i = 0 ; i < sizeof (dev_per) / sizeof (dev_per[ 0 ] ); i++ )
  {
    struct dev_peripheral *dp = & dev_per[ i ];
     if (strcasecmp( dp->name, cmd_name) == 0 )
    {
      uint32_t *result = ( void *) sl-> data_buf;
       if (dp-> extent)
        stl_rd32_cmd( sl, dp ->addr, dp-> extent );
      dp -> show_func1( sl, dp, result );
       return  0 ;
    }
  }
  return - 1 ;
}

int main( int argc, char * argv[])
{
  char *program; /* Program name without path. */ 
  int c, errflag = 0 ;
   char *dev_name; /* Path of STLink device eg "/dev/stlink" */ 
  char * upload_path = 0 , *download_path = 0 , *verify_path = 0 ;
   int do_blink = 0 ;
   int fd;
   struct stlink * sl;

  program = 
      strrchr( argv[ 0 ], ' / ' )? strrchr( argv[ 0 ], ' / ' ) + 1 : argv[ 0 ];

  while ((c = getopt_long( argc, argv, short_opts, long_options, 0 )) !=- 1 )
  {
    switch (c)
    {
      case  ' B ' :
        do_blink ++ ;
         break ;
       case  ' C ' :
        verify_path = optarg;
        break;
      case 'D':
        download_path = optarg;
        break;
      case 'U':
        upload_path = optarg;
        break;
      case 'h':
      case 'u':
        printf( usage_msg, program );
        return 0;
      case 'v':
        verbose++;
        break;
      case 'V':
        printf( "%s\n", version_msg );
        return 0;
      default:
      case '?':
        errflag++;
        break;
    }
  }

  if ( errflag || argv[ optind ] == NULL )
  {
    fprintf( stderr, usage_msg, program );
    return errflag ? 1 : 2;
  }

  if ( strncmp( argv[ optind ], "/dev/", 5 ) == 0 )
  {
    dev_name = argv[ optind++ ];
  }
  else
  {
    if ( verbose )
      fprintf( stderr, "Using the default device /dev/stlink.\n" );
    dev_name = "/dev/stlink";
  }

  sl = &global_stlink;
  sl = stl_init( sl, dev_name );

  fd = open( dev_name, O_RDWR );
  if ( fd < 0 )
  {
    fprintf( stderr, "Failed to open STLink device %s: %s.\n", dev_name,
      strerror( errno ) );
    return EXIT_FAILURE;
  }

  stl_get_version( sl );
  sl->ver = *(struct STLinkVersion *) sl->data_buf;
  if ( sl->ver.ST_VendorID == 0 && sl->ver.ST_ProductID == 0 )
  {
    fprintf( stderr, "The device %s is reporting an ID of 0/0.\n"
      "  Either the STLink is not plugged in or it is still "
      "being initialized.\n", dev_name );
    return EXIT_FAILURE;
  }
  if ( sl->ver.ST_VendorID != USB_ST_VID
    || sl->ver.ST_ProductID != USB_STLINK_PID )
  {
    fprintf( stderr, "The device %s is not a STLink\n"
      "       VID/PID %04x/%04x instead of %04x/%04x.\n", dev_name,
      sl->ver.ST_VendorID, sl->ver.ST_ProductID, USB_ST_VID, USB_STLINK_PID );
    return EXIT_FAILURE;
  }

  if ( sl->verbose )
    stl_print_version( &sl->ver );

  /* When we open the device it is in an unknown mode.
   * The v1 is likely in mass storage mode.
   * Switch to Single Wire Debug (SWD) mode and issue the required
   * first command, reading the core ID.
   */
  stl_kick_mode( sl );
  stl_enter_SWD_mode( sl );
  if ( stl_mode(sl) != STLinkDevMode_Debug )
  {
    fprintf( stderr, "Warning: Failed to switch the STLink into "
      "debug mode.\n" );
  }

  /* At this point we have identified a working STLink programmer.
   * We now check on the target chip ID and state.
   */
  {
    uint32_t core_id = stl_get_core_id(sl);
    if ( verbose )
      printf( "SWD core ID %8.8x, MCU ID is %8.8x.\n", core_id,
        sl_rd32( sl, DBGMCU_IDCODE ) );
    if ( core_id != 0x1BA01477 && core_id != 0x2BA01477 )
      fprintf( stderr, "Warning: SWD core ID %8.8x did not match the "
        "expected value of %8.8x.\n", core_id, 0x1BA01477 );
  }

  while ( argv[ optind ] )
  {
    char *cmd = argv[ optind ];
    if ( verbose )
      printf( "Executing command %s.\n", argv[ optind ] );

    if ( strcmp( "regs", cmd ) == 0 )
    {
      /* We must be stopped for this to work! */
      stl_get_allregs( sl );
      sl->reg = *(struct ARMcoreRegs*) sl->data_buf;
      stlink_print_arm_regs( &sl->reg );
    }
    else if ( strncmp( "reg", cmd, 3 ) == 0 )
    {
      /* We must be stopped for this to work! */
      int regnum = strtoul( cmd + 3, 0, 0 ); /* Super sleazy */
      printf( "Register %d is %8.8x.\n", regnum, stl_get_reg(sl, regnum) );
    }
    else if ( strncmp( "wreg", cmd, 3 ) == 0 )
    {
      int regnum, regval;
      if ( sscanf( cmd, "wreg%d=%i", &regnum, &regval ) == 2 )
      {
        stl_write_reg( sl, regval, regnum );
      }
      else
        fprintf( stderr, "Unknown register write specification '%s'.\n", cmd );
    }
    else if ( strncmp( "program=", cmd, 8 ) == 0 )
    {
      char *path = cmd + 8;
      uint32_t flash_base = stm_devids[ 0 ].flash_base;
      uint32_t flash_size = stm_devids[ 0 ].flash_size;
      int res;
      /* Write the user flash area. */
      fprintf( stderr, " Writing program from %s into STM32 memory at "
        "0x%8.8x.\n", path, flash_base );
      stl_enter_debug( sl );
      stl_reset( sl );
      stl_flash_erase_page( sl, 0xa11 );
      stl_flash_erase_page( sl, 0xa11 );
      stl_flash_fwrite( sl, path, flash_base, flash_size );
      printf( " Verifying flash write..." );
      fflush( stdout );
      res = stlink_fverify( sl, path, flash_base );
      printf( "file %s %s flash contents\n", path,
        res == 0 ? "matched" : "did not match" );
    }
    else if ( strncmp( "read", cmd, 4 ) == 0 )
    {
      /* Read memory location */
      int memaddr = strtoul( cmd + 4, 0, 0 ); /* Super sleazy */
      uint32_t *result = (void*) sl->data_buf;
      write_uint32( sl->cmd_buf + 2, memaddr );
      write_uint16( sl->cmd_buf + 6, 17 );
      stlink_cmd( sl, STLinkDebugReadMem32bit, memaddr, 16 );
      printf( "Memory %8.8x is %8.8x %8.8x %8.8x %8.8x.\n", memaddr,
        result[ 0 ], result[ 1 ], result[ 2 ], result[ 3 ] );
#if 0
      printf("Memory %8.8x is %8.8x.\n",
          memaddr, sl_rd32(sl, memaddr));
#endif
    }
    else if ( strncmp( "write", cmd, 3 ) == 0 )
    {
      int memaddr, memval;
      if ( sscanf( cmd, "write%i=%i", &memaddr, &memval ) == 2 )
      {
        printf( "Memory write %8.8x = %8.8x.\n", memaddr, memval );
        sl_wr32( sl, memaddr, memval );
      }
      else
        fprintf( stderr, "Unknown memory write specification '%s'.\n", cmd );
    }
    else if ( strncmp( "flash:r:", cmd, 8 ) == 0 )
    {
      char *path = cmd + 8;
      uint32_t flash_base = stm_devids[ 0 ].flash_base;
      uint32_t flash_size = stm_devids[ 0 ].flash_size;
      /* Read the program area. */
      fprintf( stderr, " Reading ARM memory 0x%8.8x..0x%8.8x into %s.\n",
        flash_base, flash_base + flash_size, path );
      stl_fread( sl, path, flash_base, flash_size );
    }
    else if ( strncmp( "flash:w:", cmd, 8 ) == 0 )
    {
      char *path = cmd + 8;
      uint32_t flash_base = stm_devids[ 0 ].flash_base;
      uint32_t flash_size = stm_devids[ 0 ].flash_size;
      /* Write the user flash area. */
      fprintf( stderr, " Writing ARM memory 0x%8.8x..0x%8.8x from %s.\n",
        flash_base, flash_base + flash_size, path );
      stl_flash_fwrite( sl, path, flash_base, flash_size );
    }
    else if ( strncmp( "flash:v:", cmd, 8 ) == 0 )
    {
      char *path = cmd + 8;
      uint32_t flash_base = stm_devids[ 0 ].flash_base;
      const int res = stlink_fverify( sl, path, flash_base );
      printf( "  Check flash: file %s %s flash contents\n", path,
        res == 0 ? "matched" : "did not match" );
    }
    else if ( strncmp( "sys:r:", cmd, 6 ) == 0 )
    {
      char *path = cmd + 6;
      uint32_t membase = stm_devids[ 0 ].sysflash_base;
      uint32_t size = stm_devids[ 0 ].sysflash_size;
      /* Read the system flash memory. */
      fprintf( stderr, " Reading ARM memory 0x%8.8x..0x%8.8x into %s.\n",
        membase, membase + size, path );
      stl_fread( sl, path, membase, size );
    }
    else if ( strcmp( "status", cmd ) == 0 )
    {
      sl->core_state = stl_get_status(sl);
      printf( "ARM status is 0x%4.4x: %s.\n", sl->core_state,
        sl->core_state == STLINK_CORE_RUNNING ?
          "running" :
          ( sl->core_state == STLINK_CORE_HALTED ? "halted" : "unknown" ) );
    }
    else if ( strcmp( "blink", cmd ) == 0 )
    {
      stm_discovery_blink( sl );
    }
    else if ( strcmp( "info", cmd ) == 0 )
    {
      stm_info( sl );
    }
    else if ( strcmp( "reset", cmd ) == 0 )
    {
      stl_reset( sl );
    }
    else if ( strcmp( "version", cmd ) == 0 )
    {
      stl_get_version( sl );
      sl->ver = *(struct STLinkVersion *) sl->data_buf;
      stl_print_version( &sl->ver );
    }
    else if ( strcmp( "debug", cmd ) == 0 )
    {
      stl_enter_debug( sl );
    }
    else if ( strcmp( "run", cmd ) == 0 )
    {
      stl_state_run( sl );
    }
    else if ( strcmp( "step", cmd ) == 0 )
    {
      stl_step( sl );
    }
    else if ( strcmp( "sleep", cmd ) == 0 )
    {
      sleep( 5 );
    }
    else if ( strcmp( "erase", cmd ) == 0 )
    {
      /* The user usually wants to do an erase-all.  Make it simple. */
      stl_enter_debug( sl );
      stl_reset( sl );
      if ( stl_flash_erase_page( sl, 0xa11 ) != 0 )
        stl_flash_erase_page( sl, 0xa11 );
    }
    else if ( strncmp( "erase=", cmd, 6 ) == 0 )
    {
      /* Erase a flash page at location */
      int memaddr =
          strcmp( cmd + 6, "all" ) == 0 ? 0xa11 : strtoul( cmd + 6, 0, 0 ); /* Sleazy parse. */
      stl_enter_debug( sl );
      stl_flash_erase_page( sl, memaddr );
    }
    else if ( strncmp( "loader=", cmd, 7 ) == 0 )
    {
      /* Write a flash location */
      int memaddr = strtoul( cmd + 7, 0, 0 ); /* Super sleazy */
      uint32_t buf = 0x6524dbec;
      stl_flash_write( sl, memaddr, &buf, sizeof buf );
    }
    else if ( strcmp( "cmd12", cmd ) == 0 )
    {
      printf( "Result of Commmand12 is %2.2x.\n",
        stlink_cmd( sl, 0x0c, 0, 0 ) );
    }
    /* The table-driven peripheral device display commands. */
    else if ( stm32_dev_show( sl, cmd ) == 0 )
    {
      ; /* dev_show() has already done the work.  */
    }
    else
    {
      fprintf( stderr, "Unrecognized command '%s'.\n", cmd );
      break;
    }
    optind++;
  }

  /* A list of the features/bugs that I still need to check.
   * Read the CPU ID base register at 0xe000ed00  -> 0x411fc231
   * MPU type at 0xe000ed90 -> 0  (none)
   * DHCSR  0xe000edf0
   * GPIOC_ODR  0x4001100c
   * Try 5.99 and 6KB reads.
   * Check for a read or write bug on 1K/2K/3K/4K boundaries.
   * - Both aligned and unaligned with target page boundaries.
   * - Pre-fill the SCSI transfer buffer to check for transfer size overrun.
   * - Check for transfer overrun on 1, 2 and 3 byte transfers.
   * Check what happens with unaligned mem32 transfers, read and write.
   *  - Note state of STLink after failure, including next command response.
   */

#if 0
  /* Switch back to mass storage mode before closing. */
  stl_state_run(sl);
  stl_exit_debug_mode(sl);
#endif
  /* Commands tend to 'stick' in the stlink.  Flush them. */
  stl_get_status( sl );
  stl_close( sl );

  return EXIT_SUCCESS;
}

/*
 * Local variables:
 *  compile-command: "make"
 *  c-indent-level: 4
 *  c-basic-offset: 4
 *  tab-width: 4
 * End:
 */

 
  
