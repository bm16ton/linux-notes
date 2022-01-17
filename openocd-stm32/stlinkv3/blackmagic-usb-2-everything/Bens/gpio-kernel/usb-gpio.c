#include <linux/kernel.h>
#include <linux/errno.h>
#include <linux/module.h>
#include <linux/slab.h>
#include <linux/types.h>

#include <linux/usb.h>
#include <linux/gpio.h>
#include <linux/uio_driver.h>

#include <linux/delay.h>
#include <linux/iopoll.h>

#define USB_CMD_WRITE       0
#define USB_CMD_READ        1
#define USB_CMD_GPIO_OUTPUT 2
#define USB_CMD_GPIO_INPUT  3
#define USB_CMD_GPIO_SET    4
#define USB_CMD_GPIO_GET    5

#define VID 0x1D50
#define PID 0x6018

#define FLAGS_BEGIN 1
#define FLAGS_END   2

const char *gpio_names[] = { "gpio0", "gpio1", "gpio2", "gpio3", "LED" };

struct spi_tiny_usb {
	struct usb_device *usb_dev;	/* the usb device for this device */
	struct usb_interface *interface;	/* the interface for this device */
	struct urb *urb;	/* urb for usb interrupt transfer */
	char *urbBuffer;	/* urb incoming data buffer */
	struct uio_info *uio;	/* Userspace IO for interrupt management */
	struct gpio_chip gpio_chip;	/* gpio related things */
};

static void spi_tiny_usb_free(struct spi_tiny_usb *priv)
{
	usb_put_dev(priv->usb_dev);
	kfree(priv);
}

static int
usb_read(struct spi_tiny_usb *dev, int cmd, int value, int index, void *data, int len);
static int
usb_write(struct spi_tiny_usb *dev, int cmd, int value, int index, void *data, int len);
/*
static int spi_tiny_usb_irqcontrol(struct uio_info *info, s32 irq_on)
{
	struct spi_tiny_usb *priv = (struct spi_tiny_usb *)info->priv;
	dev_dbg(&priv->interface->dev, "spi_tiny_usb_irqcontrol\n");
	return 0;
}
*/
static inline struct spi_tiny_usb *spi_tiny_usb_gc_to_priv(struct gpio_chip *chip)
{
	return container_of(chip, struct spi_tiny_usb, gpio_chip);
}

static int spi_tiny_usb_gpio_input(struct gpio_chip *chip, unsigned offset)
{
	struct spi_tiny_usb *priv = spi_tiny_usb_gc_to_priv(chip);
	int ret;

	if (offset == 0)
		return -ENXIO;

	ret = usb_read(priv, USB_CMD_GPIO_INPUT, 0, offset, 0, 0);
	if (ret < 0)
		return ret;

	return 0;
}

static int spi_tiny_usb_gpio_get(struct gpio_chip *chip, unsigned offset)
{
	struct spi_tiny_usb *priv = spi_tiny_usb_gc_to_priv(chip);
	int ret, retval;

	char *rxbuf = kmalloc(1, GFP_KERNEL);
	if (!rxbuf)
		return -ENOMEM;
	ret = usb_read(priv, USB_CMD_GPIO_GET, 0, offset, rxbuf, 1);
	retval = rxbuf[0] ? 1 : 0;
	kfree(rxbuf);
	if (ret < 0)
		return ret;

	return retval;
}

static int spi_tiny_usb_gpio_output(struct gpio_chip *chip, unsigned offset, int val)
{
	struct spi_tiny_usb *priv = spi_tiny_usb_gc_to_priv(chip);
	int ret;

	ret = usb_read(priv, USB_CMD_GPIO_OUTPUT, 0, offset, 0, 0);
	if (ret < 0)
		return ret;

	return 0;
}

static void spi_tiny_usb_gpio_set(struct gpio_chip *chip, unsigned offset, int val)
{
	struct spi_tiny_usb *priv = spi_tiny_usb_gc_to_priv(chip);

	usb_read(priv, USB_CMD_GPIO_SET, val, offset, 0, 0);
}

static const struct usb_device_id spi_tiny_usb_table[] = {
	{USB_DEVICE(VID, PID)},
	{}
};

MODULE_DEVICE_TABLE(usb, spi_tiny_usb_table);

static void spi_tiny_usb_urb_complete(struct urb *urb)
{
	struct spi_tiny_usb *priv = (struct spi_tiny_usb *)urb->context;
	int ret;

	if (urb->status == 0) {
		uio_event_notify(priv->uio);
		dev_info(&priv->interface->dev,
			"spi_tiny_usb_urb_complete (%d) %d %d %d %d\n",
			urb->status, priv->urbBuffer[0], priv->urbBuffer[1],
			priv->urbBuffer[2], priv->urbBuffer[3]);
	}


	ret = usb_submit_urb(priv->urb, GFP_KERNEL);
}

static int
usb_read(struct spi_tiny_usb *dev, int cmd, int value, int index, void *data, int len)
{
	/* do control transfer */
	return usb_control_msg(dev->usb_dev, usb_rcvctrlpipe(dev->usb_dev, 0),
			       cmd,
			       USB_TYPE_VENDOR | USB_RECIP_INTERFACE |
			       USB_DIR_IN, value, index, data, len, 2000);
}

static int
usb_write(struct spi_tiny_usb *dev, int cmd, int value, int index, void *data, int len)
{
	/* do control transfer */
	return usb_control_msg(dev->usb_dev, usb_sndctrlpipe(dev->usb_dev, 0),
			       cmd, USB_TYPE_VENDOR | USB_RECIP_INTERFACE,
			       value, index, data, len, 2000);
}

static int spi_tiny_usb_probe(struct usb_interface *interface,
			      const struct usb_device_id *id)
{
	struct spi_tiny_usb *priv;
	int ret = -ENOMEM;
	u16 version;
	int inf;

	dev_dbg(&interface->dev, "probing usb device\n");

	/* allocate memory for our device state and initialize it */
	priv = kzalloc(sizeof(*priv), GFP_KERNEL);
	if (priv == NULL)
		return -ENOMEM;

	priv->usb_dev = usb_get_dev(interface_to_usbdev(interface));
	priv->interface = interface;

	inf = priv->interface->cur_altsetting->desc.bInterfaceNumber;
	if (inf > 5) {
		dev_info(&interface->dev, "Ignoring Interface\n");
		return -ENODEV;
		}
	if (inf < 5) {
		dev_info(&interface->dev, "Ignoring Interface\n");
		return -ENODEV;
		}


	/* save our data pointer in this interface device */
	usb_set_intfdata(interface, priv);

	version = le16_to_cpu(priv->usb_dev->descriptor.bcdDevice);
	dev_info(&interface->dev,
		 "version %x.%02x found at bus %03d address %03d\n",
		 version >> 8, version & 0xff, priv->usb_dev->bus->busnum,
		 priv->usb_dev->devnum);

	dev_info(&interface->dev, "connected spi-tiny-usb device\n");


	// UIO
/*	priv->uio = kzalloc(sizeof(struct uio_info), GFP_KERNEL);
	if (!priv->uio)
		goto error2;
	priv->uio->priv = priv;
	priv->uio->name = "spi-tiny-usb";
	priv->uio->version = "1.0.16ton";

	priv->uio->mem[0].size = 0;
	priv->uio->port[0].size = 0;

	priv->uio->irq = UIO_IRQ_CUSTOM; //UIO_IRQ_CUSTOM;
	priv->uio->irq_flags = IRQF_SHARED;
	priv->uio->irqcontrol = spi_tiny_usb_irqcontrol;

	if (uio_register_device(&interface->dev, priv->uio))
		goto error2;
	dev_info(&interface->dev, "registered new UIO device\n");

	// USB interrupt
	priv->urb = usb_alloc_urb(0, GFP_KERNEL);
	if (!priv->urb) {
	    dev_info(&interface->dev, "spi-tiny-usb no usb irq!\n");
		goto error2;
        };
    //16ton


	priv->urbBuffer = kmalloc(64, GFP_KERNEL);

	usb_fill_int_urb(priv->urb, priv->usb_dev,
			 usb_rcvintpipe(priv->usb_dev, 1), priv->urbBuffer, 64,
			 spi_tiny_usb_urb_complete, priv, 10);


	ret = usb_submit_urb(priv->urb, GFP_KERNEL);
	if (ret) {
	    dev_info(&interface->dev, "spi-tiny-usb priv IRQ urb gfp_kernel failedr\n");
		goto error2;
	}

	dev_info(&interface->dev, "started USB interrupts handler\n");
*/
	// GPIOs
	memset(&priv->gpio_chip, 0x00, sizeof(priv->gpio_chip));
	priv->gpio_chip.owner = THIS_MODULE;
	priv->gpio_chip.parent = &interface->dev;
	priv->gpio_chip.label = dev_name(priv->gpio_chip.parent);
	priv->gpio_chip.direction_input = spi_tiny_usb_gpio_input;
	priv->gpio_chip.direction_output = spi_tiny_usb_gpio_output;
	priv->gpio_chip.get = spi_tiny_usb_gpio_get;
	priv->gpio_chip.set = spi_tiny_usb_gpio_set;
	priv->gpio_chip.base = -1;
	priv->gpio_chip.ngpio = 5;
	priv->gpio_chip.names = gpio_names;


	dev_dbg(&interface->dev, "adding GPIO interface\n");
	ret = gpiochip_add(&priv->gpio_chip);
	if (ret) {
		printk(KERN_DEBUG "err %d\n", ret);
		goto error2;
	}
	dev_info(&interface->dev, "added GPIO interface\n");

	return 0;

 error2:
	printk(KERN_DEBUG "spi-tiny-usb error2\n");

 error:
	printk(KERN_DEBUG "spi-tiny-usb error\n");
	if (priv)
		spi_tiny_usb_free(priv);

	return ret;
}

static void spi_tiny_usb_disconnect(struct usb_interface *interface)
{
	struct spi_tiny_usb *priv = usb_get_intfdata(interface);
//	int i, ret;
    int i;

	for (i = priv->gpio_chip.base; i < priv->gpio_chip.base + priv->gpio_chip.ngpio;
	     i++) {
		gpio_free(i);
	}

	dev_dbg(&interface->dev, "gpiochip_remove\n");
//	ret = gpiochip_remove(&priv->gpio_chip);
    gpiochip_remove(&priv->gpio_chip);

	dev_dbg(&interface->dev, "usb_kill_urb\n");
	usb_kill_urb(priv->urb);

	dev_dbg(&interface->dev, "urbBuffer\n");
	if (priv->urbBuffer)
		kfree(priv->urbBuffer);
/*
	dev_dbg(&interface->dev, "uio\n");
	if (priv->uio) {
		uio_unregister_device(priv->uio);
		kfree(priv->uio);
	}
*/
	dev_dbg(&interface->dev, "usb_free_urb\n");
	if (priv->urb)
		usb_free_urb(priv->urb);

	dev_dbg(&interface->dev, "spi_tiny_usb_free\n");
	usb_set_intfdata(interface, NULL);
	spi_tiny_usb_free(priv);

	dev_dbg(&interface->dev, "disconnected\n");
}

static struct usb_driver spi_tiny_usb_driver = {
	.name = "spi-tiny-usb",
	.probe = spi_tiny_usb_probe,
	.disconnect = spi_tiny_usb_disconnect,
	.id_table = spi_tiny_usb_table,
};

module_usb_driver(spi_tiny_usb_driver);

/* ----- end of usb layer ------------------------------------------------ */

MODULE_AUTHOR("Krystian Duzynski <krystian.duzynski@gmail.com>");
MODULE_DESCRIPTION("spi-tiny-usb driver v1.0");
MODULE_LICENSE("GPL");
