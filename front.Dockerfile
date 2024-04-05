FROM node:16 as builder
WORKDIR /
COPY ./frontend/package*.json ./
COPY ./frontend ./
RUN pnpm install
RUN pnpm run build

FROM node:14 as runner
WORKDIR /
RUN npm i pnpm serve --global --force 
COPY --from=builder /build ./build
CMD ["serve", "-s", "build"]