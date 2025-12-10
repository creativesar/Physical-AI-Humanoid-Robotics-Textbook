# Stage 1: Build the Docusaurus site
FROM node:20-alpine as build

WORKDIR /app

# Copy package files
COPY package.json yarn.lock* ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the files
COPY . .

# Build the site
RUN yarn build

# Stage 2: Serve the built site with nginx
FROM nginx:alpine

# Copy the build output to replace the default nginx page
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom nginx configuration (optional)
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

# The nginx image has a default command, so we don't need to specify one here