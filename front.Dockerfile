FROM node:16 as builder
WORKDIR /
RUN npm i pnpm serve --global --force 
COPY ./frontend/package*.json ./
COPY ./frontend ./app
RUN pnpm install
RUN pnpm run build
CMD ["serve", "-s", "./app/build"]