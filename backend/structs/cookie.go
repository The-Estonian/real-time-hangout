package structs

import "time"

type CreateCookie struct {
	Name    string    `json:"cookieName"`
	Value   string    `json:"cookieValue"`
	Expires time.Time `json:"cookieExpires"`
}
