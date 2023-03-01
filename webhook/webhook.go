package main

import (
	"fmt"
	"log"
	"os"
	"strings"

	"github.com/bwmarrin/discordgo"
	"github.com/joho/godotenv"
)

type Webhook struct {
	WebhookID    string
	WebhookToken string
	WebhookURL   string
}

// initalize webhook from url with environment variables
func webhookInit(url string) Webhook {
	s := strings.Split(url, "/")
	fmt.Println(s)
	webhook := Webhook{
		WebhookID:    s[5],
		WebhookToken: s[6],
		WebhookURL:   url,
	}

	return webhook

}

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal(err)
	}
	url := os.Getenv("DISCORD_SALES_WEBHOOK")
	webhook := webhookInit(url)

	// Create a new Discord session
	session, err := discordgo.New(webhook.WebhookToken)
	if err != nil {
		panic(err)
	}

	// Create a new webhook message
	params := discordgo.WebhookParams{
		Username:  "Sales Bot",
		AvatarURL: "https://example.com/avatar.png",
		Content:   "Hello, world!",
	}

	// Send the webhook message
	_, err = session.WebhookExecute(webhook.WebhookID, webhook.WebhookToken, false, &params)

	if err != nil {
		panic(err)
	}
}
