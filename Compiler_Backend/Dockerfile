FROM node:18.18.2-alpine

# Install C++
RUN apk add --no-cache g++

# Install Python
RUN apk add --no-cache python3

# Install Java
RUN apk add --no-cache openjdk11

# Set the working directory
WORKDIR /app

# Copy the Node.js application files
COPY . .

# Install Node.js dependencies
RUN npm install

# Expose port 5000
EXPOSE 5000

# Run the Node.js application
CMD ["node", "index.js"]