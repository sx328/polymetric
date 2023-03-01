/*
 * NFT API Infura
 *
 * Query NFT data using Infura Nft Api 🚀
 *
 * API version: 0.0.1
 * Generated by: Swagger Codegen (https://github.com/swagger-api/swagger-codegen.git)
 */
package swagger

type TransfersModel struct {
	Total float64 `json:"total"`
	PageNumber float64 `json:"pageNumber"`
	PageSize float64 `json:"pageSize"`
	Network string `json:"network"`
	Cursor string `json:"cursor"`
	Account string `json:"account"`
	Transfers []TransfersResultsModel `json:"transfers"`
}