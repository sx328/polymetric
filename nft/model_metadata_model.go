/*
 * NFT API Infura
 *
 * Query NFT data using Infura Nft Api 🚀
 *
 * API version: 0.0.1
 * Generated by: Swagger Codegen (https://github.com/swagger-api/swagger-codegen.git)
 */
package swagger

type MetadataModel struct {
	Contract string `json:"contract"`
	TokenId string `json:"tokenId"`
	Metadata *interface{} `json:"metadata"`
}
