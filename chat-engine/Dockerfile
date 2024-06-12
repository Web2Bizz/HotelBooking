FROM node:21-alpine3.18 as build

USER root

WORKDIR /app/chat-engine/source
COPY . ./
RUN npm i && \
    npm i typescript -g
RUN npm run build

FROM node:21-alpine3.18 as prod

WORKDIR /app/chat-engine
COPY package.json package-lock.json ./
RUN npm ci --only=production
COPY --from=build /app/chat-engine/source/dist ./dist

EXPOSE 7777

WORKDIR /app/chat-engine/dist

ENTRYPOINT [ "node", "./index.js" ]