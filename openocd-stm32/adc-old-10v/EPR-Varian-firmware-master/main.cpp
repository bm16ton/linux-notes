#include "iom8.h"
#include "ina90.h"
#include "stdio.h"

#define SetBit(address, bit)(address |= (1 << bit))
#define ClrBit(address, bit)(address &= ~(1 << bit))
#define InvBit(address, bit)(address ^= (1 << bit))
#define IsBitOn(address, bit)(address & (1 << bit))
#define IsBitOff(address, bit)(!(address & (1 << bit)))

#define D_in 1
#define D_out 2
#define RFS 3
#define TFS 4
#define SCLK 5

#define ADC_CHAN_NUMBER 0
#define ADC_TRANS_COMMAND 0xAA
#define TRANS_CYCLES_NUM 100
#define ADC_PORT PORTB
#define RIGHT_LIM_PORT PORTC
#define RIGHT_LIM 3
#define LEFT_LIM_PORT PORTC
#define LEFT_LIM 2
#define OVERRIDE_PORT PORTC
#define OVERRIDE 5
#define STEP_PORT PORTC
#define STEP 4
#define ADC_PIN PINB
#define ADC_STROBE_DELAY 10
#define ADC_TRANS_DELAY 10
#define ADC_CONV_DELAY 10
#define ADC_STROBE_DELAY 10
#define STEP_NUMBER 10000
#define STEP_DELAY 10

volatile unsigned char a, channel, t0, t1, data0, data1, flag;
unsigned int result, timer;
unsigned char i;

void Wait(unsigned int pause) {
  unsigned int i;
  for (i = 0; i < pause; i++) {}
}
void WaitMs(unsigned int pause) {
  unsigned int i;
  for (i = 0; i < pause; i++) Wait(1000);
}

void portsInit() {
  DDRD = 0xFF; //выход
  DDRB = 0xFB;
  DDRC = 0xF3;
  PORTD = 0xff;
  PORTC = 0x00;
  PORTB = 0x00;
  SetBit(ADC_PORT, D_out);
  SetBit(RIGHT_LIM_PORT, RIGHT_LIM);
  SetBit(LEFT_LIM_PORT, LEFT_LIM);

  SetBit(OVERRIDE_PORT, OVERRIDE);
  SetBit(STEP_PORT, STEP);

  SetBit(ADC_PORT, TFS);
  SetBit(ADC_PORT, RFS);
}

void WDTinit() {
    WDTCR = 0x18;
    WDTCR = 0x10; //стоп WDT
}
  /* Initialize UART */
void InitUART(void) {
  UBRRH = 0;
  UBRRL = 3; /* Set the baud rate 57600 3.579 MHz */
  UCSRB = ((1 << RXCIE) | (1 << RXEN) | (1 << TXEN)); /* Enable UART receiver and transmitter, and receive interrupt */
  UCSRC = (1 << URSEL) | (1 << UCSZ1) | (1 << UCSZ0);
}

unsigned int GetADCResult(unsigned char chan) {
  unsigned char ctr;
  unsigned int res = 0;
  char i;
  ctr = chan << 5;
  ctr &= 0xE0;
  ctr |= 0x10;
  ClrBit(ADC_PORT, SCLK);
  ClrBit(ADC_PORT, TFS);
  Wait(ADC_STROBE_DELAY);
  for (i = 0; i < 8; i++) {
    ClrBit(ADC_PORT, SCLK);
    Wait(ADC_TRANS_DELAY);

    if (ctr & 0x80)
      SetBit(ADC_PORT, D_in);
    else
      ClrBit(ADC_PORT, D_in);
    Wait(ADC_TRANS_DELAY);

    SetBit(ADC_PORT, SCLK);
    Wait(ADC_TRANS_DELAY);
    ctr <<= 1;
  }
  ClrBit(ADC_PORT, SCLK);
  SetBit(ADC_PORT, TFS);
  Wait(ADC_CONV_DELAY);

  ClrBit(ADC_PORT, D_in);
  ClrBit(ADC_PORT, RFS);
  Wait(ADC_STROBE_DELAY);

  for (i = 0; i < 16; i++) {
    SetBit(ADC_PORT, SCLK);
    Wait(ADC_TRANS_DELAY);

    if (IsBitOn(ADC_PIN, D_out))
      res |= 0x01;

    ClrBit(ADC_PORT, SCLK);
    Wait(ADC_TRANS_DELAY);

    if (i != 15)
      res <<= 1;
  }
  SetBit(ADC_PORT, RFS);
  Wait(ADC_STROBE_DELAY);
  res &= 0xFFF;

  return res;
}

#pragma vector = USART_RXC_vect
__interrupt void UART_RX_interrupt(void) {
  buffer = UDR;
  switch (buffer) {
  case 0x36:
    flag = 1;
    break;
  case 0x30:
    flag = 2;
    break;
  case 0x34:
    flag = 3;
    break;
  case 0x32:
    flag = 4;
    break;
  }
}

void doStep() {
  if ((timer <= STEP_NUMBER) 
	&& (IsBitOn(LEFT_LIM_PIN, LEFT_LIM)) 
	&& (IsBitOn(RIGHT_LIM_PIN, RIGHT_LIM))) {
    ClrBit(STEP_PORT, STEP);
    Wait(STEP_DELAY);
    SetBit(STEP_PORT, STEP);
    Wait(STEP_DELAY);
  }
  timer++;
}

int main(void) {
  portsInit();
  WDTinit();
  
  timer = 0;
  
  __enable_interrupt();
  InitUART();

  while (1) {
    __delay_cycles(100);

    switch (flag) {
    case 1:{
        flag = 0;
		timer = 0;
      }
      break; // условие STOP  
    case 2:{
        flag = 0;
		TransmitByte(0x31);
      }
      break; //Проверка связи
    case 3:{
        ClrBit(OVERRIDE_PORT, OVERRIDE);
        SetBit(PEN_LIFT_PORT, PEN_LIFT);
        while (flag == 3) {
          doStep();
          result = GetADCResult(ADC_CHAN_NUMBER); //Чтение даннах АЦП
          data0 = result & 0x00ff;
          data1 = result >> 8;
          TransmitByte(ADC_TRANS_COMMAND);
          TransmitByte(data1);
          TransmitByte(data0);
          WaitMs(TRANS_CYCLES_NUM);
        }
        SetBit(OVERRIDE_PORT, OVERRIDE);
        ClrBit(PEN_LIFT_PORT, PEN_LIFT);
      }
      break;
    case 4:{
        timer = 0;
        ClrBit(OVERRIDE_PORT, OVERRIDE);
        while ((IsBitOn(RIGHT_LIM_PIN, RIGHT_LIM)) && (flag == 4)) {
          doStep();
        }
        TransmitByte(0x33);
        timer = 0;
        flag = 0;
        SetBit(OVERRIDE_PORT, OVERRIDE);
      }
      break;
    } //switch */
  }
}