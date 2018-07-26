package main

import "fmt"
import "time"
import "sync"

var wg sync.WaitGroup

func cleanup() {
	r := recover()
	if r != nil {
		fmt.Println("Recovered in cleanup: ", r)
	}
}

func say (s string) {
	defer wg.Done()
	defer cleanup()
	for i := 0; i < 3; i++ {
		fmt.Println(s)
		time.Sleep(time.Millisecond * 100)
		if i == 2 {
			panic("Oh dear, a 2!")
		}
	}
}

func main() {
	wg.Add(1)
	go say("hey")
	wg.Add(1)
	go say("there")
	wg.Wait()

	wg.Add(1)
	go say("Hi")
	wg.Wait()
}