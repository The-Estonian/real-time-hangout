package database

import (
	"database/sql"
	"fmt"
	"os"
	"rtforum/helpers"
)

func fileExists(filename string) bool {
	info, err := os.Stat(filename)
	if os.IsNotExist(err) {
		return false
	}
	return !info.IsDir()
}
func Create() {
	if !fileExists("./database/rtforum.db") {
		fmt.Println("Did not find the Database! Starting regeneration!")

		CreateDB()
		fmt.Println("Database Created!")

		CreateUsers()
		fmt.Println("User Table Created!")

		CreateSessions()
		fmt.Println("Session Table Created!")

		CreatePosts()
		fmt.Println("Post Table Created!")
	}
}

func DbConnection() *sql.DB {
	db, err := sql.Open("sqlite3", "./database/rtforum.db")
	helpers.CheckErr("DbConnection", err)
	return db
}
