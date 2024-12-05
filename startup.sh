#! /bin/bash

# Install Docker Compose
curl -L "https://github.com/docker/compose/releases/download/v2.23.3/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Create app directory
mkdir -p /opt/horsetooth-liquidators
cd /opt/horsetooth-liquidators

# Copy your application files (you'll need to upload these separately)
# For now, we'll use environment variables from a file
cat > .env << EOL
NODE_ENV=production
DB_HOST=db
DB_USER=postgres
DB_PASSWORD=PhgV3_jT!Th3@Y!GFg6
DB_NAME=horsetooth_liquidators
JWT_SECRET=$(openssl rand -hex 64)
CORS_ORIGIN=http://YOUR_VM_IP:3000
EOL

# Start the application
docker-compose up -d

# Enable automatic container restart
docker update --restart=unless-stopped $(docker ps -q) 