FROM node:21-alpine3.18 as vite-app

USER root

WORKDIR /app/packages/package.trpc-routes
COPY ./packages/package.trpc-routes .

RUN npm i \
    && npm i -g typescript \
    && npm run build

WORKDIR /app/frontend
COPY ./bhotel_visiter_console/package.json .

RUN npm i

COPY ./bhotel_visiter_console .

RUN npm run build

FROM nginx:alpine

WORKDIR /usr/share/nginx/

RUN rm -rf html && mkdir html

WORKDIR /

COPY ./bhotel_visiter_console/nginx/nginx.conf /etc/nginx
COPY --chmod=765 --from=vite-app ./app/frontend/dist /usr/share/nginx/html

EXPOSE 5501

ENTRYPOINT ["nginx", "-g", "daemon off;"]