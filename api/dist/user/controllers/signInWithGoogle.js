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
exports.signInWithGoogle = void 0;
const errors_util_1 = require("../../utils/errors.util");
const user_1 = __importDefault(require("../models/user"));
const jwt = require('jsonwebtoken');
const { cloudinaryDeleteUserImg } = require('../../middlewares/cloudinary');
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = require("../../middlewares/logger");
const { v4: uuidv4 } = require('uuid');
dotenv_1.default.config();
const signInWithGoogle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var userExists = yield user_1.default.exists({ email: req.body.email });
        if (userExists) {
            //update user picture starts
            var foundUser = yield user_1.default.findOne({ email: req.body.email });
            //delete old profile image if exists
            if ((foundUser && foundUser.image.length > 1) ||
                (foundUser && foundUser.image.includes('https://res.cloudinary.com'))) {
                yield cloudinaryDeleteUserImg(foundUser.image);
            }
            yield user_1.default.findOneAndUpdate({ email: req.body.email }, { image: req.body.picture });
            //update user picture ends
            var token = yield jwt.sign({ user: foundUser }, process.env.JWT_SECRET, {
                expiresIn: '365d',
            });
            return res.status(200).json(token);
        }
        else {
            const user = yield user_1.default.create({
                id: uuidv4(),
                firstName: req.body.name,
                email: req.body.email,
                image: req.body.picture,
                fcmToken: 'empty',
                userType: 'standart',
                theme: 'default',
            });
            yield user.save();
            var token = yield jwt.sign({ user: user }, process.env.JWT_SECRET, {
                expiresIn: '365d',
            });
            return res.status(200).json(token);
        }
    }
    catch (error) {
        logger_1.errorLogger.error(error);
        return res.status(500).send((0, errors_util_1.getErrorMessage)(error));
    }
});
exports.signInWithGoogle = signInWithGoogle;
//# sourceMappingURL=signInWithGoogle.js.map