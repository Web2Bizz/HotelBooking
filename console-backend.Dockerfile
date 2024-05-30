FROM node:21-alpine3.18

USER root

WORKDIR /app/packages/package.trpc-routes
COPY ./packages/package.trpc-routes .

RUN ["npm", "i"]
RUN ["npm", "i", "-g", "typescript"]
RUN ["npm", "run", "build"]

WORKDIR /app/backend
COPY ./bhotel_visiter_backend .

RUN ["npm", "i"]

EXPOSE 5001

ENTRYPOINT ["npm", "run", "dev"]