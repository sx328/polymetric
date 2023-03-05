package webhook

import (
	"regexp"
	"strconv"
	"strings"

	"github.com/bwmarrin/discordgo"
	"github.com/sx328/polymetric/watcher"
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

func (webhook *Webhook) SendEventEmbed(ev watcher.WatcherEvent) error {
	ipfsRegex := regexp.MustCompile(`^Qm[a-zA-Z0-9]{44}$`)

	// Format IPFS links as clickable links
	formatLink := func(link string) string {
		if strings.HasPrefix(link, "ipfs://") {
			link = "Qm" + link[len("ipfs://"):]

			if ipfsRegex.MatchString(link) {
				return "[IPFS](https://ipfs.io/ipfs/" + link + ")"
			} else {
				return link
			}
		} else if ipfsRegex.MatchString(link) {
			return "[IPFS](https://ipfs.io/ipfs/" + link + ")"
		} else {
			return link
		}
	}

	// Format fields for display in embed
	formatField := func(name string, value string, inline bool) *discordgo.MessageEmbedField {
		return &discordgo.MessageEmbedField{
			Name:   name,
			Value:  formatLink(value),
			Inline: inline,
		}
	}

	embed := &discordgo.MessageEmbed{
		Type:  discordgo.EmbedTypeRich,
		Title: "Watcher Event",
		Fields: []*discordgo.MessageEmbedField{
			formatField("UUID", ev.UUID, true),
			formatField("Block Number", strconv.FormatUint(ev.BlockNumber, 10), true),
			formatField("Event", ev.Event, true),
			formatField("Sale Price", ev.SalePrice+" "+ev.Currency, true),
			formatField("Sale Currency", ev.SaleCurrency, true),
			formatField("Token Contract Address", ev.TokenContractAddress, true),
			formatField("Symbol", ev.Symbol, true),
		},
		Image: &discordgo.MessageEmbedImage{
			URL: formatLink(ev.Image),
		},
	}

	// Send the webhook message
	session, err := discordgo.New(webhook.WebhookToken)
	if err != nil {
		return err
	}
	session.WebhookExecute(webhook.WebhookID, webhook.WebhookToken, false, &discordgo.WebhookParams{
		Embeds: []*discordgo.MessageEmbed{embed},
	})

	return err
}
