package urlHandlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"rtforum/validators"
)

func HandleState(w http.ResponseWriter, r *http.Request) {
	CorsEnabler(w)
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}
	w.WriteHeader(http.StatusOK)
	var callback = make(map[string]string)

	cookie, err := r.Cookie("rtForumCookie")
	if err != nil {
		callback["login"] = "fail"
	} else {
		exists, _ := validators.GetHashBeforeDB(cookie.Value)
		if exists {
			callback["login"] = "success"
		} else {
			callback["login"] = "fail"
		}
	}

	writeData, err := json.Marshal(callback)
	if err != nil {
		fmt.Println("Error marshaling callback in HandleState")
	}
	w.Write(writeData)
}
 