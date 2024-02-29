package urlHandlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"rtforum/helpers"
	"rtforum/validators"
)

func HandleRegister(w http.ResponseWriter, r *http.Request) {
	CorsEnabler(w)
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}
	var registerData map[string]string
	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&registerData); err != nil {
		http.Error(w, "Invalid JSON data", http.StatusBadRequest)
		return
	}
	username := registerData["username"]
	age := registerData["age"]
	gender := registerData["gender"]
	firstName := registerData["firstName"]
	lastName := registerData["lastName"]
	email := registerData["email"]
	password, err := helpers.SetHashPassword(registerData["password"])
	if err != nil {
		fmt.Println("Registration password hash error on HandleRegister", err)
	}

	var callback = make(map[string]string)

	var usernameOk, emailOk bool
	if validators.ValidateEmail(email) && validators.ValidatePassword(password) {
		usernameOk, emailOk = validators.SetRegistrationBeforeDB(username, age, gender, firstName, lastName, email, password)
		if usernameOk {
			callback["username"] = "Username already in use!"
			callback["registration"] = "fail"
		}
		if emailOk {
			callback["email"] = "Email already in use!"
			callback["registration"] = "fail"
		}
		if !emailOk && !usernameOk {
			callback["registration"] = "success"
		}
	} else {
		callback["registration-data"] = "registration requirements not met!"
	}
	w.WriteHeader(http.StatusOK)

	writeData, err := json.Marshal(callback)
	if err != nil {
		fmt.Println("Error marshaling obj in HandleRegister")
	}
	w.Write(writeData)
}
