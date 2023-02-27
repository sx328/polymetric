# Current Layout
```
├── Dockerfile           <- Dockerfile for running the application
├── LAYOUT.md            <- This file shows the layout of the project
├── LICENSE              <- Declares the License of the project
├── Makefile             <- Makefile contains the commands to build the project
├── README.md            <- The top-level README for developers using this project
├── cmd
│   └── main
│       └── main.go      <- Standard Go entrypoint
├── go.mod               <- Go module file
├── go.sum               <- Go sum file
├── nft                  <- Contains the client nft package from the Swagger JSON schema
│   ├── README.md
│   ├── api
│   │   └── swagger.yaml
│   ├── api_collections.go
│   ├── api_market_data.go
│   ├── api_metadata.go
│   ├── api_ownership.go
│   ├── api_transfers.go
│   ├── client.go
│   ├── configuration.go
│   ├── docs
│   │   ├── AssetsModel.md
│   │   ├── CollectionByWalletModel.md
│   │   ├── CollectionModel.md
│   │   ├── CollectionsApi.md
│   │   ├── MarketDataApi.md
│   │   ├── MetadataApi.md
│   │   ├── MetadataModel.md
│   │   ├── NftModel.md
│   │   ├── OwnersModel.md
│   │   ├── OwnersResultModel.md
│   │   ├── OwnershipApi.md
│   │   ├── SearchNftModel.md
│   │   ├── SearchNftResult.md
│   │   ├── TradePriceModel.md
│   │   ├── TransfersApi.md
│   │   ├── TransfersModel.md
│   │   └── TransfersResultsModel.md
│   ├── git_push.sh
│   ├── model_assets_model.go
│   ├── model_collection_by_wallet_model.go
│   ├── model_collection_model.go
│   ├── model_metadata_model.go
│   ├── model_nft_model.go
│   ├── model_owners_model.go
│   ├── model_owners_result_model.go
│   ├── model_search_nft_model.go
│   ├── model_search_nft_result.go
│   ├── model_trade_price_model.go
│   ├── model_transfers_model.go
│   ├── model_transfers_results_model.go
│   └── response.go
├── nft.json             <- Contains the JSON schema for the NFT API
└── swagger-gen          <- Contains the Swagger generator
    └── main.go          <- Downloads JSON schema

```