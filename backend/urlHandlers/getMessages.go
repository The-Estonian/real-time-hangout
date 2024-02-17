package urlHandlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"rtforum/validators"
)

func HandleGetMessages(w http.ResponseWriter, r *http.Request) {
	CorsEnabler(w)
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	var messageAmount map[string]string
	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&messageAmount); err != nil {
		http.Error(w, "Invalid JSON data", http.StatusBadRequest)
		return
	}
	w.WriteHeader(http.StatusOK)

	var callback = make(map[string]string)
	cookie, err := r.Cookie("rtForumCookie")
	if err != nil {
		callback["login"] = "fail"
		jsonCallback, err := json.Marshal(callback)
		if err != nil {
			fmt.Println("Error marshaling callback in HandleGetMessages")
		}
		w.Write(jsonCallback)
	} else {
		exists, user := validators.GetHashBeforeDB(cookie.Value)
		if exists {
			// get x amount of messages
			// messageAmount map[channelPartner:2 count:10]
			jsonData, err := json.Marshal(validators.GetMessageBeforeDB(user, messageAmount["count"], messageAmount["channelPartner"]))
			if err != nil {
				fmt.Println("Error marshaling callback in HandleGetMessages")
			}
			w.Write(jsonData)
		} else {
			callback["login"] = "fail"
			jsonCallback, err := json.Marshal(callback)
			if err != nil {
				fmt.Println("Error marshaling callback in HandleGetMessages")
			}
			w.Write(jsonCallback)
		}
	}
}
