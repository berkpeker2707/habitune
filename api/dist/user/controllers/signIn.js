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
exports.signIn = void 0;
const errors_util_1 = require("../../utils/errors.util");
const user_1 = __importDefault(require("../models/user"));
const jwt = require('jsonwebtoken');
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = require("../../middlewares/logger");
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
dotenv_1.default.config();
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        if (!emailRegex.test(req.body.email)) {
            logger_1.errorLogger.error('Unacceptable email');
            return res.status(500).send((0, errors_util_1.getErrorMessage)('Unacceptable email'));
        }
        else {
            var userExists = yield user_1.default.exists({ email: req.body.email });
            if (userExists) {
                const thatUser = yield user_1.default.findOne({ email: req.body.email });
                const result = yield bcrypt.compare(req.body.password, thatUser === null || thatUser === void 0 ? void 0 : thatUser.password);
                if (result) {
                    var foundUser = yield user_1.default.findOne({ email: req.body.email });
                    var token = yield jwt.sign({ user: foundUser }, process.env.JWT_SECRET, {
                        expiresIn: '365d',
                    });
                    return res.status(200).json(token);
                }
                else {
                    logger_1.errorLogger.error(`Wrong password: ${req.body.password} or email: ${req.body.email}`);
                    return res
                        .status(500)
                        .send((0, errors_util_1.getErrorMessage)('Wrong password or email'));
                }
            }
            else {
                if ((!req.body.name && req.body.name === '') ||
                    (!req.body.email && req.body.email === '') ||
                    (!req.body.password && req.body.password === '')) {
                    logger_1.errorLogger.error('Need all required data');
                    return res.status(500).send((0, errors_util_1.getErrorMessage)('Need all required data'));
                }
                else {
                    const user = yield user_1.default.create({
                        id: uuidv4(),
                        firstName: req.body.name,
                        email: req.body.email,
                        image: 'https://www.habitune.net/image/empty-shell',
                        password: yield bcrypt.hash(req.body.password, 10),
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
        }
    }
    catch (error) {
        logger_1.errorLogger.error(error);
        return res.status(500).send((0, errors_util_1.getErrorMessage)(error));
    }
});
exports.signIn = signIn;
//# sourceMappingURL=signIn.js.map