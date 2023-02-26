swagger:
	go run swagger-gen/main.go
	swagger-codegen generate -i swagger.json -l go -o infura-nft-go 



