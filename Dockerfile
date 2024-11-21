# Step 1: Use Node.js as the base image for building the app
FROM node:18-alpine AS builder

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the entire project to the container
COPY . .

# Step 6: Build the app for production
RUN npm run build

# Step 7: Use a lightweight Nginx image to serve the built app
FROM nginx:alpine

# Step 8: Copy the build folder from the builder step to the Nginx folder
COPY --from=builder /app/build /usr/share/nginx/html

# Step 9: Expose port 80 to make the app accessible
EXPOSE 80

# Step 10: Start Nginx
CMD ["nginx", "-g", "daemon off;"]
