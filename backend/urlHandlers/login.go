package urlHandlers

import (
	"encoding/json"
	"fmt"
	"net/http"
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
	fmt.Println(loginData["username"])
	fmt.Println(loginData["password"])
	w.WriteHeader(http.StatusOK)
}
