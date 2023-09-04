FROM node:16-alpine3.14 AS builder


ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json","package-lock.json*", "./"]

RUN npm install --production

COPY . .

CMD ["node", "index.js"]