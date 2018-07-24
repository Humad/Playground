// Hello world

package hello_world

import "fmt"

// World struct
type World struct{};

func (w *World) String() string {
	return "world!";
}

func main() {

	// Basic Hello world
	// fmt.Printf("Hello, %s\n", "world!");

	// Hello world using struct
	fmt.Printf("Hello, %s\n", new(World));
}

