FROM node:lts-alpine

WORKDIR /app

COPY . /app

RUN npm i -g pnpm && pnpm install


RUN pnpm run build

COPY entrypoint.sh /app

RUN chmod +x /app/entrypoint.sh

ENTRYPOINT [ "/app/entrypoint.sh" ]