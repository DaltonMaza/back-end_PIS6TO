FROM node:20-alpine

WORKDIR /app

COPY package.json .

RUN npm install 

COPY . .

EXPOSE 3000 1884

CMD [ "npm","run","start" ]