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
exports.changeTheme = void 0;
const errors_util_1 = require("../../utils/errors.util");
const user_1 = __importDefault(require("../models/user"));
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = require("../../middlewares/logger");
dotenv_1.default.config();
const changeTheme = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        var newThemeValue = req.body.theme;
        const loggedinUser = yield user_1.default.findByIdAndUpdate((_a = req.user[0]) === null || _a === void 0 ? void 0 : _a._id, { $set: { theme: newThemeValue } }, { new: true });
        return res.status(200).json(loggedinUser);
    }
    catch (error) {
        logger_1.errorLogger.error(error);
        return res.status(500).send((0, errors_util_1.getErrorMessage)(error));
    }
});
exports.changeTheme = changeTheme;
//# sourceMappingURL=changeTheme.js.map