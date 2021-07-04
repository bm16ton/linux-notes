## Controlling the RTS and DTR pins of a Linux Serial Port using ioctl() calls

The C code uses ioctl() calls controls the logic levels of DTR and RTS pins of a Linux Serial Port.

<img src = "http://s25.postimg.org/kice5qoin/RTS_Program.jpg" alt = "Screenshot of program for controlling RTS and DTR pins on a Linux Serial port using ioctl calls"/>
 
The <a href = "http://xanthium.in/Controlling-RTS-and-DTR-pins-SerialPort-in-Linux">full explanation of the code can be found here.</a> 

<img src = "http://s25.postimg.org/4fsg6o5nj/rts_connected_usb2serial.jpg" alt = "Picture of USB to Serial converter controlling RTS and DTR pins using ioctl calls"/> 

The C files can be compiled using **GCC** 

The Code will Work With Standard **RS232 Serial ports** or any **USB to Serial Converter**.

More info about the  <a href = "http://xanthium.in/USB-to-Serial-RS232-RS485-Converter">USB to Serial/RS232/RS485 Converter used in the above tutorial can be found here</a>

<img src = "http://s25.postimg.org/ucb73bztr/usb_to_rs485_converter_250px.jpg"  href="http://xanthium.in/USB-to-Serial-RS232-RS485-Converter"/>
