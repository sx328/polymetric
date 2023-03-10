/*
 * NFT API Infura
 *
 * Query NFT data using Infura Nft Api 🚀
 *
 * API version: 0.0.1
 * Generated by: Swagger Codegen (https://github.com/swagger-api/swagger-codegen.git)
 */
package swagger

type SearchNftResult struct {
	TokenId string `json:"tokenId"`
	TokenAddress string `json:"tokenAddress"`
	Metadata string `json:"metadata"`
	ContractType string `json:"contractType"`
	TokenHash string `json:"tokenHash"`
	MinterAddress string `json:"minterAddress"`
	BlockNumberMinted string `json:"blockNumberMinted"`
	TransactionMinted string `json:"transactionMinted"`
	CreatedAt string `json:"createdAt"`
}
