package database

import "rtforum/helpers"

func GetPassword(username string) (string, error) {
	db := DbConnection()
	var returnPassword string
	err := db.QueryRow("SELECT password FROM users WHERE username=?", username).Scan(&returnPassword)
	defer db.Close()
	helpers.CheckErr("GetPassword", err)
	return returnPassword, err
}
