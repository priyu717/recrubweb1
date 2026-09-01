FROM node:20-alpine AS base

# Install OpenSSL + required libs for Prisma
RUN apk update && apk add --no-cache openssl openssl-dev libc6-compat gcompat openssl1.1-compat

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

COPY . .

RUN npx prisma generate
RUN npm run build

FROM node:20-alpine AS production
WORKDIR /app

COPY --from=base /app/dist ./dist
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/prisma ./prisma
COPY --from=base /app/package.json ./package.json

EXPOSE 5000
CMD ["node", "dist/server.js"]
