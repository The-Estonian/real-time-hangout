package database

import (
	"fmt"
	"os"
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
	}
}
