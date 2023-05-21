# Use the official Node.js 14 image as the base image
FROM node:17.1.0

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port on which the Nest.js app will run
EXPOSE 3000

# Start the Nest.js application
CMD ["npm", "run", "start:prod"]
