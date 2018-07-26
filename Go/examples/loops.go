package main

import "fmt"

func main() {
	// Regular for loop
	for i := 0; i < 10; i++ {
		fmt.Println(i)
	}

	// While loop
	i := 9
	for i >= 0 {
		fmt.Println(i)
		i--;
	}

	// Break
	x := 5
	for {
		fmt.Println("Doing something with", x)
		x += 3
		if x > 17 {
			break
		}
	}
}