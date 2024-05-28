FROM node:21-alpine3.18

WORKDIR /app/backend
COPY . .

RUN ["npm", "i"]

EXPOSE 5001

ENTRYPOINT ["npm", "run", "dev"]