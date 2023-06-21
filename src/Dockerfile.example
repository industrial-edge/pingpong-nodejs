FROM node:14.17.1-alpine

# Create app directory
WORKDIR /usr/src/app

# Add source files to filesystem of container
COPY package*.json ./

# Install app dependencies (all modules listed in package.json)
RUN npm install

# Bundle app source
COPY . .

#Run application
CMD ["node", "server.js"]