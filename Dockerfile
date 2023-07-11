# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY server/package*.json ./

# Install NestJS dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY server .


# Expose the port that your NestJS API will be running on
EXPOSE 3000

# Copy the entrypoint shell script
COPY entrypoint.sh .

# Set the entrypoint to run the shell script
ENTRYPOINT ["sh", "/app/entrypoint.sh"]

