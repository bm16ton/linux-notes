// C++ implementation of above program
#include <bits/stdc++.h>
using namespace std;

// Function to calculates the bits
long Bits(int kilobytes)
{
	long Bits = 0;

	// calculates Bits
	// 1 kilobytes(s) = 8192 bits
	Bits = kilobytes * 8192;

	return Bits;
}

// Function to calculates the bytes
long Bytes(int kilobytes)
{
	long Bytes = 0;

	// calculates Bytes
	// 1 KB = 1024 bytes
	Bytes = kilobytes * 1024;

	return Bytes;
}

// Driver code
int main()
{
	int kilobytes = 1;

	cout << kilobytes << " Kilobytes = "
		<< Bytes(kilobytes) << " Bytes and "
		<< Bits(kilobytes) << " Bits.";
	return 0;
}

