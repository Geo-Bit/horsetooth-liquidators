# Build stage
FROM node:18-alpine3.18 as builder

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

# Development stage for frontend
FROM node:18-alpine3.18 as frontend-dev
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]

# Production stage
FROM node:18-alpine as production

WORKDIR /app

# Install PostgreSQL client only
RUN apk add --no-cache postgresql-client

# Copy package files first
COPY --from=builder /app/backend/package*.json ./backend/

# Install production dependencies
WORKDIR /app/backend
RUN apk add --no-cache python3 make g++ \
    && npm ci --only=production \
    && npm rebuild bcrypt --build-from-source \
    && apk del python3 make g++

# Now copy the rest of the backend files and frontend
WORKDIR /app
COPY --from=builder /app/backend ./backend
COPY --from=builder /app/dist ./dist

# Create uploads directory with node user permissions
RUN mkdir -p /app/backend/uploads && \
    chown -R node:node /app/backend/uploads && \
    chmod 755 /app/backend/uploads

# Explicitly expose port 8080
EXPOSE 8080

# Remove the wait-for-it.sh dependency for Cloud Run
CMD ["node", "backend/server.js"]