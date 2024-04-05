FROM node:16 as builder
WORKDIR /
RUN npm i pnpm serve --global --force 
COPY ./frontend/package*.json .
COPY ./frontend .
RUN pnpm install
RUN pnpm run build
CMD ["serve", "-s", "build"]