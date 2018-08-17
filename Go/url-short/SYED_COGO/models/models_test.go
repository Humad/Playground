package models

import (
	"strings"
	"testing"
)

func TestRandom(t *testing.T) {
	s1 := getRandomString(6)
	s2 := getRandomString(6)

	if s1 == s2 {
		t.Errorf("Expected random strings to be different; got %s for both", s1)
	}
}

func TestShorten(t *testing.T) {

	InitDB()

	// Test if URL can be shortened
	testLongURL := "https://www.somerandomwebsite.com/"
	shortURL := Shorten(testLongURL)
	if !strings.Contains(shortURL, "http://localhost:8080") {
		t.Errorf("Expected short URL to begin with http://localhost:8080")
	}

	// Test if the same short URL is returned when trying to shorten again
	anotherShortURL := Shorten(testLongURL)
	if shortURL != anotherShortURL {
		t.Errorf("Expected the first and second short URLs to be the same")
	}

	// Test if original URL can be retrieved from short URL
	returnedOriginalURL := GetOriginal(anotherShortURL)
	if returnedOriginalURL != testLongURL {
		t.Errorf("Original URL not returned")
	}
}
