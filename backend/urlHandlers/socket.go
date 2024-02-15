package urlHandlers

import (
	"fmt"
	"net/http"
	"rtforum/validators"
	"sync"

	"github.com/gorilla/websocket"
)

type Message struct {
	User    string `json:"fromuser"`
	SendTo  string `json:"tousername"`
	Message string `json:"message"`
	Status  string `json:"status"`
}

type Client struct {
	conn   *websocket.Conn
	send   chan Message
	userId string
	status string
	mu     sync.Mutex
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
		// get broadcast and check where to send it
		msg := <-broadcast
		for client := range clients {
			client.mu.Lock()
			if msg.Status != "" {
				if msg.User == client.userId {
					client.status = msg.Status
				}
			}
			if client.userId == msg.SendTo {
				err := client.conn.WriteJSON(msg)
				if err != nil {
					fmt.Println(err)
					client.conn.Close()
					delete(clients, client)
					delete(onlineUsers, client.userId)
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

	cookie, err := r.Cookie("rtForumCookie")
	_, user := validators.GetHashBeforeDB(cookie.Value)
	if err != nil {
		fmt.Println("Error getting cookie in Socket")
	}

	client := &Client{
		conn:   conn,
		userId: user,
		send:   make(chan Message, 256),
	}

	clients[client] = true

	go handleMessages()

	for {
		var msg Message
		err := conn.ReadJSON(&msg)
		if err != nil {
			fmt.Println("Error at reading")
			fmt.Println(err)
			client.mu.Lock()
			delete(clients, client)
			client.mu.Unlock()
			return
		}

		// // Set the client's room based on the incoming message
		// client.mu.Lock()
		// client.room = msg.Room
		// client.mu.Unlock()

		// Broadcast the message to the room
		broadcast <- msg
	}
}
