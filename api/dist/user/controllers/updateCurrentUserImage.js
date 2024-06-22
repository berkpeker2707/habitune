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
exports.updateCurrentUserImage = void 0;
const errors_util_1 = require("../../utils/errors.util");
const user_1 = __importDefault(require("../models/user"));
const { cloudinaryUploadUserImg, cloudinaryDeleteUserImg, } = require('../../middlewares/cloudinary');
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = require("../../middlewares/logger");
dotenv_1.default.config();
const updateCurrentUserImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const localPath = (_b = (_a = req === null || req === void 0 ? void 0 : req.files) === null || _a === void 0 ? void 0 : _a.image) === null || _b === void 0 ? void 0 : _b.path;
        const imgUploaded = yield cloudinaryUploadUserImg(localPath, req.user[0]._id);
        const foundUserPicture = yield user_1.default.findById(req.user[0]._id);
        //delete old profile image if exists
        if ((foundUserPicture && foundUserPicture.image.length > 1) ||
            (foundUserPicture &&
                foundUserPicture.image.includes('https://res.cloudinary.com'))) {
            yield cloudinaryDeleteUserImg(foundUserPicture.image);
            const user = yield user_1.default.findByIdAndUpdate(req.user[0]._id, {
                image: imgUploaded.secure_url,
            }, { new: true });
            return res.status(200).json(user);
        }
    }
    catch (error) {
        logger_1.errorLogger.error(error);
        return res.status(500).send((0, errors_util_1.getErrorMessage)(error));
    }
});
exports.updateCurrentUserImage = updateCurrentUserImage;
//# sourceMappingURL=updateCurrentUserImage.js.map