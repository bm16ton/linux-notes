#include <linux/module.h>
#define INCLUDE_VERMAGIC
#include <linux/build-salt.h>
#include <linux/vermagic.h>
#include <linux/compiler.h>

BUILD_SALT;

MODULE_INFO(vermagic, VERMAGIC_STRING);
MODULE_INFO(name, KBUILD_MODNAME);

__visible struct module __this_module
__section(".gnu.linkonce.this_module") = {
	.name = KBUILD_MODNAME,
	.init = init_module,
#ifdef CONFIG_MODULE_UNLOAD
	.exit = cleanup_module,
#endif
	.arch = MODULE_ARCH_INIT,
};

#ifdef CONFIG_RETPOLINE
MODULE_INFO(retpoline, "Y");
#endif

static const struct modversion_info ____versions[]
__used __section("__versions") = {
	{ 0x635b8619, "module_layout" },
	{ 0xbc6f174a, "usb_deregister" },
	{ 0xac19e229, "usb_register_driver" },
	{ 0x27a8a69a, "usb_free_urb" },
	{ 0xf04eb609, "usb_kill_urb" },
	{ 0x84753292, "gpiochip_remove" },
	{ 0xfe990052, "gpio_free" },
	{ 0xeddc1a29, "usb_control_msg" },
	{ 0x37a0cba, "kfree" },
	{ 0xbc24aea6, "usb_put_dev" },
	{ 0xc5850110, "printk" },
	{ 0x69f6051, "gpiochip_add_data_with_key" },
	{ 0xdcb764ad, "memset" },
	{ 0x7268c1ed, "_dev_info" },
	{ 0xbb161a4d, "usb_get_dev" },
	{ 0xa4e0d13e, "kmem_cache_alloc" },
	{ 0x12d76bb0, "kmalloc_caches" },
};

MODULE_INFO(depends, "");

MODULE_ALIAS("usb:v1D50p6018d*dc*dsc*dp*ic*isc*ip*in*");
