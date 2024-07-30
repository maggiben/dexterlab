# Use the official Node.js image.
# Use the LTS version for stability.
FROM node:latest

# Set the working directory.
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory.
COPY package.json ./

# Install dependencies.
RUN npm install

# Copy the rest of the application code to the working directory.
COPY . .

# Build the Next.js app.
RUN npm run build

# Expose the port the app runs on.
EXPOSE 3000

CMD ["npm", "run", "start"]
