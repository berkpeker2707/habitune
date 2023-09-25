FROM node:18.16.0-alpine

ENV PORT=1111

ENV MONGODB_URI=
ENV GOOGLE_CLIENT_ID=
ENV GOOGLE_CLIENT_SECRET=
ENV GOOGLE_CALLBACK=

ENV JWT_SECRET=

COPY . /habituneContainer/

WORKDIR /habituneContainer/

RUN npm install

RUN npm run build

WORKDIR /habituneContainer/dist

CMD [ "node", "server.js" ]