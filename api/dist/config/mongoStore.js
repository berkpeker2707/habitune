"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
require("dotenv").config();
const mongoStore = () => {
    const store = new MongoDBStore({
        uri: process.env.MONGODB_URI,
        collection: "sessions",
        expires: 1000 * 60 * 60 * 24 * 7,
        autoRemove: "native", //automatically remove expired sessions
    });
    store.on("error", function (error) {
        console.log(`MongoDBStore Error: ${error}`);
    });
    return store;
};
exports.default = mongoStore;
