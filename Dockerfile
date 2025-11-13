# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copier les fichiers de configuration
COPY package*.json ./

# Installer les dépendances
RUN npm ci

# Copier le code source
COPY . .

# Construire l'application Angular en mode production
RUN npm run build

# Stage 2: Runtime
FROM node:20-alpine

WORKDIR /app

# Installer Express
RUN npm install express

# Copier les fichiers nécessaires depuis l'étape de build
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Installer les dépendances de production uniquement
RUN npm ci --only=production

# Copier le fichier server.js
COPY server.js ./

EXPOSE 3000

CMD ["node", "server.js"]