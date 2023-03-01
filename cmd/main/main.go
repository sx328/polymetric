package main

import (
	"context"
	"log"
	"os"

	"github.com/joho/godotenv"
	nft "github.com/sx328/poly/nft"
)

var INFURA_API_KEY string
var INFURA_API_KEY_SECRET string

const CHAIN_ID string = "137"

// Stream setup; websocket w/ infura for block to block updates, ping infura nft api to get transfers

func loadenv() {
	// Import INFURA_API_KEY and INFURA_API_KEY_SECRET from .env file
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	INFURA_API_KEY = os.Getenv("INFURA_API_KEY")
	INFURA_API_KEY_SECRET = os.Getenv("INFURA_API_KEY_SECRET")
}

func main() {
	// Load environment variables
	loadenv()

	// Create a new api client using vars
	client := nft.NewAPIClient(nft.NewConfiguration())
	ctx := context.WithValue(context.Background(), nft.ContextBasicAuth, nft.BasicAuth{
		UserName: INFURA_API_KEY,
		Password: INFURA_API_KEY_SECRET,
	})

	cl, resp, err := client.TransfersApi.NftsControllerGetTransfersByTokenAddress(ctx, CHAIN_ID, "0xace8187b113a38f83bd9c896c6878b175c234dcc", nil)
	if err != nil {
		log.Fatal(err)
	}
	log.Println(resp.Body)
	log.Println(cl)
}
