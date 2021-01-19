FROM node:alpine

WORKDIR app
COPY . .

RUN npm ci && mkdir files && cd files && touch pongs.txt && cd ..

EXPOSE 3002

CMD ["npm", "start"]