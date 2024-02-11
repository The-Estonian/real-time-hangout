package urlHandlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"rtforum/validators"
)

func HandleNewComment(w http.ResponseWriter, r *http.Request) {
	// fmt.Println(r)
	CorsEnabler(w)
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}
	var newCommentData map[string]string
	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&newCommentData); err != nil || len(newCommentData["comment"]) < 1 {
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
			comment := newCommentData["comment"]
			post := newCommentData["post"]
			validators.SetNewCommentBeforeDB(post, user, comment)
			callback["post"] = "accepted"
		} else {
			callback["user"] = "false"
		}
	}
	writeData, err := json.Marshal(callback)
	if err != nil {
		fmt.Println("Error marshaling callback in HandleNewComment")
	}
	w.Write(writeData)
}
