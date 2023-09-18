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
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var jwtS = process.env.JWT_SECRET;
        const bearerHeader = req.headers["authorization"];
        const token = bearerHeader.split(" ")[1];
        const decoded = jwt.verify(token, jwtS);
        console.log("🚀 ~ file: verifyToken.ts:26 ~ verifyToken ~ decoded:", decoded);
        if (!decoded) {
            return res.json({ message: "Unauthorized!" });
        }
        const user = yield user_model_1.default.find({ email: decoded.user[0].email });
        req.user = user;
        next();
    }
    catch (error) {
        res.json(error);
    }
});
exports.default = verifyToken;
