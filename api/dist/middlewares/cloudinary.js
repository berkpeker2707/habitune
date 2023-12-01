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
const cloudinary = require("cloudinary");
const path = require("path");
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const cloudinaryUploadUserImg = (fileToUpload, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log("publish");
        const imageFormats = [".jpg", ".jpeg", ".jpe", ".tiff", ".tif", ".png"];
        const extension = path.extname(fileToUpload);
        const type = imageFormats.includes(extension) ? "photos" : "Wrong type";
        if (type === "Wrong type")
            return "Wrong type";
        let promise = new Promise((resolve, reject) => {
            cloudinary.v2.uploader
                .upload(fileToUpload, {
                resource_type: "auto",
                folder: `habitune/user/${type}`,
                tags: [`user${type}`, id],
                height: 300,
                width: 300,
                crop: "fill",
                async: false,
                end_offset: "15",
            })
                .then((result) => {
                if (result && result.hasOwnProperty("secure_url")) {
                    // if secure_url exists
                    // console.log(result);
                    resolve(result);
                }
            })
                .catch((error) => {
                console.error(error);
            });
        });
        let result = yield promise; // wait until the promise resolves (*)
        return result;
    }
    catch (error) {
        return error;
    }
});
const cloudinaryDeleteUserImg = (public_id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // console.log("delete");
        const getPublicId = (_a = public_id.split("/").pop()) === null || _a === void 0 ? void 0 : _a.split(".")[0];
        var imagePath = "habitune/user/photos/" + getPublicId;
        const data = yield cloudinary.v2.uploader.destroy(imagePath, (error, result) => {
            // console.log(result);
        });
        return {
            data,
        };
    }
    catch (error) {
        return error;
    }
});
module.exports = {
    cloudinaryUploadUserImg,
    cloudinaryDeleteUserImg,
};
