package main

import (
	"fmt"
	"net/http"
	"html/template"
	"io/ioutil"
	"encoding/xml"
	"sync"
)

type SiteMapIndex struct {
	Locations []string `xml:"sitemap>loc"`
}

type News struct {
	Titles []string `xml:"url>news>title"`
	Keywords []string `xml:"url>news>keywords"`
	Locations []string `xml:"url>loc"`
}

type NewsMap struct {
	Keyword string
	Location string
}

type NewsAggPage struct {
	Title string
	News map[string]NewsMap
}

var wg sync.WaitGroup

func newsRoutine(c chan News, Location string) {
	defer wg.Done()
	var n News
	resp, _ := http.Get(Location)
	bytes, _ := ioutil.ReadAll(resp.Body)
	xml.Unmarshal(bytes, &n)
	resp.Body.Close()

	c <- n
}

func newsAggHandler(w http.ResponseWriter, r *http.Request) {

	var s SiteMapIndex
	news_map := make(map[string]NewsMap)

	resp, _ := http.Get("https://www.washingtonpost.com/news-sitemap-index.xml")
	bytes, _ := ioutil.ReadAll(resp.Body)
	resp.Body.Close();
	xml.Unmarshal(bytes, &s)

	queue := make(chan News, 30)
	
	for _, Location := range s.Locations {
		wg.Add(1)
		go newsRoutine(queue, Location)
	}

	wg.Wait();
	close(queue)

	for element := range queue {
		for index, _ := range element.Keywords {
			news_map[element.Titles[index]] = NewsMap{Keyword: element.Keywords[index], Location: element.Locations[index]}
		}
	}

	p := NewsAggPage{Title: "News Aggregator", News: news_map}
	t, err := template.ParseFiles("basictemplating.html")
	if err == nil {
		t.Execute(w, p);
	}
}

func indexHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "<h1>Go is awesome!</h1>")
}

func main() {
	http.HandleFunc("/", indexHandler)
	http.HandleFunc("/agg", newsAggHandler)
	http.ListenAndServe(":3000", nil)
}