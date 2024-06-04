FROM dockerhub1.beget.com/library/node:21-alpine3.18

WORKDIR /app
COPY . .

RUN ["npm", "i"]

EXPOSE 5001

ENTRYPOINT ["npm", "run", "prod"]