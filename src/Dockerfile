FROM node:14.17.1-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies 
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

CMD ["node", "server.js"]