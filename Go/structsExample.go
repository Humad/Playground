package main

import "fmt"

type car struct {
	brand string
	top_speed int
}

func main() {
	myCar := car{brand: "Honda", top_speed: 200}
	fmt.Println(myCar.brand)
	fmt.Println(myCar.top_speed)
}
