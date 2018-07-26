package main

import "fmt"
import "sync"

var wg sync.WaitGroup

func foo(c chan int, someValue int) {
	defer wg.Done()
	c <- someValue * 5
}

func main() {
	fooVal := make(chan int, 10)
	for i := 0; i < 10; i++ {
		go foo(fooVal, i)
		wg.Add(1)
	}

	wg.Wait() // Wait for all routines to complete
	close(fooVal) // close channel

	for item := range fooVal {
		fmt.Println(item)
	}
}

// func main() {
// 	fooVal := make(chan int)

// 	go foo(fooVal, 5)
// 	go foo(fooVal, 3)

// 	// v1 := <- fooVal
// 	// v2 := <- fooVal

// 	v1, v2 := <- fooVal, <- fooVal

// 	fmt.Println(v1, v2)
// }