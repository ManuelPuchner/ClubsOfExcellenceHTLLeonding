FROM node:lts-alpine

ENV NODE_ENV production
ENV NPM_CONFIG_LOGLEVEL warn

RUN mkdir -p /home/node/app/ && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package.json package-lock.json
COPY package-lock.json package-lock.json

USER node

RUN npm install --production

COPY --chown=node:node .next .next
COPY --chown=node:node public public

EXPOSE 3000

CMD ["npm", "start"]