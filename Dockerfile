FROM node:alpine

WORKDIR app
COPY . .

RUN npm ci

EXPOSE 3002

CMD ["npm", "start"]