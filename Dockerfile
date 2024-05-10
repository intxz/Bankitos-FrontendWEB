# Stage 1: Build React app
FROM node:21-alpine as builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy static build files from the previous stage
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Default command to run Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
