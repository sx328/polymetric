package watcher

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"math"
	"math/big"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/ethereum/go-ethereum"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/google/uuid"
	"github.com/sx328/polymetric/contract/chainlink"
	"github.com/sx328/polymetric/contract/erc20"
	"github.com/sx328/polymetric/contract/seaport"
)

// Common variables
var (
	BasicOrderFulfilled = common.HexToHash("0x9d9af8e38d66c62e2c12f0225249fd9d721c54b83f48d9352c97c6cacdcb6f31")
	ERC721InterfaceId   = common.BytesToHash([]byte("0x80ac58cd"))
	ERC1155InterfaceId  = common.BytesToHash([]byte("0xd9b67a26"))
	ChainlinkMaticPairs = "https://reference-data-directory.vercel.app/feeds-matic-mainnet.json"
)

// Struct to hold watcher event data
type WatcherEvent struct {
	UUID                 string `json:"uuid"`
	BlockNumber          uint64 `json:"blockNumber"`
	Event                string `json:"event"`
	SalePrice            string `json:"salePrice"`
	SaleCurrency         string `json:"saleCurrency"`
	TokenContractAddress string `json:"tokenContractAddress"`
	Image                string `json:"image"`
	Currency             string `json:"currency"`
	Symbol               string `json:"symbol"`
}

type ImageMetadata struct {
	Token string `json:"image"`
}

// Struct to hold a collection of watcher events
type WatcherEvents struct {
	Block []WatcherEvent `json:"events"`
}

type MetadataRequest struct {
	ContractAddress string
	TokenID         string
	ChainID         string
}

type Pair struct {
	CompareOffchain     string   `json:"compareOffchain"`
	ContractAddress     string   `json:"contractAddress"`
	ContractType        string   `json:"contractType"`
	ContractVersion     int      `json:"contractVersion"`
	DecimalPlaces       int      `json:"decimalPlaces"`
	Ens                 string   `json:"ens"`
	FormatDecimalPlaces int      `json:"formatDecimalPlaces"`
	HealthPrice         string   `json:"healthPrice"`
	Heartbeat           int      `json:"heartbeat"`
	History             bool     `json:"history"`
	Multiply            string   `json:"multiply"`
	Name                string   `json:"name"`
	Pair                []string `json:"pair"`
	Path                string   `json:"path"`
	ProxyAddress        string   `json:"proxyAddress"`
	Threshold           float64  `json:"threshold"`
	ValuePrefix         string   `json:"valuePrefix"`
	AssetName           string   `json:"assetName"`
	FeedCategory        string   `json:"feedCategory"`
	FeedType            string   `json:"feedType"`
	Docs                struct {
		AssetName    string `json:"assetName"`
		FeedCategory string `json:"feedCategory"`
		FeedType     string `json:"feedType"`
	} `json:"docs"`
	Decimals int `json:"decimals"`
}

// Helper function to get the latest block number from the node
func LatestBlockNumber(c *ethclient.Client, interval time.Duration) <-chan uint64 {
	latest := uint64(0)

	// Create a channel to send the latest block number to the main function
	blockNumCh := make(chan uint64)

	// Start a background goroutine that continuously queries the node for the latest block number
	go func() {
		for {
			// Query the node for the latest block number
			blockNum, err := c.BlockNumber(context.Background())
			if err != nil {
				log.Printf("Failed to get latest block number: %v", err)
			} else if blockNum > latest {
				latest = blockNum

				// Send the latest block number to the main function
				blockNumCh <- latest
			}

			// Wait for the specified interval before querying again
			time.Sleep(interval)
		}
	}()

	return blockNumCh
}

// Functor to initialize and watch events for the Seaport contract
func Watcher(c *ethclient.Client, contractAddress common.Address, events chan<- WatcherEvent, infuraKey string, infuraSecret string) {
	// Initailize a new seaport instance for contract events
	seaport, err := seaport.NewSeaport(contractAddress, c)
	if err != nil {
		log.Fatal(err)
	}

	for latestBlock := range LatestBlockNumber(c, 1*time.Second) {
		query := ethereum.FilterQuery{
			FromBlock: new(big.Int).SetUint64(latestBlock - 1000),
			ToBlock:   new(big.Int).SetUint64(latestBlock),
			Addresses: []common.Address{
				contractAddress,
			},
			Topics: [][]common.Hash{
				{
					BasicOrderFulfilled,
				},
			},
		}

		logs, err := c.FilterLogs(context.Background(), query)
		if err != nil {
			log.Printf("Failed to get logs: %v", err)

		} else {
			for _, _log := range logs {
				parsed, err := seaport.ParseOrderFulfilled(_log)
				if err != nil {
					log.Printf("Failed to get logs: %v", err)
				}

				answer := new(big.Float).SetInt(parsed.Consideration[0].Amount)
				quotient := new(big.Float).Quo(answer, big.NewFloat(math.Pow(10, 18)))

				metadataReq := MetadataRequest{
					ContractAddress: parsed.Offer[0].Token.String(),
					TokenID:         parsed.Offer[0].Identifier.String(),
					ChainID:         "137",
				}
				metadata := RequestTokenMetadata(infuraKey, infuraSecret, metadataReq)

				price, sym := RequestTokenPrice(c, parsed.Consideration[0].Token)
				p := new(big.Float).Mul(price, quotient)

				events <- WatcherEvent{
					UUID:                 uuid.New().String(),
					BlockNumber:          _log.BlockNumber,
					Event:                BasicOrderFulfilled.String(),
					SalePrice:            quotient.String(),
					SaleCurrency:         sym,
					TokenContractAddress: parsed.Offer[0].Token.String(),
					Image:                metadata,
					Currency:             p.String(),
					Symbol:               sym,
				}
			}
		}
	}
}

// Function to request the NFT metadata from the infura nft api
func RequestTokenMetadata(INFURA_KEY string, INFURA_KEY_SECRET string, meta MetadataRequest) string {
	// Create HTTP request
	url := fmt.Sprintf("https://nft.api.infura.io/networks/%v/nfts/%v/tokens/%v?resyncMetadata=false", meta.ChainID, meta.ContractAddress, meta.TokenID)
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		log.Println("Error creating request:", err)
	}

	req.SetBasicAuth(INFURA_KEY, INFURA_KEY_SECRET)

	// Send HTTP request
	client := &http.Client{}
	resp, err := client.Do(req)

	if err != nil {
		log.Println("Error sending request:", err)
	}
	defer resp.Body.Close()

	// Parse JSON response
	type Image struct {
		Metadata struct {
			Image string `json:"image"`
		} `json:"metadata"`
	}

	var img Image
	err = json.NewDecoder(resp.Body).Decode(&img)

	if err != nil {
		log.Println("Error decoding JSON response:", err)
	}

	// Print image data
	return img.Metadata.Image
}

// Function to request pair price (if available) from the chainlink oracle
func RequestTokenPrice(c *ethclient.Client, contractAddress common.Address) (*big.Float, string) {
	// Initialize the contract

	// check for base (matic)
	if contractAddress == common.HexToAddress("0x0000000000000000000000000000000000000000") {
		poly := common.HexToAddress("0xAB594600376Ec9fD91F8e885dADF0CE036862dE0")
		// Initialize the contract
		link, err := chainlink.NewChainlink(poly, c)
		if err != nil {
			log.Fatal(err)
		}

		// Get the latest price
		price, err := link.LatestRoundData(&bind.CallOpts{})
		if err != nil {
			log.Fatal(err)
		}

		answer := new(big.Float)
		qo := new(big.Float)
		answer = answer.Quo(qo.SetInt(price.Answer), big.NewFloat(100000000))
		return answer, "USD"

	} else if contractAddress == common.HexToAddress("0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619") {
		poly := common.HexToAddress("0x4dD6655Ad5ed7C06c882f496E3f42acE5766cb89")
		// Initialize the contract
		link, err := chainlink.NewChainlink(poly, c)
		if err != nil {
			log.Fatal(err)
		}

		// Get the latest price
		price, err := link.LatestRoundData(&bind.CallOpts{})
		if err != nil {
			log.Fatal(err)
		}

		answer := new(big.Float)
		qo := new(big.Float)
		answer = answer.Quo(qo.SetInt(price.Answer), big.NewFloat(100000000))
		return answer, "USD"
	}

	token, err := erc20.NewErc20(contractAddress, c)
	if err != nil {
		log.Println(err)
	}

	tokenSym, err := token.Symbol(&bind.CallOpts{})
	if err != nil {
		log.Println(err)
	}

	resp, err := http.Get(ChainlinkMaticPairs)
	if err != nil {
		log.Println("Error making HTTP request:", err)
		return new(big.Float).SetInt64(0), ""
	}

	defer resp.Body.Close()

	// Decode JSON response into struct
	var pairsResponse []Pair
	err = json.NewDecoder(resp.Body).Decode(&pairsResponse)
	if err != nil {
		return new(big.Float).SetInt64(0), ""
	}

	for _, pair := range pairsResponse {
		if pair.FeedType == "Crypto" {
			sym := strings.Split(pair.Ens, "-")
			if sym[1] != "usd" {
				if sym[0] == strings.ToLower(tokenSym) {
					contractAddress := common.HexToAddress(pair.ContractAddress)
					oracle, err := chainlink.NewChainlink(contractAddress, c)
					if err != nil {
						log.Fatal(err)
					}

					x, err := oracle.LatestRoundData(&bind.CallOpts{})
					if err != nil {
						log.Fatal(err)
					}

					i, err := strconv.Atoi(pair.Multiply)
					if err != nil {
						log.Fatal(err)
					}

					answer := new(big.Float).SetInt(x.Answer)
					quotient := new(big.Float).Quo(answer, big.NewFloat(float64(i)))

					return quotient, strings.ToUpper(sym[1])
				}
			}
		}
	}

	return new(big.Float).SetInt64(0), ""
}
