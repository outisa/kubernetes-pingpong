FROM node:alpine

WORKDIR app
COPY . .

RUN npm ci && mkdir pongs && cd pongs && touch pongs.txt && cd ..

EXPOSE 8080

CMD ["npm", "start"]