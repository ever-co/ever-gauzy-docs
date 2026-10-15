FROM node:26-alpine

WORKDIR /app/website

EXPOSE 3000 35729
COPY ./docs /app/docs
COPY ./website /app/website
# Node 25+ no longer bundles corepack (it provides yarn here).
RUN npm install -g corepack@0.36.0 && corepack enable
RUN yarn install

CMD ["yarn", "start"]
