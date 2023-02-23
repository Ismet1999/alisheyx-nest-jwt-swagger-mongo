FROM node:18

WORKDIR /app

COPY package.json yarn.lock /app/

RUN yarn install

COPY . /app

EXPOSE 3001

RUN yarn build

# RUN yarn run migration:run

CMD ["yarn", "start:prod"]