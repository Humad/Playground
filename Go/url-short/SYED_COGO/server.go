package main

import (
	"encoding/json"
	"fmt"
	"html/template"
	"net/http"
	"./models"
)

// URLStruct : Used to send JSON response containing short URL to web page
type URLStruct struct {
	URL string
}

// Create and execute the home page template
func serveHomePage(w http.ResponseWriter, req *http.Request) {
	homePageTemplate, err := template.ParseFiles("index.html")
	if err == nil {
		homePageTemplate.Execute(w, nil)
	} else {
		panic("Something went wrong with the template!")
	}
}

// Given a long URL, shorten it and return it as JSON
func handleURL(w http.ResponseWriter, req *http.Request) {
	if req.Method == "POST" {
		if err := req.ParseForm(); err != nil {
			fmt.Fprintf(w, "Error %v", err)
			return
		}

		providedURL := req.FormValue("url")
		shortURL := URLStruct{URL: models.Shorten(providedURL)}

		jsonPayload, err := json.Marshal(shortURL)

		if err != nil {
			fmt.Fprintf(w, "Error %v", err)
		}

		w.Header().Set("Content-Type", "application/json")
		w.Write(jsonPayload)
	}
}

// Given a short URL, retrieve the original long URL and redirect to it
func goToURL(w http.ResponseWriter, req *http.Request) {
	originalURL := models.GetOriginal("http://localhost:8080" + req.URL.Path)
	if len(originalURL) != 0 {
		// redirect to original URL
		http.Redirect(w, req, originalURL, 301)
	} else {
		fourOhFourPage, err := template.ParseFiles("404.html")
		if err != nil {
			panic("Something went wrong with the 404 template!")
		} else {
			fourOhFourPage.Execute(w, nil)
		}
	}
}

func main() {
	http.HandleFunc("/", serveHomePage)
	http.HandleFunc("/go/", goToURL)
	http.HandleFunc("/findUrl", handleURL)

	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))

	models.InitDB()

	fmt.Println("Server running on port 8080")
	http.ListenAndServe(":8080", nil)
}
