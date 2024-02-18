FROM node:18.18.2-alpine
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY .. /app/
EXPOSE 3000
CMD ["node","index.js"]