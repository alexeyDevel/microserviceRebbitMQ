FROM node:14-alpine

WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm install
RUN apk update && apk add curl wget
# Copy the rest of the code
COPY . .

CMD ["npm", "start"]
