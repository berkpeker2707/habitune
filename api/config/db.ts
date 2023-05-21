import { getErrorMessage } from "../utils/errors.util";

const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = async () => {
  try {
    mongoose.set("strictQuery", false);

    await mongoose.connect(process.env.MONGODB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log("Database connected");
  } catch (error) {
    console.log(`Database error: ${getErrorMessage(error)}`);
  }
};

export default dbConnect;
