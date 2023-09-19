"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const errors_util_1 = require("../utils/errors.util");
const mongoose = require("mongoose");
require("dotenv").config();
const dbConnect = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        mongoose.set("strictQuery", false);
        yield mongoose.connect(process.env.MONGODB_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            dbName: "habitapp_db",
        });
        console.log("Database connected");
    }
    catch (error) {
        console.log(`Database error: ${(0, errors_util_1.getErrorMessage)(error)}`);
    }
});
exports.default = dbConnect;
