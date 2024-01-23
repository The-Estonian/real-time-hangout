package urlHandlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"rtforum/helpers"
	"rtforum/validators"
)

func HandleRegister(w http.ResponseWriter, r *http.Request) {
	CorsEnabler(&w)
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
	usernameOk, emailOk := validators.ValidateRegistrationBeforeDB(username, age, gender, firstName, lastName, email, password)
	w.WriteHeader(http.StatusOK)

	var callback = make(map[string]string)
	if usernameOk {
		callback["username"] = "already taken"
		callback["registration"] = "fail"
	}
	if emailOk {
		callback["email"] = "already taken"
		callback["registration"] = "fail"
	}
	if !emailOk && !usernameOk {
		callback["registration"] = "success"
	}
	writeData, err := json.Marshal(callback)
	if err != nil {
		fmt.Println("Error marshaling obj in HandleRegister")
	}
	w.Write(writeData)
}
