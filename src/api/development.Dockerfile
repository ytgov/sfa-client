FROM node:18.17.0-alpine3.17

# See https://pptr.dev/chromium-support for supported chrome to puppeteer version.
RUN apk add --no-cache \
        chromium=112.0.5615.165-r0

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

RUN mkdir -p /usr/src/api
WORKDIR /usr/src/api

COPY package*.json ./
RUN npm install

COPY . .

RUN chmod +x ./bin/boot-app.sh

CMD ["./bin/boot-app.sh"]
