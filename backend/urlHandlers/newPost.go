package urlHandlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"rtforum/validators"
)

func HandleNewPost(w http.ResponseWriter, r *http.Request) {
	CorsEnabler(&w)
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}
	var newPostData map[string]string
	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&newPostData); err != nil || len(newPostData["title"]) < 1 || len(newPostData["post"]) < 1 {
		http.Error(w, "Invalid JSON data", http.StatusBadRequest)
		return
	}
	w.WriteHeader(http.StatusOK)
	var callback = make(map[string]string)
	exists, user := validators.GetHashBeforeDB(newPostData["hash"])
	if exists {
		title := newPostData["title"]
		post := newPostData["post"]

		// TODO send to DB
		fmt.Println(user)
		fmt.Println(title)
		fmt.Println(post)

		callback["post"] = "accepted"
	} else {
		callback["user"] = "false"
		callback["post"] = "rejected"
	}
	writeData, err := json.Marshal(callback)
	if err != nil {
		fmt.Println("Error marshaling callback in HandleState")
	}
	w.Write(writeData)
}
