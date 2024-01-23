package validators

import (
	"fmt"
	"rtforum/database"
	"rtforum/helpers"
)

func ValidateRegistrationBeforeDB(username, age, gender, firstName, lastName, email, password string) (bool, bool) {
	checkUsername := false
	checkEmail := false
	// check if username exists or return error
	// check if email exists or return error
	if !checkUsername && !checkEmail {
		database.SetUser(username, age, gender, firstName, lastName, email, password)
	} else {
		fmt.Println("Username or Email allready exists in the DB")
	}
	return checkUsername, checkEmail
}

func ValidateLoginBeforeDB(username, password string) bool {
	getPassword := database.GetPassword(username)
	return helpers.CheckPassword(password, getPassword)
}
