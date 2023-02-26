package main

import (
	"fmt"
	"io"
	"net/http"
	"os"
)

func main() {
	url := "https://docs.api.infura.io/nft/swagger.json"

	file, err := os.Create("swagger.json")
	if err != nil {
		fmt.Println("Error creating file: ", err)
		return
	}
	defer file.Close()

	resp, err := http.Get(url)
	if err != nil {
		fmt.Println("Error fetching URL: ", err)
		return
	}
	defer resp.Body.Close()

	_, err = io.Copy(file, resp.Body)
	if err != nil {
		fmt.Println("Error writing to file: ", err)
		return
	}

	fmt.Println("Swagger JSON file downloaded and saved to swagger.json")
}
