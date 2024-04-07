FROM node:16 as builder
WORKDIR /
ARG CACHEBUST=1
RUN npm i serve pnpm --global --force
COPY ./frontend/package*.json ./
RUN pnpm install
COPY ./frontend ./
RUN pnpm run build
CMD ["serve", "-s", "build"]