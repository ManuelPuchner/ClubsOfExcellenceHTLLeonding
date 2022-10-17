FROM node:lts-alpine

ENV NODE_ENV production
ENV NPM_CONFIG_LOGLEVEL warn

RUN mkdir -p /home/node/app/ && chown -R node:node /home/node/app/

WORKDIR /home/node/app/

COPY package.json package.json
COPY pnpm-lock.yaml pnpm-lock.yaml

USER node

RUN pnpm install --production
RUN pnpm prisma generate

COPY --chown=node:node .next .next
COPY --chown=node:node public public

EXPOSE 3000

CMD ["pnpm", "start"]