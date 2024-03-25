FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci && npm cache clean --force

COPY . .

CMD npm install yaml && npx prisma generate && npx prisma migrate deploy && npm start