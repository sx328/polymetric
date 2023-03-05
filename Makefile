# Build variables
BINARY_NAME=main
DOCKER_IMAGE_NAME=nft-app
DOCKER_CONTAINER_NAME=nft-app

# Directories
FRONTEND_DIR=frontend
BACKEND_DIR=backend

# Frontend variables
FRONTEND_PORT=3030

# Build backend binary
build-backend:
	cd $(BACKEND_DIR) && \
	CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o $(BINARY_NAME) ./cmd/main/main.go

# Build frontend
build-frontend:
	cd $(FRONTEND_DIR) && \
	npm install && \
	npm run build

# Build Docker image
build-image:
	docker build -t $(DOCKER_IMAGE_NAME) .

# Run Docker container
run-container:
	docker run -p $(FRONTEND_PORT):$(FRONTEND_PORT) -p 8080:8080 --name $(DOCKER_CONTAINER_NAME) $(DOCKER_IMAGE_NAME)

# Stop and remove Docker container
stop-container:
	docker stop $(DOCKER_CONTAINER_NAME) && docker rm $(DOCKER_CONTAINER_NAME)

# Clean build artifacts
clean:
	cd $(BACKEND_DIR) && rm $(BINARY_NAME)
	cd $(FRONTEND_DIR) && rm -rf build

# Build backend, frontend, and Docker image
build: build-backend build-frontend build-image

# Build and run Docker container
run: build run-container

# Stop Docker container
stop: stop-container

# Rebuild and run Docker container
rebuild: stop build run-container
