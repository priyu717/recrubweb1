FROM node:20-slim AS base

# Install OpenSSL 3 (required for Prisma on Node 20)
RUN apt-get update -y && apt-get install -y openssl

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

COPY . .

RUN npx prisma generate
RUN npm run build

FROM node:20-slim AS production

# Install OpenSSL 3 again in production image
RUN apt-get update -y && apt-get install -y openssl

WORKDIR /app

COPY --from=base /app/dist ./dist
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/prisma ./prisma
COPY --from=base /app/package.json ./package.json

EXPOSE 5000
CMD ["node", "dist/server.js"]
