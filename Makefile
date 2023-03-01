SWAGGER_INPUT := nft.json
SWAGGER_OUTPUT := nft
SWAGGER_API_PACKAGE := nft

swagger:
	mkdir -p $(SWAGGER_OUTPUT)
	curl https://docs.api.infura.io/nft/swagger.json -o $(SWAGGER_OUTPUT)/$(SWAGGER_INPUT)
	swagger-codegen generate -i $(SWAGGER_OUTPUT)/$(SWAGGER_INPUT) -l go -o $(SWAGGER_OUTPUT) --api-package $(SWAGGER_API_PACKAGE)

ABI_DIR := abi
ABI_OUTPUT_DIR := contract

abi:
	mkdir -p $(ABI_OUTPUT_DIR)
	for file in $(wildcard $(ABI_DIR)/*.abi); do \
		echo "Processing $$file"; \
		base_file=$$(basename $$file); \
		output_dir=$(ABI_OUTPUT_DIR)/$${base_file%.*}; \
		output_file=$$output_dir/$${base_file%.*}.go; \
		mkdir -p $$output_dir; \
		echo "Output file: $$output_file"; \
		abigen --abi "$$file" --pkg $${base_file%.*} --out $$output_file; \
	done


gen: swagger | abi

REDIS_PORT := 6379
REDIS_USER := seaport
REDIS_PASSWORD := seaport
REDIS_CONTAINER_NAME := seaport-redis

run:
	docker run --rm -d -p $(REDIS_PORT):$(REDIS_PORT) --name $(REDIS_CONTAINER_NAME) -e REDIS_PASSWORD=$(REDIS_PASSWORD) redis
	sleep 3
	docker run --rm -it -v $(CURDIR)/cmd/main:/app -w /app --network host -e REDIS_ADDR=127.0.0.1:$(REDIS_PORT) -e REDIS_PASSWORD=$(REDIS_PASSWORD) -e REDIS_USER=$(REDIS_USER) golang:1.16 go run main.go
	docker stop $(REDIS_CONTAINER_NAME)

.PHONY: clean

clean:
	rm -rf $(ABI_OUTPUT_DIR) $(SWAGGER_OUTPUT)
