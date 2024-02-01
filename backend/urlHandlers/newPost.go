package urlHandlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"rtforum/validators"
)

func HandleNewPost(w http.ResponseWriter, r *http.Request) {
	// fmt.Println(r)
	CorsEnabler(w)
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
	cookie, err := r.Cookie("rtForumCookie")
	if err != nil {
		fmt.Println(err)
		callback["post"] = "rejected"
	} else {
		exists, user := validators.GetHashBeforeDB(cookie.Value)
		if exists {
			title := newPostData["title"]
			post := newPostData["post"]
			categories := newPostData["categories"]
			validators.SetNewPostBeforeDB(user, title, post, categories)
			callback["post"] = "accepted"
		} else {
			callback["user"] = "false"
		}
	}
	writeData, err := json.Marshal(callback)
	if err != nil {
		fmt.Println("Error marshaling callback in HandleState")
	}
	w.Write(writeData)
}
