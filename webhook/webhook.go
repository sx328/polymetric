package webhook

import (
	"strings"

	"github.com/bwmarrin/discordgo"
)

type Webhook struct {
	WebhookID    string
	WebhookToken string
	WebhookURL   string
}

func InitializeWebhook(url string) *Webhook {
	s := strings.Split(url, "/")
	webhook := &Webhook{
		WebhookID:    s[5],
		WebhookToken: s[6],
		WebhookURL:   url,
	}
	return webhook
}

func (webhook *Webhook) SendWebhookMessage(content string) error {
	// Create a new Discord session
	session, err := discordgo.New(webhook.WebhookToken)
	if err != nil {
		return err
	}

	// Create a new webhook message
	params := discordgo.WebhookParams{
		Content: content,
	}

	// Send the webhook message
	_, err = session.WebhookExecute(webhook.WebhookID, webhook.WebhookToken, false, &params)

	if err != nil {
		return err
	}
	return nil
}

// func main() {
// 	err := godotenv.Load()
// 	if err != nil {
// 		log.Fatal(err)
// 	}

// 	url := os.Getenv("DISCORD_SALES_WEBHOOK")
// 	webhook := InitializeWebhook(url)

// 	err = webhook.SendWebhookMessage("Hello, world!")
// 	if err != nil {
// 		log.Fatal(err)
// 	}
// }
