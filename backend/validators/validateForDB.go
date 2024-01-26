package validators

import (
	"fmt"
	"rtforum/cleanData"
	"rtforum/database"
	"rtforum/helpers"
)

func ValidateRegistrationBeforeDB(username, age, gender, firstName, lastName, email, password string) (bool, bool) {
	checkUsername := false
	checkEmail := false
	username = cleanData.CleanName(username)
	gender = cleanData.StandardizeString(gender)
	firstName = cleanData.StandardizeString(firstName)
	lastName = cleanData.StandardizeString(lastName)
	email = cleanData.StandardizeString(email)

	// check if username exists or return error
	// check if email exists or return error

	if !checkUsername && !checkEmail {
		database.SetUser(username, age, gender, firstName, lastName, email, password)
	} else {
		fmt.Println("Username or Email allready exists in the DB")
	}
	return checkUsername, checkEmail
}

func ValidateLoginBeforeDB(username, password string) (bool, error) {
	getPassword, err := database.GetPassword(username)
	return helpers.CheckPassword(password, getPassword), err
}
