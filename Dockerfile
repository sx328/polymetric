# Use the official Golang image as the base image
FROM golang:1.16

# Set the working directory to /app
WORKDIR /app

# Copy the source code from the current directory to the container's working directory
COPY . .

# Build the Go application
RUN go build -o app ./cmd/main

# Expose port 8080 for the application to listen on
EXPOSE 8080

# Run the Go application
CMD ["./app"]
