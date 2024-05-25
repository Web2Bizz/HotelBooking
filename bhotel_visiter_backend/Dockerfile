FROM node:21-alpine3.18 as vite-app

WORKDIR /app/packages/package.trpc-routes
RUN ["npm", "i"]
RUN ["tsc"]

WORKDIR /app/backend
COPY . .

RUN ["npm", "i"]

EXPOSE 5001

ENTRYPOINT ["npm", "run", "dev"]