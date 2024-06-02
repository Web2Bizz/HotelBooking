FROM node:21-alpine3.18 as packages
ENV NODE_ENV=production

USER root

WORKDIR /app/packages/package.trpc-routes
COPY ./packages/package.trpc-routes .

RUN ["npm", "i"]
RUN ["npm", "i", "-g", "typescript"]
RUN ["npm", "run", "build"]

FROM node as vite-app
ENV NODE_ENV=production

WORKDIR /app/console
COPY ./bhotel_visiter_console .

RUN ["npm", "i"]
RUN ["npm", "i", "-g", "typescript"]
RUN ["npm", "run", "build"]

FROM nginx:alpine

WORKDIR /usr/share/nginx/

RUN rm -rf html
RUN mkdir html

WORKDIR /

COPY ./bhotel_visiter_console/nginx/nginx.conf /etc/nginx
COPY --chmod=765 --from=vite-app ./app/console/dist /usr/share/nginx/html

EXPOSE 5501

ENTRYPOINT ["nginx", "-g", "daemon off;"]