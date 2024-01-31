package urlHandlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"rtforum/validators"
)

func HandleState(w http.ResponseWriter, r *http.Request) {
	CorsEnabler(&w)
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}
	w.WriteHeader(http.StatusOK)
	var callback = make(map[string]string)

	var checkstate map[string]string
	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&checkstate); err != nil || len(checkstate["hash"]) < 1 {
		http.Error(w, "Invalid JSON data", http.StatusBadRequest)
		return
	}
	exists, _ := validators.GetHashBeforeDB(checkstate["hash"])
	if exists {
		callback["login"] = "success"
	} else {
		callback["login"] = "fail"
	}

	writeData, err := json.Marshal(callback)
	if err != nil {
		fmt.Println("Error marshaling callback in HandleState")
	}
	w.Write(writeData)
}
