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
		return origin == "http://127.0.0.1:3000"
	},
}

func IndexSocket(w http.ResponseWriter, r *http.Request) {
	fmt.Println(r.Header.Get("Origin"))
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
