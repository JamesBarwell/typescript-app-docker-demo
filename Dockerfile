FROM node:12.13.0-alpine AS build

ENV NODE_ENV production

WORKDIR /tmp
COPY app .
RUN npm install --ignore-scripts && \
    npm run build


FROM node:12.13.0-alpine

ENV NODE_ENV production

EXPOSE 80

WORKDIR /home/node/app
COPY --from=build /tmp/node_modules ./node_modules
COPY --from=build /tmp/dist .

USER node
CMD ["node", "index.js"]
