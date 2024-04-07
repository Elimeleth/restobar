FROM node:16 as builder
WORKDIR /
ARG CACHEBUST=1
RUN npm i serve pnpm --global --force
RUN pnpm install
RUN pnpm run build
COPY ./frontend/package*.json ./
COPY ./frontend ./
CMD ["serve", "-s", "build"]