# FROM node:21-alpine3.18 as vite-app

# WORKDIR /app
# COPY . .

# RUN ["npm", "i"]
# RUN ["npm", "i", "typescript"]
# RUN ["npm", "run", "build"]

FROM nginx:alpine

WORKDIR /usr/share/nginx/

RUN rm -rf html
RUN mkdir html

WORKDIR /

COPY ./nginx/nginx.conf /etc/nginx
COPY /dist /usr/share/nginx/html

EXPOSE 5501

ENTRYPOINT ["nginx", "-g", "daemon off;"]