package urlHandlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"rtforum/validators"
)

func HandleGetPosts(w http.ResponseWriter, r *http.Request) {
	CorsEnabler(w)
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}
	var callback = make(map[string]string)
	
	var postFilterCategories map[string]string
	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&postFilterCategories); err != nil {
		http.Error(w, "Invalid JSON data", http.StatusBadRequest)
		return
	}
	w.WriteHeader(http.StatusOK)
	var categories []string 
	json.Unmarshal([]byte(postFilterCategories["categories"]), &categories)

	_, err := r.Cookie("rtForumCookie")
	if err != nil {
		callback["login"] = "fail"
		jsonCallback, err := json.Marshal(callback)
		if err != nil {
			fmt.Println("Error marshaling callback in HandleGetPosts")
		}
		w.Write(jsonCallback)
	} else {
		jsonData, err := json.Marshal(validators.GetAllPostsBeforeDB(categories))
		if err != nil {
			fmt.Println("Error marshaling callback in HandleGetPosts")
		}
		w.Write(jsonData)
	}

}
