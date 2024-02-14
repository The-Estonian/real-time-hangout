package urlHandlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"rtforum/validators"
)

func HandleGetUsers(w http.ResponseWriter, r *http.Request) {
	CorsEnabler(w)
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}
	var callback = make(map[string]string)
	w.WriteHeader(http.StatusOK)

	_, err := r.Cookie("rtForumCookie")
	if err != nil {
		callback["login"] = "fail"
		jsonCallback, err := json.Marshal(callback)
		if err != nil {
			fmt.Println("Error marshaling callback in HandleGetPosts")
		}
		w.Write(jsonCallback)
	} else {
		jsonData, err := json.Marshal(validators.GetAllUsersBeforeDB())
		if err != nil {
			fmt.Println("Error marshaling callback in HandleGetPosts")
		}
		w.Write(jsonData)
	}

}
