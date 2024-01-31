package database

import (
	"rtforum/helpers"
)

func SetUser(username, age, gender, firstName, lastName, email, password string) {
	db := DbConnection()
	command := "INSERT INTO users(username, age, gender, firstName, lastName, email, password) VALUES(?, ?, ?, ?, ?, ?, ?)"
	_, err := db.Exec(command, username, age, gender, firstName, lastName, email, password)
	helpers.CheckErr("SetUser", err)
	defer db.Close()
}

func SetUserSession(user, hash string) {
	db := DbConnection()
	command := "INSERT OR REPLACE INTO session(user, hash) VALUES(?, ?)"
	_, err := db.Exec(command, user, hash)
	helpers.CheckErr("SetUserSession", err)
	defer db.Close()
}

func SetRemoveHash(hash string) {
	db := DbConnection()
	_, err := db.Exec("DELETE FROM session WHERE hash=?", hash)
	helpers.CheckErr("SetRemoveSession", err)
	defer db.Close()
}

func SetNewPost(user, title, post string) {
	db := DbConnection()
	_, err := db.Exec("INSERT INTO posts (user, title, post) VALUES (?, ?, ?)", user, title, post)
	helpers.CheckErr("SetNewPost", err)
	defer db.Close()
}
