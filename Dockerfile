# Build stage
FROM --platform=linux/amd64 node:18-alpine as builder

WORKDIR /app

# Install build dependencies for bcrypt
RUN apk add --no-cache python3 make g++

# Copy package files for frontend
COPY package*.json ./
RUN npm install
RUN npm rebuild bcrypt --build-from-source

# Copy the rest of the frontend files
COPY . .

# Build frontend
RUN npm run build

# Production stage
FROM --platform=linux/amd64 node:18-alpine
WORKDIR /app

# Install build dependencies for bcrypt
RUN apk add --no-cache python3 make g++

# Copy backend files first
COPY backend ./backend/

# Install backend dependencies
WORKDIR /app/backend
RUN npm install --production
RUN npm rebuild bcrypt --build-from-source

# Copy built frontend from builder stage
COPY --from=builder /app/dist ../dist

# Add security measures
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

EXPOSE 3000
CMD ["node", "server.js"]