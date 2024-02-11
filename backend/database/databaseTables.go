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

func CreateUserTable() {
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
	helpers.CheckErr("CreateUserTable", err)
	defer db.Close()
}

func CreateSessionTable() {
	db := DbConnection()
	command := "CREATE TABLE `session` (" +
		"`id` INTEGER PRIMARY KEY AUTOINCREMENT, " +
		"`user` INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE, " +
		"`hash` VARCHAR(255) NOT NULL, " +
		"`date` NOT NULL DEFAULT CURRENT_TIMESTAMP)"
	_, err := db.Exec(command)
	helpers.CheckErr("CreateSessionTable", err)
	defer db.Close()
}

func CreatePostTable() {
	db := DbConnection()
	command := "CREATE TABLE `posts` (" +
		"`id` INTEGER PRIMARY KEY AUTOINCREMENT, " +
		"`user` INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE, " +
		"`title` VARCHAR(255) NOT NULL, `post` VARCHAR(255), " +
		"`created` NOT NULL DEFAULT CURRENT_TIMESTAMP)"
	_, err := db.Exec(command)
	helpers.CheckErr("CreatePostTable", err)
	defer db.Close()
}

func CreateCategoryTable() {
	db := DbConnection()
	command := "CREATE TABLE `category` (" +
		"`id` INTEGER PRIMARY KEY AUTOINCREMENT, " +
		"`category` VARCHAR(255) NOT NULL)"
	_, err := db.Exec(command)
	helpers.CheckErr("CreateCategoryTable", err)
	defer db.Close()
}

func CreatePostCategoryTable() {
	db := DbConnection()
	command := "CREATE TABLE `post_category_list` (" +
		"`id` INTEGER PRIMARY KEY AUTOINCREMENT, " +
		"`post_category_from_category` INTEGER NOT NULL REFERENCES category(id), " +
		"`post_id_from_posts` INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE)"
	_, err := db.Exec(command)
	helpers.CheckErr("CreatePostCategoryTable", err)
	defer db.Close()
}

func CreateCommentTable() {
	db := DbConnection()
	command := "CREATE TABLE `comment` (" +
		"`id` INTEGER PRIMARY KEY AUTOINCREMENT, " +
		"`post_from_posts` INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE, " +
		"`user_from_users` INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE, " +
		"`comment` VARCHAR(255) NOT NULL, " +
		"`created` NOT NULL DEFAULT CURRENT_TIMESTAMP)"
	_, err := db.Exec(command)
	helpers.CheckErr("CreateCommentTable", err)
	defer db.Close()
}