FROM node:16-alpine

WORKDIR /home/app

COPY package*.json .

RUN npm ci && npm cache clean --force

COPY . .

RUN npm install yaml

CMD npx prisma generate && npx prisma migrate dev --name init && npm start