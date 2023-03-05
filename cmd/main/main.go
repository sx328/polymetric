package main

import (
	"encoding/json"
	"log"
	"net/http"
	"os"

	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/gorilla/websocket"
	"github.com/joho/godotenv"
	"github.com/sx328/polymetric/watcher"
)

type EventMessage struct {
	Type string      `json:"type"`
	Data interface{} `json:"data"`
}

func main() {
	godotenv.Load()

	INFURA_API_KEY := os.Getenv("INFURA_API_KEY")
	INFURA_API_KEY_SECRET := os.Getenv("INFURA_API_KEY_SECRET")

	c, err := ethclient.Dial("https://polygon-mainnet.infura.io/v3/" + INFURA_API_KEY)
	if err != nil {
		log.Fatal(err)
	}

	ev := make(chan watcher.WatcherEvent)

	go watcher.Watcher(c, common.HexToAddress("0x00000000006c3852cbEf3e08E8dF289169EdE581"), ev, INFURA_API_KEY, INFURA_API_KEY_SECRET)

	upgrader := websocket.Upgrader{}

	http.HandleFunc("/events", func(w http.ResponseWriter, r *http.Request) {
		conn, err := upgrader.Upgrade(w, r, nil)
		if err != nil {
			log.Println(err)
			return
		}

		for e := range ev {
			msg := EventMessage{
				Type: e.Event,
				Data: e,
			}

			data, err := json.Marshal(msg)
			if err != nil {
				log.Println(err)
				continue
			}

			err = conn.WriteMessage(websocket.TextMessage, data)
			if err != nil {
				log.Println(err)
				continue
			}
		}
	})

	http.ListenAndServe("0.0.0.0:3030", nil)
}
