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

func (c *controller) postUser(u User) (string, User, error) {
	body, err := json.Marshal(u)
	if err != nil {
		return "JSON marshall", User{}, err
	}
	relativeURL := "/user"
	method := "POST"

	req, err := c.createFFRequest(method, relativeURL, body)
	if err != nil {
		fmt.Printf("Cannot create request %s\n", err.Error())
		return "", User{}, err
	}

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		fmt.Printf("Cannot send request %s\n", err.Error())
		return "", User{}, err
	}
	defer resp.Body.Close()
	if resp.StatusCode != http.StatusOK {
		return "", User{}, fmt.Errorf("response code returned is %d\n", resp.StatusCode)
	}
	err = json.NewDecoder(resp.Body).Decode(&u)
	if u.UserID == "" {
		return "", User{}, fmt.Errorf("got 200, but no userId value")
	}
	c.users[u.UserID] = u
	return "", u, nil

}
