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

		CreateUserTable()
		fmt.Println("User Table Created!")

		CreateSessionTable()
		fmt.Println("Session Table Created!")

		CreatePostTable()
		fmt.Println("Post Table Created!")

		CreateCategoryTable()
		fmt.Println("Category Table Created!")

		CreatePostCategoryTable()
		fmt.Println("Post Category Table Created!")

		AppendDummyData()
		fmt.Println("DummyData injected!")
	}
}

func DbConnection() *sql.DB {
	db, err := sql.Open("sqlite3", "./database/rtforum.db")
	helpers.CheckErr("DbConnection", err)

	_, err = db.Exec("PRAGMA foreign_keys = ON;")
	helpers.CheckErr("DbConnection", err)

	return db
}
