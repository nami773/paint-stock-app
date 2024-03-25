FROM node:17-alpine

WORKDIR /app/frontend/

COPY package*.json /app/frontend/

COPY . /app/frontend/
EXPOSE 3000
CMD ["npm", "start"]