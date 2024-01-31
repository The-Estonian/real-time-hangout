package database

import (
	"fmt"
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

func SetNewPost(user, title, post string) string {
	db := DbConnection()
	var postId string
	err := db.QueryRow("INSERT INTO posts (user, title, post) VALUES (?, ?, ?) returning id", user, title, post).Scan(&postId)
	helpers.CheckErr("SetNewPost", err)
	defer db.Close()
	return postId
}

func SetCategories(postId string, categories []string) {
	for x := 0; x < len(categories); x++ {
		fmt.Println("PostId: ", postId, "CategoryId: ", categories[x])
	}
	// enter the categories to the list
}
