FROM golang:1.20

WORKDIR /usr/src/app

# pre-copy/cache go.mod for pre-downloading dependencies and only redownloading them in subsequent builds if they change
COPY go.mod go.sum ./
RUN go mod download && go mod verify

# copy everything else
COPY . .

EXPOSE 3030

RUN go build -v -o /usr/local/bin/app ./cmd/main/main.go

CMD ["app"]
