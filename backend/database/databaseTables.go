package database

import (
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
	db := DbConnection()
	command := "CREATE TABLE `users` (" +
		"`id` INTEGER PRIMARY KEY AUTOINCREMENT, " +
		"`username` VARCHAR(255) NOT NULL, " +
		"`age` VARCHAR(255) NOT NULL, " +
		"`gender` VARCHAR(255) NOT NULL, " +
		"`firstName` VARCHAR(255) NOT NULL, " +
		"`lastName` VARCHAR(255) NOT NULL, " +
		"`email` VARCHAR(255) NOT NULL, " +
		"`password` VARCHAR(255) NOT NULL)"
	_, err := db.Exec(command)
	helpers.CheckErr("CreateUsers", err)
	defer db.Close()
}

func CreateSessions() {
	db := DbConnection()
	command := "CREATE TABLE `session` (" +
		"`id` INTEGER PRIMARY KEY AUTOINCREMENT, " +
		"`user` INTEGER UNIQUE REFERENCES users(id), " +
		"`hash` VARCHAR(255) NOT NULL, " +
		"`date` NOT NULL DEFAULT CURRENT_TIMESTAMP)"
	_, err := db.Exec(command)
	helpers.CheckErr("CreateSessions", err)
	defer db.Close()
}

func CreatePosts() {
	db := DbConnection()
	command := "CREATE TABLE `posts` (" +
		"`id` INTEGER PRIMARY KEY AUTOINCREMENT, " +
		"`user` INTEGER NOT NULL REFERENCES users(id), " +
		"`title` VARCHAR(255) NOT NULL, `post` VARCHAR(255), " +
		"`created` NOT NULL DEFAULT CURRENT_TIMESTAMP)"
	_, err := db.Exec(command)
	helpers.CheckErr("CreatePosts", err)
	defer db.Close()
}
