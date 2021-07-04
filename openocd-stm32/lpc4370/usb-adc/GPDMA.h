#ifndef GPDMA_H_
#define GPDMA_H_
#define Ph(n) (n)
void GPDMA_init(void);
void GPDMA_M2Mtransfer(uint32_t *src, uint32_t *dst, uint32_t burst);
void GPDMA_ADC2Mtransfer(uint32_t *dst, uint32_t burst);
extern uint32_t makeCtrlWord(const GPDMA_CH_CFG_T *GPDMAChannelConfig,
uint32_t , uint32_t,
uint32_t, uint32_t);
void GPDMA_capture(uint32_t *dst, int samples);
void ADC_DMA_capture(uint32_t *dst, uint32_t samples);
void gpdmaTurnOff(void);
DMA_TransferDescriptor_t arrayLLI[20];
typedef struct{
    uint32_t SrcAddr;
    uint32_t DstAddr;
    uint32_t NextLLI;
    uint32_t Control;
}GPDMA_vector;

void GPDMA_init(void) {
    Chip_GPDMA_Init(LPC_GPDMA); //Clk settings
    NVIC_DisableIRQ(DMA_IRQn);
    NVIC_SetPriority(DMA_IRQn, 0x2);
    LPC_GPDMA->INTTCCLEAR = 0x1; //Clr int flags for CH0
    LPC_GPDMA->INTERRCLR = 0x1; //Clr error flags for CH0
/* Setup the DMAMUX */
    LPC_CREG->DMAMUX &= ~(0x3 << (Ph(7) * 2));
    LPC_CREG->DMAMUX |= 0x3 << (Ph(7) * 2);
    LPC_CREG->DMAMUX &= ~(0x3 << (Ph(8) * 2));
    LPC_CREG->DMAMUX |= 0x3 << (Ph(8) * 2);

    LPC_GPDMA->CONFIG = 0x1; //Enable bit for DMA
    while (!(LPC_GPDMA->CONFIG & 0x01)); //Wait until GPDMA is enabled
    NVIC_EnableIRQ(DMA_IRQn);
}
void GPDMA_M2Mtransfer(uint32_t *src, uint32_t *dst, uint32_t burst){
    uint8_t channel;
//Free channel searching
    channel = Chip_GPDMA_GetFreeChannel(LPC_GPDMA, 8); //Peripheral ID 8:ADCHS read
//Channel connection FIFO to variable
    Chip_GPDMA_Transfer(LPC_GPDMA, channel, (uint32_t) src, (uint32_t)
    dst, GPDMA_TRANSFERTYPE_M2M_CONTROLLER_DMA, burst);
}
void GPDMA_ADC2Mtransfer(uint32_t *dst, uint32_t burst){
    uint8_t channel=0;
//Free channel searching
//channel = Chip_GPDMA_GetFreeChannel(LPC_GPDMA, 8);
//Peripheral
//ID 8: ADCHS read
//Channel connection FIFO to variable
    Chip_GPDMA_Transfer(LPC_GPDMA, channel, 8, (uint32_t) dst,
    GPDMA_TRANSFERTYPE_P2M_CONTROLLER_DMA, burst);
//Chip_GPDMA_Stop(LPC_GPDMA, channel);
}
void GPDMA_InitADV(uint32_t *dst){
    int size = 500;
    Chip_GPDMA_Init(LPC_GPDMA); //Clk settings
    NVIC_DisableIRQ(DMA_IRQn);
    NVIC_SetPriority(DMA_IRQn, 0x2);
    LPC_GPDMA->INTTCCLEAR = 0x1; //Clr int flags for CH0
    LPC_GPDMA->INTERRCLR = 0x1; //Clr error flags for CH0
/* Setup the DMAMUX*/
    LPC_CREG->DMAMUX &= ~(0x3<<(Ph(7) * 2));
    LPC_CREG->DMAMUX |= 0x3<<(Ph(7) * 2);
    LPC_CREG->DMAMUX &= ~(0x3<<(Ph(8) * 2));
    LPC_CREG->DMAMUX |= 0x3<<(Ph(8) * 2);/* peripheral 7 ADC Write(0x3) */
    LPC_GPDMA->CONFIG = 0x1; //Enable bit for DMA
    while ( !(LPC_GPDMA->CONFIG & 0x01) ); //Wait until GPDMA is enabled
//GPDMA now is enabled, Next code is to configure channel 0 for ADC dump to memory.
    LPC_GPDMA->CH[0].SRCADDR = (uint32_t) &(LPC_ADCHS->FIFO_OUTPUT);
    LPC_GPDMA->CH[0].DESTADDR = (uint32_t) dst;
//Destination address, variable
    LPC_GPDMA->CH[0].LLI = 0;
//Configuration registers for channel 0
    LPC_GPDMA->CH[0].CONTROL = (size << 0) |
// Transfersize (does not matter when flow control is handled by peripheral)
    (0x3 << 12) |
// Source Burst Size
    (0x3 << 15) |
// Destination Burst Size
    (0x2 << 18) |
// Source width // 32 bit width
    (0x2 << 21) |
// Destination width
// 32 bits
    (0x1 << 24) |
// Source AHB master 0 / 1
    (0x1 << 25) |
// Dest AHB master 0 / 1
    (0x0 << 26) |
// Source increment(LAST Sample)
    (0x1 << 27) |
// Destination increment
    (0x1 << 31);
// Terminal count interrupt disabled
    LPC_GPDMA->CH[0].CONFIG |= (0x1 << 0)   |
    (0x8 << 1) |
//
    (0x0 << 6) |
//
    (0x2 << 11) |
//
    (0x1 << 14) |
//
    (0x1 << 15);
//

// Channel Enable

    NVIC_EnableIRQ(DMA_IRQn);
}

void GPDMA_capture(uint32_t *dst, int samples){
    NVIC_DisableIRQ(DMA_IRQn);
//configure channel 0 for ADC dump to memory.
    LPC_GPDMA->CH[0].SRCADDR = (uint32_t) &(LPC_ADCHS->FIFO_OUTPUT);
//Source address, ADC FIFO
    LPC_GPDMA->CH[0].DESTADDR = (uint32_t) dst;
//Destination address, variable
    LPC_GPDMA->CH[0].LLI = 0;
//Configuration registers for channel 0
    LPC_GPDMA->CH[0].CONTROL = (samples << 0) |
// Transfersize

    (0x2 << 12) |
// Source Burst Size
    (0x2 << 15) |
// Destination Burst Size
    (0x2 << 18) |
// Source width // 32 bit width
    (0x2 << 21) |
// Destination width
// 32 bits
    (0x1 << 24) |
// Source AHB master 0 / 1
    (0x1 << 25) |
// Dest AHB master 0 / 1
    (0x0 << 26) |
// Source increment(LAST Sample)
    (0x1 << 27) |
// Destination increment
    (0x1 << 31);
// Terminal count interrupt disabled
    LPC_GPDMA->CH[0].CONFIG |= (0x1 << 0) |
// Channel Enable
    (0x8 << 1) |
// Source Peripheral //Ph8 -> ADC read
    (0x0 << 6)  |
// Destination Peripheral //Ph0 -> Memory
    (0x2 << 11) |
    (0x1 << 14) |
    (0x1 << 15);

    NVIC_EnableIRQ(DMA_IRQn);
}
void ADC_DMA_capture(uint32_t *dst, uint32_t samples){
    uint32_t numLLI = 0, meansamples = 0, lastsamples = 0;
    uint32_t i = 0;
    if(samples%4000 == 0)numLLI = samples/4000;
//Divide the number

    else numLLI = samples/4000 + 1;

    meansamples = samples/numLLI;
//Number of samples for each LLI
    lastsamples = samples-meansamples*(numLLI-1); //Number of samples forthe lastLLI
//Filling the linked list array with all the parameters (ADDRESSES and

    for(i=0; i < (numLLI); i++){
        arrayLLI[i].dst = (uint32_t) dst + (uint32_t) (i*meansamples*4);
        arrayLLI[i].src = &(LPC_ADCHS->FIFO_OUTPUT[0]);
        arrayLLI[i].lli = &arrayLLI[i+1];
//Direction
//for the next LLI array position.
        arrayLLI[i].ctrl = (meansamples << 0) |

        (0x2 << 12) |
        (0x2 << 15) |
        (0x2 << 18) |
        (0x2 << 21) |
        (0x1 << 24) |
        (0x1 << 25) |
        (0x0 << 26) |
        (0x1 << 27) |
        (0x0 << 31);

}
    arrayLLI[numLLI-1].lli = 0x0;
// Source Burst Size
// Destination Burst Size
// Source width // 32 bit width
// Destination width
// 32 bits
// Source AHB master 0 / 1
// Dest AHB master 0 / 1
// Source increment(LAST Sample)
// Destination increment
// Terminal count interrupt disabled
//Indicate the last LLI by writing a 0
//Last control register must contain the number of samples for thelast chunk, and enable the count interrupt
//to indicate that the overall sampling operation is finished.
    arrayLLI[numLLI-1].ctrl = (lastsamples << 0) |
//
Transfersize (does not matter when flow control is handled by
peripheral)
    (0x2 << 12) |
// Source Burst Size
    (0x2 << 15) |
// Destination Burst Size
    (0x2 << 18) |
// Source width // 32 bit width
    (0x2 << 21) |
// Destination width
// 32 bits
    (0x1 << 24) |
// Source AHB master 0 / 1
    (0x1 << 25) |
// Dest AHB master 0 / 1
    (0x0 << 26) |
(0x1 << 27) |
(0x1 << 31);

// Destination increment
// Terminal count interrupt Enabled
//Chip_GPDMA_SGTransfer(LPC_GPDMA, 0, arrayLLI,
GPDMA_TRANSFERTYPE_P2M_CONTROLLER_DMA);
//Filling first LLI array to the registers in order to initialize thesystem.
    LPC_GPDMA->CH[0].SRCADDR = arrayLLI[0].src;
    LPC_GPDMA->CH[0].DESTADDR = arrayLLI[0].dst;
    LPC_GPDMA->CH[0].CONTROL = arrayLLI[0].ctrl;
    LPC_GPDMA->CH[0].LLI = (uint32_t)(&arrayLLI[1]); // must be pointingto the second LLI as the first is used when initializing
    LPC_GPDMA->CH[0].CONFIG |= (0x1 << 0) |
// Channel Enable
    (0x8 << 1) |
// Source Peripheral //Ph8 -> ADC read
    (0x0 << 6) |
// Destination Peripheral //Ph0 -> Memory
    (0x2 << 11) |
// Flow Control (P2M DMA control)
    (0x1 << 14) |
// Int error mask
    (0x1 << 15);
// ITC - term count error mask
}
void ADC_DMA_captureUSB(uint32_t *dst0, uint32_t *dst1, uint32_t *dst2,
uint32_t *dst3, uint32_t samples){
    uint32_t numLLI = 0, meansamples = 0, lastsamples = 0;
    uint32_t i = 0;
//Filling the linked list array with all the parameters (ADDRESSES and CONTROL)
    arrayLLI[0].dst = (uint32_t) dst0;
    arrayLLI[1].dst = (uint32_t) dst1;
    arrayLLI[2].dst = (uint32_t) dst2;
    arrayLLI[3].dst = (uint32_t) dst3;
    for(i=0; i < (4); i++){
        arrayLLI[i].src = &(LPC_ADCHS->FIFO_OUTPUT[0]);
        arrayLLI[i].lli = &arrayLLI[i+1];
        for the next LLI array position.
        arrayLLI[i].ctrl = (samples << 0)

(0x2 << 12) |
(0x2 << 15) |
(0x2 << 18) |
(0x2 << 21) |
(0x1 << 24) |
(0x1 << 25) |
(0x0 << 26) |
(0x1 << 27) |
(0x1 << 31);
}
arrayLLI[3].lli = &arrayLLI[0];
    LPC_GPDMA->CH[0].SRCADDR = arrayLLI[0].src;
    LPC_GPDMA->CH[0].DESTADDR = arrayLLI[0].dst;
    LPC_GPDMA->CH[0].CONTROL = arrayLLI[0].ctrl;
    LPC_GPDMA->CH[0].LLI = (uint32_t)(&arrayLLI[1]);
    LPC_GPDMA->CH[0].CONFIG |= (0x1 << 0)

// Channel Enable
    (0x8 << 1) |
// Source Peripheral //Ph8 -> ADC read
    (0x0 << 6) |
// Destination Peripheral //Ph0 -> Memory
    (0x2 << 11) |
// Flow Control (P2M DMA control)
    (0x1 << 14) |
// Int error mask
    (0x1 << 15);
// ITC - term count error mask
}
void gpdmaTurnOff(void){
    LPC_GPDMA->CH[0].LLI = 0;
    LPC_GPDMA->CH[0].CONFIG |= (0x0 << 0)
    (0x8 << 1) |
//
    (0x0 << 6) |
//
    (0x2 << 11) |
//
    (0x1 << 14) |
//
    (0x1 << 15);
//
}
//OPT: Create a LLI for USB only!
#endif /* GPDMA_H_ */


