# docker build -f Dockerfile . -t storaji-ui:1.0.0
# docker run --network="host" storaji-ui:1.0.0

FROM node:8.0.0-alpine

RUN apk add --update bzip2

RUN apk add graphicsmagick

RUN npm install --global yarn

COPY . /src

WORKDIR /src

RUN yarn install

CMD npm run ng:serve
