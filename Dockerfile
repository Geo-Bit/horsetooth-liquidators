# Frontend builder stage
FROM node:18-alpine AS builder
WORKDIR /app

# Install build dependencies
RUN apk add --no-cache python3 make g++

# Copy frontend package files
COPY package*.json ./
RUN npm ci

# Copy frontend source
COPY . .

# Build stage for bcrypt
FROM --platform=linux/amd64 node:18-alpine AS bcrypt-builder
WORKDIR /build
RUN apk add --no-cache python3 make g++ gcc musl-dev
COPY backend/package*.json ./
RUN npm ci
RUN npm rebuild bcrypt --build-from-source

# Production stage (renamed from backend to production)
FROM --platform=linux/amd64 node:18-alpine AS production
WORKDIR /app/backend

# Copy package files and install dependencies
COPY backend/package*.json ./
RUN npm ci --only=production

# Copy bcrypt from builder
COPY --from=bcrypt-builder /build/node_modules/bcrypt ./node_modules/bcrypt

# Copy application files
COPY backend/ .

EXPOSE 3000
CMD ["node", "server.js"]
