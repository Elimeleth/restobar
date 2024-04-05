FROM node:16
# RUN apk add --no-cache bash
WORKDIR /
RUN npm i pnpm --global --force
COPY ./backend/package*.json ./
COPY ./backend ./
RUN pnpm install

CMD ["npm","run","dev"]