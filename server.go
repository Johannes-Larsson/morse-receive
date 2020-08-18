package main

import (
	"fmt"
	"net/http"
)

func main() {
	fileServer := http.FileServer(http.Dir("static/"))
	http.Handle("/", http.StripPrefix("/", fileServer))

	err := http.ListenAndServe(":1753", nil)
	if err != nil {
		fmt.Print(err)
	}
}


