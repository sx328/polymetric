swagger:
	go run swagger-gen/main.go
	swagger-codegen generate -i nft.json -l go -o nft



