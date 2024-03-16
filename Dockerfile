FROM node:20.11-alpine

COPY . .

WORKDIR .

RUN npm install

ENV NODE_ENV=production

EXPOSE 4000

CMD ["npm", "run", "start"]
