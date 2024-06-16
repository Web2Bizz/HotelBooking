FROM node:21-alpine3.18

WORKDIR /app
COPY . .

RUN ["npm", "i"]

EXPOSE 7887

ENTRYPOINT ["npx", "json-server", "-p 7887", "-h 0.0.0.0", "db.json"]