package database

import (
	"database/sql"
	"rtforum/helpers"
)

func DbConnection() *sql.DB {
	db, err := sql.Open("sqlite3", "./database/rtforum.db")
	helpers.CheckErr("SQL Connection", err)
	return db
}

func SetUser(username, age, gender, firstName, lastName, email, password string) {
	db := DbConnection()
	command := "INSERT INTO users(username, age, gender, firstName, lastName, email, password) VALUES(?, ?, ?, ?, ?, ?, ?)"
	_, err := db.Exec(command, username, age, gender, firstName, lastName, email, password)
	helpers.CheckErr("SetUser", err)
	defer db.Close()
}