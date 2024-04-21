FROM node as vite-app

WORKDIR /app
COPY . .

RUN ["npm", "i"]

EXPOSE 5173

ENTRYPOINT ["npm", "run", "dev"]