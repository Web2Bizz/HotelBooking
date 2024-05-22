FROM node

WORKDIR /app
COPY . .

RUN ["npm", "i"]

EXPOSE 5001

ENTRYPOINT ["npm", "run", "prod"]