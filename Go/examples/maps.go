package main

import "fmt"

func main() {
	grades := make(map[string]int)
	grades["Timmy"] = 42
	grades["Jessie"] = 98
	grades["Kyle"] = 75
	

	fmt.Println(grades);
	delete(grades, "Timmy")
	fmt.Println(grades);
	fmt.Println(grades["Jessie"]);
	fmt.Println(grades["Timmy"]);

	for k, v := range grades {
		fmt.Printf("%s : %d\n", k, v)
	}
}