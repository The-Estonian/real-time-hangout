package urlHandlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"rtforum/validators"
)

func HandleGetComment(w http.ResponseWriter, r *http.Request) {
	CorsEnabler(w)
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}
	var callback = make(map[string]string)

	var postComments map[string]string
	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&postComments); err != nil {
		http.Error(w, "Invalid JSON data", http.StatusBadRequest)
		return
	}
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
		postid := postComments["postid"]
		jsonData, err := json.Marshal(validators.GetCommentsBeforeDB(postid))
		if err != nil {
			fmt.Println("Error marshaling callback in HandleGetPosts")
		}
		w.Write(jsonData)
	}

}
