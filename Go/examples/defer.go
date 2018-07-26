package main

import "fmt"

func foo() {
	defer fmt.Println("I'm done!")
	defer fmt.Println("Am I done?")
	fmt.Println("I'm doing stuff!")
}

func main() {
	foo()
}