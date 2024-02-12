package urlHandlers

import (
	"fmt"
	"net/http"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		origin := r.Header.Get("Origin")
		return origin == "http://localhost:9000"
	},
}

func Socket(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		fmt.Println(err)
		return
	}

	for {
		messageType, p, err := conn.ReadMessage()
		if err != nil {
			fmt.Println(err)
			return
		}
		fmt.Println(string(p))
		if string(p) == "Hello" {
			fmt.Println("Got Hello!")
			conn.WriteMessage(messageType, []byte("Go Away!"))
		} else {
			if err := conn.WriteMessage(messageType, []byte("data received")); err != nil {
				fmt.Println(err)
				return
			}
		}
	}
}
