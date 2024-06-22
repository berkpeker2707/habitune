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
exports.sendFeedback = void 0;
const errors_util_1 = require("../../utils/errors.util");
const user_1 = __importDefault(require("../models/user"));
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = require("../../middlewares/logger");
dotenv_1.default.config();
const sendFeedback = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        if (req.body.feedback.length < 501) {
            var feedback = req.body.feedback;
            const currentUser = yield user_1.default.findById((_a = req.user[0]) === null || _a === void 0 ? void 0 : _a._id);
            if (currentUser && currentUser.feedback.length >= 10) {
                logger_1.errorLogger.error('Feedback limit reached (10 items)');
                return res
                    .status(500)
                    .send((0, errors_util_1.getErrorMessage)('Feedback limit reached (10 items)'));
            }
            const loggedinUser = yield user_1.default.findByIdAndUpdate((_b = req.user[0]) === null || _b === void 0 ? void 0 : _b._id, { $push: { feedback: feedback } }, { new: true });
            return res.status(200).json(loggedinUser);
        }
        else {
            logger_1.errorLogger.error('Feedback limit 500 character reached');
            return res
                .status(500)
                .send((0, errors_util_1.getErrorMessage)('Feedback limit 500 character reached'));
        }
    }
    catch (error) {
        logger_1.errorLogger.error(error);
        return res.status(500).send((0, errors_util_1.getErrorMessage)(error));
    }
});
exports.sendFeedback = sendFeedback;
//# sourceMappingURL=sendFeedback.js.map