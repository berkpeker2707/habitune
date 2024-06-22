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
exports.fetchCurrentUserProfile = void 0;
const errors_util_1 = require("../../utils/errors.util");
const user_1 = __importDefault(require("../models/user"));
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = require("../../middlewares/logger");
dotenv_1.default.config();
const fetchCurrentUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var nowUTC = new Date().toISOString();
        const loggedinUser = yield user_1.default.findById(req.user[0].id);
        // .populate({ path: 'friends.friend', model: 'User' })
        // .populate({
        //     path: 'habits',
        //     model: 'Habit',
        // })
        // .exec()
        yield (loggedinUser === null || loggedinUser === void 0 ? void 0 : loggedinUser.updateOne({
            $set: { lastLogin: nowUTC },
        }));
        return res.status(200).json(loggedinUser);
    }
    catch (error) {
        logger_1.errorLogger.error(error);
        return res.status(500).send((0, errors_util_1.getErrorMessage)(error));
    }
});
exports.fetchCurrentUserProfile = fetchCurrentUserProfile;
//# sourceMappingURL=fetchCurrentUserProfile.js.map