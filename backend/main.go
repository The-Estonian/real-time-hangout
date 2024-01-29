package main

import (
	"fmt"
	"net/http"
	"rtforum/database"
	"rtforum/urlHandlers"

	_ "github.com/mattn/go-sqlite3"
)

func main() {
	database.Create()
	mux := http.NewServeMux()
	server := &http.Server{
		Addr:    ":8080",
		Handler: mux,
	}

	mux.HandleFunc("/socket", urlHandlers.IndexSocket)
	mux.HandleFunc("/login", urlHandlers.HandleLogin)
	mux.HandleFunc("/register", urlHandlers.HandleRegister)
	mux.HandleFunc("/checkstate", urlHandlers.HandleState)
	mux.HandleFunc("/newpost", urlHandlers.HandleNewPost)

	fmt.Println("To Kill Server press Ctrl+C")
	err := server.ListenAndServe()
	if err != nil {
		panic(err)
	}
}
