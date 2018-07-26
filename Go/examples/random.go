package main

import (
	"fmt"
	"math/rand"
)

func main() {
	fmt.Println("A number between 0 - 99 is", rand.Intn(100))
}