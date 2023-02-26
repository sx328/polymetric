/*
 * NFT API Infura
 *
 * Query NFT data using Infura Nft Api 🚀
 *
 * API version: 0.0.1
 * Generated by: Swagger Codegen (https://github.com/swagger-api/swagger-codegen.git)
 */
package swagger

type OwnersResultModel struct {
	TokenAddress string `json:"tokenAddress"`
	TokenId string `json:"tokenId"`
	Amount string `json:"amount"`
	OwnerOf string `json:"ownerOf"`
	TokenHash string `json:"tokenHash"`
	BlockNumberMinted string `json:"blockNumberMinted"`
	BlockNumber string `json:"blockNumber"`
	ContractType string `json:"contractType"`
	Name string `json:"name"`
	Symbol string `json:"symbol"`
	Metadata string `json:"metadata"`
	MinterAddress string `json:"minterAddress"`
}
