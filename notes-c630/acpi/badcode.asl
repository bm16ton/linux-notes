/* SPDX-License-Identifier: BSD-3-Clause OR GPL-2.0 */
/*
 * badcode.asl
 *
 * This file contains examples of the extended error checking and
 * typechecking capabilities of the iASL compiler. Other ASL compilers
 * may ignore these errors completely. note - this is not an exhaustive
 * list of errors detected by iASL, it shows many of the errors that
 * are not detected by other ASL compilers.
 *
 * To compile, use:
 * iasl badcode.asl
 *
 * Output:
 * Compilation complete. 45 Errors, 28 Warnings, 11 Remarks, 14 Optimizations
 *
 */
definition_block ("badcode.aml", "DSDT", 1, "Intel", "Example", 0x00000001)
{
	name (INT1, 0)
	name (BUF1, buffer() {0,1,2,3})
	event (EVT1)

	// invalid sync_level in mutex declaration

	mutex (MTX1, 32)

	// integer beyond the table integer size (32 bits)

	name (BIG, 0x1234567887654321)

	// Cpackage length does not match initializer list length

	name (PKG1, package(5) {0,1})

	// inadvertent use of single backslash in a string

	name (PATH, buffer() {"\_SB_.PCI2._CRS"})

	// invalid hex escape sequence

	name (ESC1, "abcdefg\x00hijklmn")

	// field access beyond region bounds

	operation_region (OPR1, system_memory, 0x2000, 6)
	field (OPR1, dword_acc, no_lock, preserve)
	{
		offset (4),
		FLD1, 8
	}

	// some address spaces support only byte_acc or buffer_acc

	operation_region (OPR2, embedded_control, 0x4000, 8)
	field (OPR2, dword_acc, no_lock, preserve)
	{
		FLD2, 8
	}
	operation_region (OPR3, SMbus, 0x8000, 16)
	field (OPR3, word_acc, no_lock, preserve)
	{
		FLD3, 8
	}

	// invalid sync_level in method declaration

	method (MTH1, 0, not_serialized, 32)
	{
		// invalid arguments and uninitialized locals

		store (arg3, local0)
		store (local1, local2)

		// parameter typechecking (MTX1 is invalid type)

		subtract (MTX1, 4, local3)

		// various invalid parameters

		create_field (BUF1, 0, subtract (4, 4), FLD1)

		// unchecked mutex and event timeouts

		acquire (MTX1, 100)
		wait (EVT1, 1)

		// result from operation is not used - statement has no effect

		add (INT1, 8)

		// unreachable code

		return (0)
		store (5, INT1)
	}

	method (MTH2)
	{
		// switch with no case statements

		switch (to_integer (INT1))
		{
			default
		}

		if (Lequal (INT1, 0))
		{
			return (INT1)
		}

		// fallthrough exit path does not return a value
	}

	method (MTH3)
	{
		// method MTH2 above does not always return a value

		store (MTH2 (), local0)
	}

	// method MTH4 does not explicitly return a value

	method (MTH5) {store (MTH4(), local0)}

	// invalid _HID values

	device (H1)
	{
		name (_HID, "*PNP0C0A")     // illegal leading asterisk
	}
	device (H2)
	{
		name (_HID, "PNP")          // too short, must be 7 or 8 chars
	}
	device (H3)
	{
		name (_HID, "MYDEVICE01")   // too long, must be 7 or 8 chars
	}
	device (H4)
	{
		name (_HID, "acpi0001")     // non-hex chars must be uppercase
	}
	device (H5)
	{
		name (_HID, "PNP-123")      // HID must be alphanumeric
	}
	device (H6)
	{
		name (_HID, "")             // illegal null HID
		name (_CID, "")             // illegal null CID
	}

	// predefined name typechecking

	name (_PRW, 4)
	name (_FDI, buffer () {0})

	// predefined name argument count validation
	// and return value validation

	method (_OSC, 5)

	// predefined names that must be implemented as control methods

	name (_L01, 1)
	name (_E02, 2)
	name (_Q03, 3)
	name (_ON,  0)
	name (_INI, 1)
	name (_PTP, 2)

	// GPE methods that cause type collision (L vs. E)

	scope (\_GPE)
	{
		method (_L1D)
		method (_E1D)
	}

	// predefined names that should not have a return value

	method (_FDM, 1)
	{
		return (buffer(1){0x33})
	}
	method (_Q22)
	{
		return ("Unexpected Return Value")
	}

	// _REG must have a corresponding operation region declaration
	// within the same scope

	device (EC)
	{
		method (_REG, 2)
	}

	/*
	 * Resource Descriptor error checking
	 */
	name (RSC1, resource_template ()
	{
		// illegal nested start_dependent macros

		start_dependent_fn (0, 0)
		{
			start_dependent_fn (0, 0)
		}

		// missing end_dependent_fn macro
	})

	name (RSC2, resource_template ()
	{
		// address_min is larger than address_max
		IO (decode16,
			0x07D0,             // range minimum
			0x03E8,             // range maximum
			0x01,               // alignment
			0x20,               // length
			)

		// length larger than min/max window size
		memory32 (read_only,
			0x00001000,         // range minimum
			0x00002000,         // range maximum
			0x00000004,         // alignment
			0x00002000,         // length
			)

		// min and max not multiples of alignment value
		memory32 (read_only,
			0x00001001,         // range minimum
			0x00002002,         // range maximum
			0x00000004,         // alignment
			0x00000200,         // length
			)

		// 10-bit ISA I/O address has a max of 0x3FF
		fixed_IO (
			0xFFFF,             // address
			0x20,               // length
			)

		// invalid access_size parameter
		register (system_IO,
			0x08,               // bit width
			0x00,               // bit offset
			0x0000000000000100, // address
			0x05                // access size
			)

		// invalid resource_type (0xB0)
		qword_space (0xB0, resource_consumer, pos_decode, min_fixed, max_fixed, 0xA5,
			0x0000,             // granularity
			0xA000,             // range minimum
			0xBFFF,             // range maximum
			0x0000,             // translation offset
			0x2000,             // length
			,, )

		// address_min is larger than address_max
		word_IO (resource_producer, min_fixed, max_fixed, pos_decode, entire_range,
			0x0000,             // granularity
			0x0200,             // range minimum
			0x0100,             // range maximum
			0x0000,             // translation offset
			0x0100,             // length
			,, , type_static)

		// length larger than min/max window size
		dword_space (0xC3, resource_consumer, pos_decode, min_fixed, max_fixed, 0xA5,
			0x00000000,         // granularity
			0x000C8000,         // range minimum
			0x000C9000,         // range maximum
			0x00000000,         // translation offset
			0x00001002,         // length
			,, )

		// granularity must be (power-of-two -1)
		dword_memory (resource_producer, pos_decode, min_fixed, max_not_fixed, non_cacheable, read_write,
			0x00000010,
			0x40000000,
			0xFED9FFFF,
			0x00000000,
			0xBECA0000)

		// address min (with zero length) not on granularity boundary
		qword_IO (resource_producer, min_fixed, max_not_fixed, pos_decode, entire_range,
			0x0000000000000003, // granularity
			0x0000000000000B02, // range minimum
			0x0000000000000C00, // range maximum
			0x0000000000000000, // translation offset
			0x0000000000000000, // length
			,, , type_static)

		// address max (with zero length) not on (granularity boundary -1)
		qword_memory (resource_producer, pos_decode, min_not_fixed, max_fixed, cacheable, read_write,
			0x0000000000000001, // granularity
			0x0000000000100000, // range minimum
			0x00000000002FFFFE, // range maximum
			0x0000000000000000, // translation offset
			0x0000000000000000, // length
			,, , address_range_memory, type_static)

		// invalid combination: zero length, both min and max are fixed
		dword_IO (resource_producer, min_fixed, max_fixed, pos_decode, entire_range,
			0x00000000,         // granularity
			0x000C8000,         // range minimum
			0x000C8FFF,         // range maximum
			0x00000000,         // translation offset
			0x00000000,         // length
			,, )

		// invalid combination: non-zero length, min fixed, max not fixed
		dword_IO (resource_producer, min_fixed, max_not_fixed, pos_decode, entire_range,
			0x00000001,         // granularity
			0x000C8000,         // range minimum
			0x000C8FFF,         // range maximum
			0x00000000,         // translation offset
			0x00000100,         // length
			,, )

		// invalid combination: non-zero length, min not fixed, max fixed
		dword_IO (resource_producer, min_not_fixed, max_fixed, pos_decode, entire_range,
			0x00000001,         // granularity
			0x000C8000,         // range minimum
			0x000C8FFF,         // range maximum
			0x00000000,         // translation offset
			0x00000200,         // length
			,, )

		// granularity must be zero if non-zero length, min/max fixed
		dword_IO (resource_producer, min_fixed, max_fixed, pos_decode, entire_range,
			0x0000000F,         // granularity
			0x000C8000,         // range minimum
			0x000C8FFF,         // range maximum
			0x00000000,         // translation offset
			0x00001000,         // length
			,, )

		// null descriptor (intended to be modified at runtime) must
		// have a resource tag (to allow it to be modified at runtime)
		dword_IO (resource_producer, min_fixed, max_fixed, pos_decode, entire_range,
			0x00000000,         // granularity
			0x00000000,         // range minimum
			0x00000000,         // range maximum
			0x00000000,         // translation offset
			0x00000000,         // length
			,, )

		// missing start_dependent_fn macro

		end_dependent_fn ()
	})

	// test descriptor for create_xxxx_field operators in REM1 below

	name (RSC3, resource_template ()
	{
		dword_IO (resource_producer, min_fixed, max_fixed, pos_decode, entire_range,
			0x00000000,         // granularity
			0x000C8000,         // range minimum
			0x000C8FFF,         // range maximum
			0x00000000,         // translation offset
			0x00001000,         // length
			,, DWI1)
	})

	method (REM1)
	{
		// tagged resource field larger than field being created

		create_word_field (RSC3, \DWI1._LEN, LEN)
		create_byte_field (RSC3, \DWI1._MIN, MIN)
		create_bit_field (RSC3, \DWI1._RNG, RNG1)

		// tagged resource field smaller than field being created

		create_qword_field (RSC3, \DWI1._MAX, MAX)
		create_bit_field (RSC3, \DWI1._GRA, GRA)
		create_field (RSC3, \DWI1._MIF, 5, MIF)
		create_field (RSC3, \DWI1._RNG, 3, RNG2)
	}

	method (L100)
	{
		/* Method Local is set but never used */

		store (40, local0)
	}
}
