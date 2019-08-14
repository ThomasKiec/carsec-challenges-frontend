FROM node:11

WORKDIR /user/src/app/carsec-challenges-frontend

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn build