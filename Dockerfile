# Build stage
FROM node:18-alpine as builder

WORKDIR /app

# Copy package files for frontend
COPY package*.json ./
RUN npm install

# Copy the rest of the frontend files
COPY . .

# Build frontend
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app

# Copy backend files first
COPY backend ./backend/

# Install backend dependencies
WORKDIR /app/backend
RUN npm install --production

# Copy built frontend from builder stage
COPY --from=builder /app/dist ../dist

# Add security measures
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

EXPOSE 3000
CMD ["node", "server.js"] 