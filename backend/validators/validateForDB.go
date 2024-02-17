package validators

import (
	"encoding/json"
	"fmt"
	"rtforum/cleanData"
	"rtforum/database"
	"rtforum/helpers"
	"rtforum/structs"
	"time"
)

// adjust data before sending to DB
func SetRegistrationBeforeDB(username, age, gender, firstName, lastName, email, password string) (bool, bool) {
	username = cleanData.CleanName(username)
	gender = cleanData.StandardizeString(gender)
	firstName = cleanData.StandardizeString(firstName)
	lastName = cleanData.StandardizeString(lastName)
	email = cleanData.StandardizeString(email)

	checkUsername := database.GetUsernameCheck(username)
	checkEmail := database.GetEmailCheck(email)

	if !checkUsername && !checkEmail {
		database.SetUser(username, age, gender, firstName, lastName, email, password)
	} else {
		fmt.Println("Username or Email allready exists in the DB")
	}
	return checkUsername, checkEmail
}

// adjust data after getting data from DB
func GetLoginBeforeDBAuth(username, password string) (bool, error) {
	getPassword, err := database.GetPassword(username)
	return helpers.CheckPassword(password, getPassword), err
}

// adjust data before setting hash
func SetHashBeforeDB(username, hash string) {
	userId := database.GetUserIdByUsername(username)
	database.SetUserSession(userId, hash)
}

// adjust data before deleting from DB
func SetRemoveHashBeforeDB(hash string) {
	database.SetRemoveHash(hash)
}

// adjust data after getting data from DB
func GetHashBeforeDB(hash string) (bool, string) {
	exists, user, date := database.GetUserSession(hash)
	// check time
	if exists {
		layout := "2006-01-02 15:04:05"
		hashDate, _ := time.Parse(layout, date)
		currTime := time.Now().Add(time.Minute * -10)
		if currTime.Sub(hashDate) > 0 {
			fmt.Println("Hash expired, Executing delete")
			SetRemoveHashBeforeDB(hash)
			return false, "0"
		}
		return true, user
	}
	return false, "0"
}

// adjust data before deleting from DB
func SetNewPostBeforeDB(user, title, post, categories string) {
	title = cleanData.CleanName(title)
	var catArray []string
	json.Unmarshal([]byte(categories), &catArray)
	postId := database.SetNewPost(user, title, post)

	// Insert post categories into table
	for i := 0; i < len(catArray); i++ {
		database.SetCategoryToPost(postId, catArray[i])
	}
}

func GetAllPostsBeforeDB(catFilter []string) []structs.Post {
	return database.GetAllPosts(catFilter)
}

func SetNewCommentBeforeDB(post, user, comment string) {
	database.SetNewComment(post, user, comment)
}

func GetCommentsBeforeDB(postid string) []structs.Comment {
	return database.GetComments(postid)
}

func GetAllUsersBeforeDB(user string) []structs.User {
	// fmt.Println("User asking data: ", user)
	return database.GetUsers(user)
}

func SetNewMessageBeforeDB(fromuser, message, touser string) {
	database.SetNewMessage(fromuser, message, touser)
}

func GetMessageBeforeDB(fromuser, count, touser string) []structs.Message {
	return database.GetMessage(fromuser, count, touser)
}
