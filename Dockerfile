FROM node:16.16.0-slim


WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .


EXPOSE 8080


CMD ["npm", "start"]

