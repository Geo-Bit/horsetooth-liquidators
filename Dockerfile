# Build stage
FROM node:18-alpine as builder

WORKDIR /app

# Install build dependencies
RUN apk add --no-cache python3 make g++

# Copy package files first
COPY package*.json ./
COPY backend/package*.json ./backend/

# Install all dependencies
RUN npm install
WORKDIR /app/backend
RUN npm install
WORKDIR /app

# Copy all source files
COPY . .

# Build the frontend
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Install PostgreSQL client
RUN apk add --no-cache postgresql-client

# Copy backend files and built frontend
COPY --from=builder /app/backend ./backend
COPY --from=builder /app/dist ./dist

# Copy wait-for-it script
COPY backend/scripts/wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

# Install production dependencies and rebuild bcrypt
WORKDIR /app/backend
RUN apk add --no-cache python3 make g++ \
    && npm install --production \
    && npm rebuild bcrypt --build-from-source \
    && apk del python3 make g++

# Move back to app directory
WORKDIR /app

# Expose port
EXPOSE 3000

# Start the application with wait-for-it
CMD ["/wait-for-it.sh", "db", "node", "backend/server.js"]