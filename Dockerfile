#build stage
FROM node:lts-alpine as build-stage
#copy contents
WORKDIR /app
COPY . /app/
#set environment vars and build
ARG APP_NODE_ENV=production
RUN npm install
RUN npm run build
#expose port and run start
EXPOSE 3001
CMD ["npm", "run", "start"]