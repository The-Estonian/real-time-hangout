package urlHandlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"rtforum/cleanData"
	"rtforum/validators"
	"strconv"
	"time"

	"github.com/google/uuid"
)

func HandleLogin(w http.ResponseWriter, r *http.Request) {
	// fmt.Println(r)
	CorsEnabler(w)
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}
	var loginData map[string]string
	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&loginData); err != nil || len(loginData["username"]) < 6 || len(loginData["password"]) < 6 {
		http.Error(w, "Invalid JSON data", http.StatusBadRequest)
		return
	}
	w.WriteHeader(http.StatusOK)
	username := cleanData.CleanName(loginData["username"])
	password := loginData["password"]
	var callback = make(map[string]string)
	authenticate, err := validators.GetLoginBeforeDBAuth(username, password)
	if authenticate {
		callback["login"] = "success"
		// create cookie and timers, send to DB and User
		id := uuid.New()
		exp := time.Now().Add(10 * time.Minute)
		name := "rtForumCookie"
		callback["rtforum-cookie-id"] = id.String()
		callback["rtforum-cookie-exp"] = strconv.FormatInt(exp.UnixNano()/int64(time.Millisecond), 10)
		callback["rtforum-cookie-name"] = name

		validators.SetHashBeforeDB(username, id.String())
	}
	if !authenticate {
		callback["login"] = "userPwNoMatch"
	}
	if err != nil {
		callback["login"] = "usernameError"
	}
	writeData, err := json.Marshal(callback)
	if err != nil {
		fmt.Println("Error marshaling obj in HandleLogin")
	}
	w.Write(writeData)
}
