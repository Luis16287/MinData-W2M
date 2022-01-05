# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:latest as build

# Set the working directory
WORKDIR /usr/local/app

# Add the source code to app
COPY ./ /usr/local/app/

# Install all the dependencies
RUN npm install --force

#Install the mock server
RUN npm install -g --silent json-server

# Generate the build of the application
RUN npm run build

## Run the mock server with a delay of 2500 ms to see the spinner
# RUN  json-server --watch heroes.json -d 2500

# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:latest

# Copy the build output to replace the default nginx contents.
COPY --from=build /usr/local/app/dist/MinData-W2M /usr/share/nginx/html

# Expose port 80
EXPOSE 80

CMD ["npm", "start", "json-server", "-w", "-d 2500" ,"./heroes.json", "-p", "3001"]

##############  Second Aproach  ###################

# # Stage 1: Compile and Build angular codebase

# # Use official node image as the base image
# FROM node:latest as build

# Run mkdir -p /app

# # Set the working directory
# WORKDIR /app

# # Add the source code to app
# COPY package.json /app

# # Install all the dependencies
# RUN npm install --force

# #Install the mock server
# RUN npm install -g --silent json-server

# Copy . /app

# # Generate the build of the application
# RUN npm run build

# ## Run the mock server with a delay of 2500 ms to see the spinner
# # RUN  json-server --watch heroes.json -d 2500

# # Stage 2: Serve app with nginx server

# # Use official nginx image as the base image
# FROM nginx:latest

# # Copy the build output to replace the default nginx contents.
# COPY --from=build app/dist/MinData-W2M /usr/share/nginx/html

# # Expose port 80
# EXPOSE 80

# CMD ["npm", "start", "json-server", "-w", "-d 2500" ,"./heroes.json", "-p", "3001"]