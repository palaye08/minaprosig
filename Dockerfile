# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copier les fichiers de configuration
COPY package*.json ./

# Installer TOUTES les dépendances (y compris express)
RUN npm ci

# Copier le code source
COPY . .

# Construire l'application Angular en mode production
# Désactiver l'optimisation des fonts pour éviter les erreurs réseau
RUN npm run build -- --configuration production

# Stage 2: Runtime
FROM node:20-alpine

WORKDIR /app

# Copier package.json depuis le builder
COPY --from=builder /app/package*.json ./

# Installer les dépendances de production (y compris express)
RUN npm ci --only=production

# Copier les fichiers buildés
COPY --from=builder /app/dist ./dist

# Copier le fichier server.js
COPY server.js ./

EXPOSE 3000

CMD ["node", "server.js"]