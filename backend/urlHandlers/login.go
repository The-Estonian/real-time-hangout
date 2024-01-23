package urlHandlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"rtforum/validators"
)

func HandleLogin(w http.ResponseWriter, r *http.Request) {
	CorsEnabler(&w)
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}
	var loginData map[string]string
	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&loginData); err != nil {
		http.Error(w, "Invalid JSON data", http.StatusBadRequest)
		return
	}
	username := loginData["username"]
	password := loginData["password"]
	w.WriteHeader(http.StatusOK)
	var callback = make(map[string]string)
	if validators.ValidateLoginBeforeDB(username, password) {
		callback["login"] = "success"
		// create cookie and timers, send to DB and User 
	} else {
		callback["login"] = "rejected"
	}
	writeData, err := json.Marshal(callback)
	if err != nil {
		fmt.Println("Error marshaling obj in HandleLogin")
	}
	w.Write(writeData)
}
