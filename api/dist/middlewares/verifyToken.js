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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
require("dotenv").config();
const user_model_1 = __importDefault(require("../user/user.model"));
const errors_util_1 = require("../utils/errors.util");
const logger_1 = __importDefault(require("./logger"));
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var jwtS = process.env.JWT_SECRET;
        const bearerHeader = req.headers["authorization"];
        const token = bearerHeader.split(" ")[1];
        const decoded = jwt.verify(token, jwtS);
        if (!decoded) {
            logger_1.default.error("Unauthorized");
            return res.status(500).send((0, errors_util_1.getErrorMessage)("Unauthorized"));
        }
        const user = yield user_model_1.default.find({ email: decoded.user.email });
        req.user = user;
        next();
    }
    catch (error) {
        logger_1.default.error("token error: ", error);
        // console.log("token error: ", error);
        return res.status(500).send((0, errors_util_1.getErrorMessage)(error));
    }
});
exports.default = verifyToken;
