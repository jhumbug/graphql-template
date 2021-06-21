### DEVELOPMENT PHASE ###

FROM node:14-alpine AS development

ARG PORT=4000
EXPOSE $PORT 9229

RUN set -ex; \
    apk add --no-cache alpine-sdk bash procps && \
    mkdir -p /usr/local/gql/app/dist && \
    chown -R node:node /usr/local/gql

WORKDIR /usr/local/gql
USER node
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --ignore-optional

ENV NODE_ENV=development \
    PATH=/usr/local/gql/node_modules/.bin:$PATH \
    PORT=$PORT

WORKDIR /usr/local/gql/app
COPY . .
CMD [ "nodemon", "--inspect=0.0.0.0:9229", "-L", "src/index.ts" ]

### BUILD PHASE ###

FROM development AS build

USER node
RUN yarn build && \
    yarn --cwd /usr/local/gql install --frozen-lockfile --production --ignore-optional --ignore-scripts --prefer-offline

### PRODUCTION PHASE ###

FROM node:14-alpine

ARG PORT=4000
EXPOSE $PORT

RUN mkdir -p /usr/local/gql && \
    chown node:node /usr/local/gql

WORKDIR /usr/local/gql
USER node
COPY --from=build --chown=node:node /usr/local/gql/app/dist dist/
COPY --from=build --chown=node:node /usr/local/gql/node_modules node_modules/
COPY package.json .

ENV NODE_ENV=production \
    PORT=$PORT

CMD [ "node", "dist/index.js" ]
