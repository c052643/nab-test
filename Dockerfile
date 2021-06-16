FROM node:14.15-alpine3.13

RUN mkdir /app/
WORKDIR /app/

COPY . .

RUN yarn install
RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]