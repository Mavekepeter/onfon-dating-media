# Step 1: Start with Node 20 (supports Web Crypto API needed by Vite)
FROM node:20-alpine AS build

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy dependency files
COPY package.json package-lock.json ./

# Step 4: Install dependencies
RUN npm install

COPY . .

ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL

# Step 7: Build the app for production
RUN npm run build

# Step 8: Use lightweight Nginx to serve static files
FROM nginx:alpine

# Step 9: Copy build output to Nginx public folder
COPY --from=build /app/dist /usr/share/nginx/html

# Step 10: Expose port 80
EXPOSE 80

# Step 11: Start Nginx
CMD ["nginx", "-g", "daemon off;"]
