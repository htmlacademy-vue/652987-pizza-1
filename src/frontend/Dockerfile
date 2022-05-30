FROM node:16-alpine

WORKDIR /frontend

COPY package.json package-lock.json ./

RUN apk --no-cache --virtual build-dependencies add \
        python3 \
        make \
        g++ \
  && npm install \
  && npm install @vue/cli@4.5.8 -g \
  && apk del build-dependencies

COPY . .

CMD ["npm", "run", "serve"]
