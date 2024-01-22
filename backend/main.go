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

	// staticFiles := http.FileServer(http.Dir("./static"))
	// mux.Handle("/static/", http.StripPrefix("/static/", staticFiles))
	mux.HandleFunc("/socket", urlHandlers.IndexSocket)

	fmt.Println("Server hosted at: https://localhost:" + "8080")
	fmt.Println("To Kill Server press Ctrl+C")
	err := server.ListenAndServe()
	if err != nil {
		panic(err)
	}
}
