const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
require("dotenv").config();

const mongoStore = () => {
  try {
    const store = new MongoDBStore({
      uri: process.env.MONGODB_URI,
      collection: "sessions", //collection to store sessions in
      expires: 1000 * 60 * 60 * 24 * 7, //session expiration time (7 days)
      autoRemove: "native", //automatically remove expired sessions
    });
    return store;
  } catch (error) {
    console.log(error);
  }
  // store.on("error", function (error: any) {
  //   console.log(`MongoDBStore Error: ${error}`);
  // });
};

export default mongoStore;
