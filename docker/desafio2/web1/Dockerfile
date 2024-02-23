FROM node:alpine

WORKDIR /usr/src/app

COPY ./package.json ./
RUN npm i
COPY ./server.js ./

EXPOSE 3000

CMD ["npm","start"]
