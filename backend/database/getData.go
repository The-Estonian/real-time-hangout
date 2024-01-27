package database

import (
	"database/sql"
	"rtforum/helpers"
)

func GetPassword(username string) (string, error) {
	db := DbConnection()
	var returnPassword string
	err := db.QueryRow("SELECT password FROM users WHERE username=?", username).Scan(&returnPassword)
	helpers.CheckErr("GetPassword", err)
	defer db.Close()
	return returnPassword, err
}

func GetUsernameCheck(username string) bool {
	db := DbConnection()
	var returnUsername string
	err := db.QueryRow("SELECT username FROM users WHERE username=?", username).Scan(&returnUsername)
	if err != nil {
		if err != sql.ErrNoRows {
			helpers.CheckErr("GetUsername", err)
		}
		return false
	}
	defer db.Close()
	return true
}

func GetEmailCheck(email string) bool {
	db := DbConnection()
	var returnEmail string
	err := db.QueryRow("SELECT username FROM users WHERE username=?", email).Scan(&returnEmail)
	if err != nil {
		if err != sql.ErrNoRows {
			helpers.CheckErr("GetUsername", err)
		}
		return false
	}
	defer db.Close()
	return true
}
