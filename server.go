package main

import (
	"os/exec"
	"fmt"
	"net/http"
)

func main() {
	fileServer := http.FileServer(http.Dir("static/"))
	http.Handle("/", http.StripPrefix("/", fileServer))

	http.HandleFunc("/api/version", func (w http.ResponseWriter, r *http.Request) {
		cmd := exec.Command("git", "describe", "--tags", "--dirty")
		out, err := cmd.Output()
		if err == nil {
			w.WriteHeader(200)
			w.Write(out)
		} else {
			w.WriteHeader(500)
		}
	})

	err := http.ListenAndServe(":1753", nil)
	if err != nil {
		fmt.Print(err)
	}
}


