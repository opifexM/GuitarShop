FROM node:22.2-alpine3.20
WORKDIR /opt/guitar-shop

COPY package.json ./
COPY package-lock.json ./

COPY frontend/package.json frontend/
COPY shared/package.json shared/

RUN npm install --omit=dev

COPY frontend/dist frontend/dist/

FROM nginx:alpine
COPY --from=0 /opt/guitar-shop/frontend/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
