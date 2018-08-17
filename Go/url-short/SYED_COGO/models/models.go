package models

import (
	"database/sql"
	"fmt"
	"math/rand"
	"time"
	// Needed to work with SQLite
	_ "github.com/mattn/go-sqlite3"
)

var database *sql.DB

// InitDB : Initializes the sqlite3 database
func InitDB() {
	rand.Seed(time.Now().UnixNano())

	database, _ = sql.Open("sqlite3", "./urls.db")
	statement, _ := database.Prepare("CREATE TABLE IF NOT EXISTS urls (id INTEGER PRIMARY KEY, originalurl TEXT, shorturl TEXT)")
	statement.Exec()
	fmt.Println("Opened database")
}

// GetOriginal : Gets the original (long) URL from the database, given the short URL
// Returns empty string if original URL not found
func GetOriginal(shortURL string) string {
	rows, err := database.Query("SELECT originalurl FROM urls WHERE shorturl = ?", shortURL)
	defer rows.Close()
	if err != nil {
		panic(err)
	}
	doesExist := false
	var originalURL string
	for rows.Next() {
		doesExist = true
		err := rows.Scan(&originalURL)
		if err != nil {
			panic(err)
		}
	}

	if doesExist {
		return originalURL
	}
	return ""
}

// Shorten : Shortens the original URL and stores it in the database.
// Returns shortened URL.
func Shorten(originalURL string) string {

	// Check if exists
	rows, err := database.Query("SELECT shorturl FROM urls WHERE originalurl = ?", originalURL)
	if err != nil {
		panic(err)
	}
	defer rows.Close()
	doesExist := false
	var shortURL string
	for rows.Next() {
		doesExist = true
		err := rows.Scan(&shortURL)
		if err != nil {
			panic(err)
		}
	}

	// Already exists, send back previous shortened URL
	if doesExist {
		return shortURL
	}

	// Create new shortened URL and save it
	statement, err := database.Prepare("INSERT INTO urls (originalurl, shorturl) VALUES (?, ?)")
	if err != nil {
		panic(err)
	}
	randomString := getRandomString(6)
	newShortURL := "http://localhost:8080/go/" + randomString
	statement.Exec(originalURL, newShortURL)
	return newShortURL
}

// getRandomString : Get's a random string of given length
func getRandomString(length int) string {
	letters := []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")
	charArray := make([]rune, length)
	for index := range charArray {
		charArray[index] = letters[rand.Intn(len(letters))]
	}

	return string(charArray)
}
