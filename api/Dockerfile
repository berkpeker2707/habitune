FROM node:18.16.0-alpine

ENV PORT=1111

ENV MONGODB_URI=mongodb+srv://berkpeker94:OspIu8q0OzZgxini@cluster0.fvqrzko.mongodb.net/habitapp_db?retryWrites=true&w=majority

ENV GOOGLE_CLIENT_ID=1018578640461-408uqjlu20adjmfobm3ibajmfh1j6kkt.apps.googleusercontent.com
ENV GOOGLE_CLIENT_SECRET=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
ENV GOOGLE_CALLBACK=http://localhost:1111/api/user/google/callback

ENV JWT_SECRET=lglIVZN2vAclmzCkAkBCN3hBDBrHmDrWlLq1rh47Ck4ECDyBAY

COPY . /habituneContainer/

WORKDIR /habituneContainer/

RUN npm install

RUN npm run build

WORKDIR /habituneContainer/dist

CMD [ "node", "server.js" ]