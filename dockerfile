FROM node:12

RUN mkdir -p /src/

WORKDIR /src/

COPY package.json ./

COPY yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 5000

CMD [ "yarn", "start" ]
