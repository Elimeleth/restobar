FROM node:16
# RUN apk add --no-cache bash
WORKDIR /app
COPY . .
RUN npm install
COPY . .
CMD ["npm","run","dev"]