#if defined (__USE_LPCOPEN)
#if defined(NO_BOARD_LIB)
#include "chip.h"
#else
#include "stdio.h"
#include "board.h"
#include <inits.h>
#include <libusbdev.h>
#include <GPDMA.h>
#endif
#endif
#include <cr_section_macros.h>
#define FREQTIMER0M0 1000
#define PACKET_BUFFER_SIZE
#define LUSB_DATA_PENDING
1024//4096
_BIT(0)
static uint8_t g_rxBuff[PACKET_BUFFER_SIZE];
static uint8_t g_txBuff[8192]; //4096
static uint8_t g_txBuff1[8192];
static uint8_t g_txBuff2[8192];
static uint8_t g_txBuff3[8192];
//volatile uint32_t samplevector[32000];
volatile uint32_t numsamples = 0;
volatile bool unhandledReq = false;
volatile bool usbDumpConnected = false;
volatile uint8_t pendingChunks = 0;
volatile uint8_t count = 0;
uint32_t sampleados = 0;
void samplingADC(void);
void usbTransferControl(void);
int rateTable[6] = {100,250,400,500,1000,2000,4000};//Srate = (80/(delay+1))
int main(void) {
//Read clock settings and update SystemCoreClock variable
SystemCoreClockUpdate();
//Init section (Board, gpio, Timers, ADC, WDT)
Board_Init();
GPIO_init();
GPDMA_init();
libusbdev_init(USB_STACK_MEM_BASE, USB_STACK_MEM_SIZE);
Board_LED_Set(0, false);
LPC_GPDMA->SYNC = 1;
//Sync GPDMA enabled.
while (1) {
//
Chip_WWDT_Feed(LPC_WWDT); //Reset WDT
usbTransferControl();
//Handles PC-board events.
}
return 0; //Fin del programa
}
void usbTransferControl() {
//Handles every PC->Board interaction events.
//Optimized for High Speed
int i;
if (libusbdev_Connected()) {
if (libusbdev_QueueReadDone() != -1) {//Enter here when receiving data.
libusbdev_QueueReadReq(g_rxBuff, PACKET_BUFFER_SIZE);
//Process the data request, save the received data at
g_rxBuff.
if (g_rxBuff[0] == '0'); (Unimplemented in this version)
if (g_rxBuff[0] == '1') {
HSADC_init((int)rateTable[g_rxBuff[1]-'0']);
samplingADC();
usbDumpConnected = true; //When receiving '1' enter
in Dump-Data mode
Board_LED_Set(0,true);
//GPDMA_capture(&g_txBuff[0], 128);
//Starts DMA capture
ADC_DMA_captureUSB(&g_txBuff[0], &g_txBuff1[0],
&g_txBuff2[0], &g_txBuff3[0], 2048); //PCK Bytes/4
}
if (g_rxBuff[0] == '2') {
usbDumpConnected = false; //When receiving '2'
exits Dump-Data mode
//Clear unsent buffers
Board_LED_Set(0,false);
gpdmaTurnOff();
for (i = 0; i < 8192; i++) {
g_txBuff[i] = 0;
g_txBuff1[i] = 0;
g_txBuff2[i] = 0;
g_txBuff3[i] = 0;
}
}
g_rxBuff[0] = 0;
}
//Clear Buffer RX
}
}
void samplingADC(void) {
LPC_ADCHS->DSCR_STS = ((0 << 1) | 0); //Descriptor table 0
LPC_ADCHS->TRIGGER = 1;
//SW trigger ADC
}
/////////////Interrupt service Handler Functions//////////////////////////
void TIMER0_IRQHandler(void)
//Not Used
{
if (Chip_TIMER_MatchPending(LPC_TIMER0, 0)) {
LPC_TIMER0->IR = TIMER_IR_CLR(0);
LPC_ADCHS->TRIGGER = 1;
}
}
void ADCHS_IRQHandler(void)
//Not Used
{
uint32_t sts;
// Get ADC interrupt status on group 0 (TEST)
sts = Chip_HSADC_GetIntStatus(LPC_ADCHS, 0)
& Chip_HSADC_GetEnabledInts(LPC_ADCHS, 0);
// Clear group 0 interrupt statuses
Chip_HSADC_ClearIntStatus(LPC_ADCHS, 0, sts);
}
void DMA_IRQHandler(void) {
uint32_t actualLLI;
static bool on1, on2;
if (usbDumpConnected == true) {
//If USB is in dump mode
actualLLI = LPC_GPDMA->CH[0].LLI;
//Look at LLI in order to
know what is the previous full USB buffer and send to PC
if (actualLLI == (uint32_t) &arrayLLI[0]) {
while (libusbdev_QueueSendDone() != 0);
while (libusbdev_QueueSendReq(g_txBuff2, 8192) != 0);
}
if (actualLLI == (uint32_t) &arrayLLI[1]) {
while (libusbdev_QueueSendDone() != 0);
while (libusbdev_QueueSendReq(g_txBuff3, 8192) != 0);
}
if (actualLLI == (uint32_t) &arrayLLI[2]) {
while (libusbdev_QueueSendDone() != 0);
while (libusbdev_QueueSendReq(g_txBuff, 8192) != 0);
}
if (actualLLI == (uint32_t) &arrayLLI[3]) {
while (libusbdev_QueueSendDone() != 0);
while (libusbdev_QueueSendReq(g_txBuff1, 8192) != 0);
}
}
LPC_GPDMA->INTTCCLEAR = LPC_GPDMA->INTTCSTAT;
//GPDMA_capture(&g_txBuff[0], 128);
//Restart DMA operation
//Board_LED_Set(0,true);


