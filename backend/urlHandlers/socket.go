package urlHandlers

import (
	"fmt"
	"net/http"
	"rtforum/validators"
	"sync"
	"time"

	"github.com/gorilla/websocket"
)

type Client struct {
	connection  *websocket.Conn
	send        chan []byte
	connOwnerId string
	mu          sync.Mutex
	lastActive  time.Time
}

type Message struct {
	Type             string   `json:"type"`
	Status           string   `json:"status"`
	From             string   `json:"fromuser"`
	FromId           string   `json:"fromuserid"`
	Message          string   `json:"message"`
	To               string   `json:"touser"`
	ConnectedClients []string `json:"connectedclients"`
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

func periodicUserPresenceCheck() {
	for {
		time.Sleep(time.Minute) // Adjust the interval as needed

		// Iterate through clients and update their online status based on lastActive
		currentTimestamp := time.Now()
		for client := range clients {
			client.mu.Lock()
			if currentTimestamp.Sub(client.lastActive) > 3*time.Minute {
				client.connection.Close()
				delete(clients, client)
			}
			client.mu.Unlock()
		}
	}
}

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
					err := client.connection.WriteJSON(msg)
					if err != nil {
						fmt.Println(err)
						client.connection.Close()
						delete(clients, client)
					}
					client.mu.Unlock()
				}
			}
		case "onlineStatus":
			users := []string{}
			for key := range clients {
				users = append(users, key.connOwnerId)
			}
			allUsers := Message{
				Type:             "onlineStatus",
				Status:           "online",
				ConnectedClients: users,
			}
			// broadcast everyone that you are online/offline
			for client := range clients {
				client.mu.Lock()
				client.connection.WriteJSON(allUsers)
				client.mu.Unlock()
			}
		case "logout":

			for client := range clients {
				if msg.FromId == client.connOwnerId {
					client.connection.Close()
					delete(clients, client)

					users := []string{}
					for key := range clients {
						users = append(users, key.connOwnerId)
					}
					allUsers := Message{
						Type:             "onlineStatus",
						Status:           "offline",
						ConnectedClients: users,
					}
					for innerclient := range clients {
						innerclient.mu.Lock()
						innerclient.connection.WriteJSON(allUsers)
						innerclient.mu.Unlock()
					}
				}
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

	// sort clients to send messages to
	go handleMessages()
	go periodicUserPresenceCheck()

	client := &Client{
		connection:  conn,
		connOwnerId: connectionUserId,
		send:        make(chan []byte, 256),
	}

	clients[client] = true
	// end

	// // clone channel after clients disconnects
	defer func() {
		// close(client.closeSignal)
		client.connection.Close()
		// close(client.send)
	}()

	// receive messages from client and send to broadcaster
	for {
		var msg Message
		err := conn.ReadJSON(&msg)
		if err != nil {
			// fmt.Println("Error at reading, closing connection of: ", client.connOwnerId)
			// fmt.Println(err)
			client.mu.Lock()
			delete(clients, client)
			client.mu.Unlock()
			return
		}
		client.mu.Lock()
		client.lastActive = time.Now()
		client.mu.Unlock()
		broadcast <- msg
	}
}
