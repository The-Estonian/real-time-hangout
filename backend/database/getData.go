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

func GetAllPosts(catFilter []string) []structs.Post {
	db := DbConnection()
	var AllPosts []structs.Post
	command := "SELECT posts.id, users.username, posts.title, posts.post, posts.created FROM posts INNER JOIN users ON posts.user = users.id ORDER BY posts.id DESC"
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
		if len(catFilter) > 0 {
			for i := 0; i < len(singlePost.Categories); i++ {
				for j := 0; j < len(catFilter); j++ {
					if singlePost.Categories[i].Category == catFilter[j] {
						AllPosts = append(AllPosts, singlePost)
						i = len(singlePost.Categories)
						break
					}
				}
			}
		} else {
			AllPosts = append(AllPosts, singlePost)
		}
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
	defer db.Close()
	for rows.Next() {
		var singleCat structs.Category
		rows.Scan(&singleCat.Id, &singleCat.Category, &singleCat.CategoryPost)
		AllCategories = append(AllCategories, singleCat)
	}
	rows.Close()

	return AllCategories
}

func GetComments(postId string) []structs.Comment {
	db := DbConnection()
	var AllComments []structs.Comment
	command := "SELECT comment.id, comment.post_from_posts, users.username, comment.comment, comment.created FROM comment INNER JOIN users ON user_from_users = users.id WHERE comment.post_from_posts =?"
	rows, err := db.Query(command, postId)
	helpers.CheckErr("GetComments", err)
	for rows.Next() {
		var comment structs.Comment
		rows.Scan(&comment.Id, &comment.ForPost, &comment.ByUser, &comment.Comment, comment.Created)
		AllComments = append(AllComments, comment)
	}
	defer db.Close()

	return AllComments
}

func GetUsers(CurrUser string) []structs.User {
	db := DbConnection()
	var AllUsers []structs.User
	command := "SELECT id, username, age, gender, firstName, lastName, email FROM users"
	rows, err := db.Query(command)
	defer db.Close()
	helpers.CheckErr("GetUsers", err)
	for rows.Next() {
		var user structs.User
		user.CurrentUser = false
		rows.Scan(&user.Id, &user.Username, &user.Age, &user.Gender, &user.FirstName, &user.LastName, &user.Email)
		if user.Id == CurrUser {
			user.CurrentUser = true
		}
		AllUsers = append(AllUsers, user)
	}
	defer rows.Close()
	return AllUsers
}

func GetMessage(fromuser, count, touser string) []structs.Message {
	db := DbConnection()
	var UserMessages []structs.Message
	command := "SELECT * FROM messages WHERE (userposter_from_users = ? OR userposter_from_users = ?) AND (userreceiver_from_users = ? OR userreceiver_from_users = ?) ORDER BY id DESC LIMIT ?"
	rows, err := db.Query(command, fromuser, touser, fromuser, touser, count)
	defer db.Close()
	helpers.CheckErr("GetMessage", err)
	for rows.Next() {
		var message structs.Message
		rows.Scan(&message.Id, &message.FromUser, &message.Message, &message.ToUser, &message.Date)
		UserMessages = append(UserMessages, message)
	}
	defer rows.Close()
	return UserMessages
}
