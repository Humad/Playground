package main

import (
	"encoding/json"
	"fmt"
	"html/template"
	"math/rand"
	"net/http"
	"strings"
	"time"
)

type URLStruct struct {
	URL      string
	ShortURL string
}

var urlMap = make(map[string]string)

func serveHomePage(w http.ResponseWriter, req *http.Request) {
	homePageTemplate, err := template.ParseFiles("index.html")
	if err == nil {
		homePageTemplate.Execute(w, nil)
	} else {
		panic("Something went wrong with the template!")
	}
}

func findURL(w http.ResponseWriter, req *http.Request) {
	if req.Method == "POST" {
		if err := req.ParseForm(); err != nil {
			fmt.Fprintf(w, "Error %v", err)
			return
		}

		providedURL := req.FormValue("url")
		var shortenedURL URLStruct

		if _, exists := urlMap[providedURL]; exists {
			shortenedURL.URL = "http://localhost:8000/go/" + urlMap[providedURL]
		} else {
			randomString := getRandomString(6)
			shortenedURL.URL = "http://localhost:8000/go/" + randomString
			urlMap[providedURL] = randomString
		}

		jsonPayload, err := json.Marshal(shortenedURL)

		if err != nil {
			fmt.Fprintf(w, "Error %v", err)
		}

		w.Header().Set("Content-Type", "application/json")
		w.Write(jsonPayload)
	}
}

func goToURL(w http.ResponseWriter, req *http.Request) {
	path := strings.TrimPrefix(req.URL.Path, "/go/")
	fmt.Println(path)
}

func getRandomString(length int) string {
	letters := []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")
	charArray := make([]rune, length)
	for index := range charArray {
		charArray[index] = letters[rand.Intn(len(letters))]
	}

	return string(charArray)
}

func main() {

	rand.Seed(time.Now().UnixNano())

	http.HandleFunc("/", serveHomePage)
	http.HandleFunc("/go/", goToURL)
	http.HandleFunc("/findUrl", findURL)

	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))

	http.ListenAndServe(":8000", nil)
}
