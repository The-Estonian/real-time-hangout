package urlHandlers

import (
	"encoding/json"
	"fmt"
	"net/http"
)

func HandleState(w http.ResponseWriter, r *http.Request) {
	CorsEnabler(&w)
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}
	w.WriteHeader(http.StatusOK)
	var callback = make(map[string]string)
	callback["login"] = "success"
	writeData, err := json.Marshal(callback)
	if err != nil {
		fmt.Println("Error marshaling callback in HandleState")
	}
	w.Write(writeData)
}
