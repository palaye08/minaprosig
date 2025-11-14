# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copier les fichiers de configuration
COPY package*.json ./

# Installer avec retry pour éviter les timeouts
RUN npm config set fetch-timeout 600000 && \
    npm config set fetch-retry-maxtimeout 600000 && \
    npm install --legacy-peer-deps || \
    npm install --legacy-peer-deps || \
    npm install --legacy-peer-deps

# Copier le code source
COPY . .

# Construire l'application
RUN npm run build

# Stage 2: Runtime
FROM node:20-alpine

WORKDIR /app

# Installer Express version 4.18.2 (version stable testée)
RUN npm install express@4.18.2

# Copier les fichiers buildés
COPY --from=builder /app/dist ./dist

# Copier server.js
COPY server.js ./

EXPOSE 3000

CMD ["node", "server.js"]