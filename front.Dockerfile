FROM node:16 as builder
WORKDIR /
ARG CACHEBUST=1
RUN npm i pnpm --global --force
COPY ./frontend/package*.json ./
COPY ./frontend ./
RUN pnpm install
RUN pnpm run build

FROM node:14 as runner
WORKDIR /
ARG CACHEBUST=1
RUN npm i serve --global --force 
COPY --from=builder /build ./build
CMD ["serve", "-s", "build"]