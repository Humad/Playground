package main

import "fmt"

func main() {
	x := 15
	memoryAddressOfX := &x // memory address
	actualValueOfX := *memoryAddressOfX
	fmt.Println(memoryAddressOfX) // prints out address
	fmt.Println(actualValueOfX) // prints out 15

	*memoryAddressOfX = 5
	fmt.Println(x) // prints out 5

	*memoryAddressOfX = *memoryAddressOfX * *memoryAddressOfX
	fmt.Println(x) // prints 25

}