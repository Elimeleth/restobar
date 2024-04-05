FROM node:16
# RUN apk add --no-cache bash
WORKDIR /app
COPY ./backend/package*.json ./
COPY ./backend ./
RUN npm install

CMD ["npm","run","dev"]