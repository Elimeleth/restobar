FROM node:14 as builder
WORKDIR /app
COPY ./package.json ./
RUN npm install --legacy-peer-deps
RUN npm run build
COPY ./build ./build

RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "build"]
