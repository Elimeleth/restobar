FROM node:16
# RUN apk add --no-cache bash
WORKDIR /app
COPY ./package.json ./
RUN npm install -g pnpm
RUN pnpm install
COPY . .
CMD ["pnpm","run","dev"]