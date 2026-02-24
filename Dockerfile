# Create a container in which to build the typescript app.
FROM node:lts as builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

# Create the actual production container which only contains the built
# javascript.
FROM node:lts-slim

ENV NODE_ENV production

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 4000

HEALTHCHECK --interval=1m --timeout=3s \
  CMD curl -f http://localhost:4000/api/v1/healthz || exit 1

RUN chown -R node /usr/src/app
USER node

CMD [ "node", "." ]
