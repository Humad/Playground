package main

import (
	"fmt"
	"time"
	"net/http"
)

func main() {
	start := time.Now()
	res, err := http.Get("http://www.google.com/")
	if err != nil {
		fmt.Println(err)
	} else {
		fmt.Println(res.Body)
	}
	fmt.Println("That took %d", time.Since(start))
}