FROM node:21-alpine3.18

WORKDIR /

COPY . ./app

WORKDIR /app

RUN ["npm", "i"]

ENTRYPOINT ["node", "./index.js"]