package urlHandlers

import (
	"fmt"
	"net/http"
	"rtforum/validators"
	"sync"

	"github.com/gorilla/websocket"
)

type Client struct {
	conn        *websocket.Conn
	send        chan []byte
	connOwnerId string
	mu          sync.Mutex
}

type Message struct {
	Type    string `json:"type"`
	From    string `json:"fromuser"`
	FromId  string `json:"fromuserid"`
	Message string `json:"message"`
	To      string `json:"touser"`
}

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		origin := r.Header.Get("Origin")
		return origin == "http://localhost:9000"
	},
}

var clients = make(map[*Client]bool)
var broadcast = make(chan Message)

func handleMessages() {
	for {
		// get broadcast and check where to send it
		msg := <-broadcast

		switch msg.Type {
		case "message":
			// save to db
			validators.SetNewMessageBeforeDB(msg.FromId, msg.Message, msg.To)
			// send to selected user
			for client := range clients {
				if msg.To == client.connOwnerId {
					client.mu.Lock()
					err := client.conn.WriteJSON(msg)
					if err != nil {
						fmt.Println(err)
						client.conn.Close()
						delete(clients, client)
					}

					client.mu.Unlock()
				}
			}
		case "onlineStatus":
			// broadcast everyone that you are online/offline
			// send to everyone that is online
			for client := range clients {
				client.conn.WriteJSON(msg)
			}
		}
	}
}

func Socket(w http.ResponseWriter, r *http.Request) {
	// upgrade connection to socket and close if not needed
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		fmt.Println(err)
		return
	}
	defer conn.Close()
	var connectionUserId string
	cookie, err := r.Cookie("rtForumCookie")
	if err != nil {
		fmt.Println("Cookie missing handle it! ->Socket")
	} else {
		exists, userId := validators.GetHashBeforeDB(cookie.Value)
		if !exists {
			fmt.Println("User does not exist handle it! ->Socket")
		} else {
			connectionUserId = userId
		}
	}

	client := &Client{
		conn:        conn,
		connOwnerId: connectionUserId,
		send:        make(chan []byte, 256),
	}
	// end

	// add new client to map
	clients[client] = true

	// sort clients to send messages to
	go handleMessages()

	// receive messages from client and send to broadcaster
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
		broadcast <- msg
	}
}
