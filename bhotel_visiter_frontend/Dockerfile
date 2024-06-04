FROM dockerhub1.beget.com/library/node:21-alpine3.18 as vite-app

USER root

WORKDIR /app/packages/package.trpc-routes
COPY . .

RUN ["npm", "i"]

WORKDIR /app/frontend
COPY . .

RUN ["npm", "i"]
RUN ["npm", "run", "build"]

FROM dockerhub1.beget.com/library/nginx:alpine

WORKDIR /usr/share/nginx/

RUN rm -rf html
RUN mkdir html

WORKDIR /

COPY ./nginx/nginx.conf /etc/nginx
COPY --chmod=765 --from=vite-app ./app/frontend/dist /usr/share/nginx/html

EXPOSE 5502

ENTRYPOINT ["nginx", "-g", "daemon off;"]