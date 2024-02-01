package database

import (
	"rtforum/helpers"
)

// Sets new user into users table
func SetUser(username, age, gender, firstName, lastName, email, password string) {
	db := DbConnection()
	command := "INSERT INTO users(username, age, gender, firstName, lastName, email, password) VALUES(?, ?, ?, ?, ?, ?, ?)"
	_, err := db.Exec(command, username, age, gender, firstName, lastName, email, password)
	helpers.CheckErr("SetUser", err)
	defer db.Close()
}

// Sets new user session hash into session table
func SetUserSession(user, hash string) {
	db := DbConnection()
	command := "INSERT OR REPLACE INTO session(user, hash) VALUES(?, ?)"
	_, err := db.Exec(command, user, hash)
	helpers.CheckErr("SetUserSession", err)
	defer db.Close()
}

// Removes session hash from session table
func SetRemoveHash(hash string) {
	db := DbConnection()
	command := "DELETE FROM session WHERE hash=?"
	_, err := db.Exec(command, hash)
	helpers.CheckErr("SetRemoveSession", err)
	defer db.Close()
}

// Sets new post into Post Table
func SetNewPost(user, title, post string) string {
	db := DbConnection()
	var postId string
	command := "INSERT INTO " +
		"posts (user, title, post) " +
		"VALUES (?, ?, ?) returning id"
	err := db.QueryRow(command, user, title, post).Scan(&postId)
	helpers.CheckErr("SetNewPost", err)
	defer db.Close()
	return postId
}

// Sets new category into category table
func SetNewCategory(category string) {
	db := DbConnection()
	command := "INSERT INTO " +
		"category(category) VALUES(?)"
	_, err := db.Exec(command, category)
	helpers.CheckErr("SetNewCategory", err)
	defer db.Close()
}

// Sets posts category into post_category table
func SetCategoryToPost(postId string, category string) {
	db := DbConnection()
	command := "INSERT INTO " +
		"post_category_list(" +
		"post_category_from_category, " +
		"post_id_from_posts) " +
		"VALUES(?, ?)"
	_, err := db.Exec(command, category, postId)
	helpers.CheckErr("SetCategoryToPost", err)
	defer db.Close()
}
