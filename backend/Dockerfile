FROM node:22.2-alpine3.20
WORKDIR /opt/guitar-shop

COPY package.json ./
COPY package-lock.json ./

COPY backend/package.json backend/
COPY shared/package.json shared/

RUN npm install --omit=dev

COPY backend/dist backend/dist/

WORKDIR /opt/guitar-shop/backend/dist/backend/src
CMD ["node", "./main.js"]
