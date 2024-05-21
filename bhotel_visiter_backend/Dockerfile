FROM node:21-alpine3.18 as vite-app

WORKDIR /app
COPY . .

RUN ["npm", "i"]

EXPOSE 5001

ENTRYPOINT ["npm", "run", "dev"]