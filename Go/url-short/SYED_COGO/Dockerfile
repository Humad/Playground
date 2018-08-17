FROM golang:1.8

WORKDIR /url-short

ADD . /url-short

EXPOSE 8080

RUN go get github.com/mattn/go-sqlite3
RUN go build server.go

CMD ["./server"]