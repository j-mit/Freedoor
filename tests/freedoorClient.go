// freedoor client in go
package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"
	"time"
)

type (
	controller struct {
		users map[string]User
		state state
	}
	state struct {
		UserID     string
		CategoryID string
		OfferID    string
	}
	User struct {
		FirstName string `json:"firstName,omitemtpy"`
		LastName  string `json:"lastName,omitempty"`
		EmailID   string `json:"emailId,omitemtpy"`
		Mobile    int    `json:"mobile,omitempty"`
	}
)

func (c *controller) createRequest(method string, url string, body []byte) (*http.Request, error) {
	req, err := http.NewRequest(method, url, bytes.NewBuffer(body))
	if err != nil {
		fmt.printf("Unable to create request method=%s url=%s body=%s error=%s\n", method, url, body, err.Error())
		os.Exit(1)
	}
	fmt.Printf("Req created: %s : %s\n\n", req.Method, req.URL)
	return req, nil
}

func (c *controller) postUser(u User) (string, User, error) {
	body, err := json.Marshal(u)
	if err != nil {
		return "JSON Marshalling error:", User{}, err
	}
	url := "/user"
}
