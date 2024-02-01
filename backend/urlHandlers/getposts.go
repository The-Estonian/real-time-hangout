package urlHandlers

import (
	"encoding/json"
	"fmt"
	"net/http"
)

func HandleGetPosts(w http.ResponseWriter, r *http.Request) {
	CorsEnabler(w)
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}
	w.WriteHeader(http.StatusOK)
	var callback = make(map[string]string)

	cookie, err := r.Cookie("rtForumCookie")
	if err != nil {
		callback["authorization"] = "fail"
	} else {
		fmt.Println("Getting all posts as User: ", cookie.Value)
	}
	writeData, err := json.Marshal(callback)
	if err != nil {
		fmt.Println("Error marshaling callback in HandleGetPosts")
	}
	w.Write(writeData)
}
