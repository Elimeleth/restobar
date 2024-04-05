FROM node:16 as builder
WORKDIR /app
RUN npm i pnpm --global --force
COPY ./frontend/package*.json ./
COPY ./frontend ./
RUN pnpm install
RUN pnpm run build

RUN pnpm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "build"]
