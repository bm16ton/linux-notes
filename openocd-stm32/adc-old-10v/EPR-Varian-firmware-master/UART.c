#include "iom8.h"
#include "macros.h"
#include "extern.h"




/* Prototypes */
void InitUART( void );
void TransmitByte( unsigned char data );


/* Initialize UART */
void InitUART(void)
{
	unsigned char x;

        UBRRH = 0;
	UBRRL = 7; 	/* Set the baud rate 4800@1MHz */
	/* Enable UART receiver and transmitter, and receive interrupt */

	UCSRB = ( (1<<RXCIE) | (1<<RXEN) | (1<<TXEN) );
        UCSRC = (1<<URSEL)|(1<<UCSZ1)|(1<<UCSZ0);

}

/* Interrupt handlers */
#pragma vector=USART_RXC_vect
__interrupt void UART_RX_interrupt( void )
{
	data = UDR;                 /* Read the received data */
}

#pragma vector=USART_UDRE_vect
__interrupt void UART_TX_interrupt( void )
{
	
		UDR = data;  /* Start transmition */
          UCSRB = (0<<UDRIE);                    /* Enable UDRE interrupt */
	}


void TransmitByte( void)
{
          UCSRB |= (1<<UDRIE);                    /* Enable UDRE interrupt */
}

