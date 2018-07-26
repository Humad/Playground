package main

import "fmt"

const x int  = 5 // defining constants

func add(x, y float64) float64 {
	return x + y
}

func multiple(a string, b string) (string, string) {
	return a, b;
}



func main() {
	// var num1, num2 float64 = 5.6, 9.5
	num1, num2 := 5.6, 9.5

	w1, w2 := "Hey", "there"

	fmt.Println(add(num1, num2));
	fmt.Println(multiple(w1, w2));

	// Can also do:
	/*
	var a int = 62;
	var b float64 = float64(a)

	x := a // x will be type int
	*/
}