FROM dockerhub1.beget.com/library/node:21-alpine3.18

USER root

WORKDIR /app/packages/package.trpc-routes
COPY . .

RUN ["npm", "i"]

WORKDIR /app/backend
COPY . .

RUN ["npm", "i"]

EXPOSE 5001

ENTRYPOINT ["npm", "run", "dev"]