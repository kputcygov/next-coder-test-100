FROM node:16.15.1-alpine3.14
WORKDIR /app
COPY . /app
RUN npm install
EXPOSE 3000
ENTRYPOINT ["npm", "start"]
