SWAGGER_INPUT := nft/nft.json
SWAGGER_OUTPUT := nft
SWAGGER_API_PACKAGE := nft

swagger: | nft
	curl https://docs.api.infura.io/nft/swagger.json -o $(SWAGGER_INPUT)
	swagger-codegen generate -i $(SWAGGER_INPUT) -l go -o $(SWAGGER_OUTPUT) --api-package $(SWAGGER_API_PACKAGE)

ABI_FILE := abi/Seaport.abi
ABI_PKG := seaport
ABI_OUTPUT := seaport/Seaport.go

abi: | seaport
	mkdir -p $(dir $(ABI_OUTPUT))
	abigen --abi $(ABI_FILE) --pkg $(ABI_PKG) --out $(ABI_OUTPUT)

gen: swagger abi

REDIS_PORT := 6379
REDIS_USER := seaport
REDIS_PASSWORD := seaport
REDIS_CONTAINER_NAME := seaport-redis

run:
	docker run --rm -d -p $(REDIS_PORT):$(REDIS_PORT) --name $(REDIS_CONTAINER_NAME) -e REDIS_PASSWORD=$(REDIS_PASSWORD) redis
	sleep 3
	docker run --rm -it -v $(CURDIR)/cmd/main:/app -w /app --network host -e REDIS_ADDR=127.0.0.1:$(REDIS_PORT) -e REDIS_PASSWORD=$(REDIS_PASSWORD) -e REDIS_USER=$(REDIS_USER) golang:1.16 go run main.go
	docker stop $(REDIS_CONTAINER_NAME)

seaport:
	mkdir -p seaport

nft:
	mkdir -p nft

.PHONY: clean

clean:
	rm -rf seaport/ nft/