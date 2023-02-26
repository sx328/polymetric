/*
 * NFT API Infura
 *
 * Query NFT data using Infura Nft Api 🚀
 *
 * API version: 0.0.1
 * Generated by: Swagger Codegen (https://github.com/swagger-api/swagger-codegen.git)
 */
package swagger

type TradePriceModel struct {
	TransactionHash string `json:"transactionHash"`
	BlockTimestamp string `json:"blockTimestamp"`
	BlockHash string `json:"blockHash"`
	BlockNumber string `json:"blockNumber"`
	TokenIds []string `json:"tokenIds"`
	SellerAddress string `json:"sellerAddress"`
	BuyerAddress string `json:"buyerAddress"`
	TokenAddress string `json:"tokenAddress"`
	MarketplaceAddress string `json:"marketplaceAddress"`
	Price string `json:"price"`
}
