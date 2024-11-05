FROM node:20

WORKDIR /app

COPY package*.json ./

# Installation des dépendances Node.js
RUN npm install -g @nestjs/cli
RUN npm install

# Copier les fichiers Prisma
COPY prisma ./prisma/

# Générer le client Prisma
RUN npx prisma generate

COPY . .

EXPOSE 3001

CMD ["npm", "run", "start:dev"]