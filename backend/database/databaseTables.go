package database

import (
	"database/sql"
	"os"
	"rtforum/helpers"
)

func CreateDB() {
	if err := os.MkdirAll("./database", os.ModeSticky|os.ModePerm); err != nil {
		helpers.CheckErr("CreateDB", err)
	}
	os.Create("./database/rtforum.db")
}

func CreateUsers() {
	db, err := sql.Open("sqlite3", "./database/rtforum.db")
	helpers.CheckErr("CreateUsers", err)
	command := "CREATE TABLE `users` (" +
		"`id` INTEGER PRIMARY KEY AUTOINCREMENT, " +
		"`username` VARCHAR(255) NOT NULL, " +
		"`age` VARCHAR(255) NOT NULL, " +
		"`gender` VARCHAR(255) NOT NULL, " +
		"`firstName` VARCHAR(255) NOT NULL, " +
		"`lastName` VARCHAR(255) NOT NULL, " +
		"`email` VARCHAR(255) NOT NULL, " +
		"`password` VARCHAR(255) NOT NULL)"
	db.Exec(command)
	db.Close()
}

func CreateSessions() {
	database, err := sql.Open("sqlite3", "./database/forum.db")
	helpers.CheckErr("CreateSessions", err)
	command := "CREATE TABLE `session` (" +
		"`id` INTEGER PRIMARY KEY AUTOINCREMENT, " +
		"`user` INTEGER UNIQUE REFERENCES users(id), " +
		"`hash` VARCHAR(255) NOT NULL, " +
		"`date` NOT NULL DEFAULT CURRENT_TIMESTAMP)"
	database.Exec(command)
	database.Close()
}
