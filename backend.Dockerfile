FROM node:21-alpine3.18

USER root

WORKDIR /app/packages/package.trpc-routes
COPY ./packages/package.trpc-routes .

RUN npm i \
    && npm i -g typescript \
    && npm run build

WORKDIR /app/backend
COPY ./bhotel_visiter_backend/package.json .

RUN npm i

COPY ./bhotel_visiter_backend .

EXPOSE 5001

ENTRYPOINT ["npm", "run", "dev"]