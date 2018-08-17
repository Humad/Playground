# URL Shortener In Go

## Introduction

This application is a very basic URL Shortener written in Go. It makes use of Go's http library among others, and uses SQLite3 to store URLs. The application can be deployed using Docker.

## Background

When I received this take-home assignment, I did not know how to code in Go and I had never used Docker. My main challenge was to pick up these technologies and learn them enough to be able to finish this assignment. 

I watched a number of tutorials online for both Go and Docker and then filled in any gaps in my knowledge by doing further reading. This was fun because I'm always looking to learn new things and expand my skillset. I have also realized just how great Go is and I will be modifying some of my existing projects to have a backend in Go.

## The Application

#### Features

I wanted to make this simple and sweet. This application has the basic functionality of taking a long URL and converting it into a short one.

I also created a webpage where users can paste their long URLs are directly receive a short one. The HTML form tag on the page automatically checks if the user's URL is valid.

I have also designed the application such that if a user tries to shorten a URL that has already been shortened before, then the previously shortened URL is returned instead of a new one being generated.

#### Tests

I did not have enough time to write tests. I have also not had enough experience testing web applications.

Despite this, I tried my best to write some tests. The main things being tested are:

- Is a URL being shortened correctly?
- If I shorten a URL that has been shortened already, do I get the previously shortened URL?
- Can I retrieve the original long URL?
- Is the random string generator function working?

Given more time I would implement more tests such as:

- Does the application panic when the database has not been initialized?
- Are the current web templates rendered?

#### How it works

I used Go's http library to handle http requests and send the correct responses. All of this is handled in `server.go`. I also have my `models.go` file which handles communication with the sqlite3 database to store and retrieve URLs.

When the user first runs the app and goes to `localhost:8080`, a very basic home page with a form is rendered. When the user inputs a URL and presses submit, a request is made to the server to store the URL. The server takes this URL, shortens it and stores it in the database. It then returns the shortened URL to the page.

When the user navigates to the shortened URL, the server finds the original URL that it needs to link to and redirects to that original URL.

## How to run

(This assumes that the user has Docker and Go installed on their machine.)

1. Navigate to the project folder using the terminal.
2. In the terminal, type in `docker build -t url-short .`
3. Once the application finishes building, type in `docker run -p 8080:8080 url-short`
4. Open up a browser and navigate to `localhost:8080`


## How to Test
(This assumes that the user has Go installed on their machine)

1. Navigate to the project folder using the terminal.
2. Navigate to the `models` folder.
3. Type in `go test`