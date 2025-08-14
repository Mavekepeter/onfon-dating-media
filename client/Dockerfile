# Step 1: Start with Node 20 (supports Web Crypto API needed by Vite)
FROM node:20-alpine AS build

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy dependency files
COPY package.json ./
COPY package-lock.json ./


# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the source code
COPY . .

# Step 6: Build the app for production
RUN npm run build

# Step 7: Use lightweight Nginx to serve static files
FROM nginx:alpine

# Step 8: Copy build output to Nginx public folder
COPY --from=build /app/build /usr/share/nginx/html

# Step 9: Expose port 80
EXPOSE 80

# Step 10: Start Nginx
CMD ["nginx", "-g", "daemon off;"]
