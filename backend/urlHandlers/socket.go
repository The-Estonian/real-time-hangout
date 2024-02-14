package urlHandlers

import (
	"fmt"
	"net/http"
	"sync"

	"github.com/google/uuid"
	"github.com/gorilla/websocket"
)

type Message struct {
	Username string `json:"username"`
	Message  string `json:"message"`
	Room     string `json:"room"`
}

type Client struct {
	conn *websocket.Conn
	send chan Message
	room string
	mu   sync.Mutex
}

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		origin := r.Header.Get("Origin")
		return origin == "http://localhost:9000"
	},
}

var (
	clients   = make(map[*Client]bool)
	broadcast = make(chan Message)
)

func handleMessages() {
	for {
		msg := <-broadcast

		for client := range clients {
			client.mu.Lock()
			if client.room == msg.Room {
				err := client.conn.WriteJSON(msg)
				if err != nil {
					fmt.Println(err)
					client.conn.Close()
					delete(clients, client)
				}
			}
			client.mu.Unlock()
		}
	}
}

func Socket(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		fmt.Println(err)
		return
	}
	defer conn.Close()

	client := &Client{
		conn: conn,
		send: make(chan Message, 256),
		room: uuid.New().String(),
	}

	clients[client] = true

	initialMessage := Message{
		Username: "Server", // Use a special username to indicate a system message
		Message:  "You have joined the chat.",
		Room:     client.room,
	}
	client.send <- initialMessage

	go handleMessages()

	for {
		var msg Message
		err := conn.ReadJSON(&msg)
		fmt.Println(msg)
		if err != nil {
			fmt.Println("Error at reading")
			fmt.Println(err)
			client.mu.Lock()
			delete(clients, client)
			client.mu.Unlock()
			return
		}

		// Set the client's room based on the incoming message
		client.mu.Lock()
		client.room = msg.Room
		client.mu.Unlock()

		// Broadcast the message to the room
		broadcast <- msg
	}
}
