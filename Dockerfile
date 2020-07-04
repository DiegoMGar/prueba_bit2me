FROM node:14.5
WORKDIR /usr/src/app
COPY package.json .
CMD mkdir src
COPY src src
RUN yarn install --production
EXPOSE 3000
CMD yarn start
