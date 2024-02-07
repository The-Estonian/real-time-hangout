package database

import (
	"database/sql"
	"rtforum/helpers"
	"rtforum/structs"
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
	err := db.QueryRow("SELECT email FROM users WHERE email=?", email).Scan(&returnEmail)
	if err != nil {
		if err != sql.ErrNoRows {
			helpers.CheckErr("GetEmailCheck", err)
		}
		return false
	}
	defer db.Close()
	return true
}

func GetUserSession(hash string) (bool, string, string) {
	db := DbConnection()
	var user string
	var date string
	err := db.QueryRow("SELECT user, date FROM session WHERE hash=?", hash).Scan(&user, &date)
	if err != nil {
		if err != sql.ErrNoRows {
			helpers.CheckErr("GetUserSession", err)
		}
		return false, user, date
	}
	defer db.Close()

	return true, user, date
}

func GetUserIdByUsername(username string) string {
	db := DbConnection()
	var userId string
	err := db.QueryRow("SELECT id FROM users WHERE username=?", username).Scan(&userId)
	defer db.Close()
	if err != nil {
		if err != sql.ErrNoRows {
			helpers.CheckErr("GetUserIdByUsername", err)
		}
		return "Username not found"
	}
	return userId
}

func GetAllPosts() []structs.Post {
	db := DbConnection()
	var AllPosts []structs.Post
	command := "SELECT * FROM posts ORDER BY id DESC"
	rows, err := db.Query(command)
	helpers.CheckErr("GetAllPosts", err)
	for rows.Next() {
		var singlePost structs.Post
		rows.Scan(&singlePost.Id,
			&singlePost.User,
			&singlePost.Title,
			&singlePost.Post,
			&singlePost.Created)
		singlePost.Categories = GetAllCategoriesForPost(singlePost.Id)
		AllPosts = append(AllPosts, singlePost)
	}
	rows.Close()
	defer db.Close()
	return AllPosts
}

func GetAllCategoriesForPost(postId string) []structs.Category {
	db := DbConnection()
	var AllCategories []structs.Category
	command := "SELECT * FROM post_category_list WHERE post_id_from_posts=?"
	rows, err := db.Query(command, postId)
	helpers.CheckErr("GetAllCategoriesForPost", err)
	for rows.Next() {
		var singleCat structs.Category
		rows.Scan(&singleCat.Id, &singleCat.Category, &singleCat.CategoryPost)
		AllCategories = append(AllCategories, singleCat)
	}
	rows.Close()

	return AllCategories
}
