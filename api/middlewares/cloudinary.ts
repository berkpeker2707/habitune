const cloudinary = require("cloudinary");
const path = require("path");
import Logger from "./logger";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudinaryUploadUserImg = async (fileToUpload: any, id: any) => {
  try {
    // console.log("publish");
    const imageFormats = [".jpg", ".jpeg", ".jpe", ".tiff", ".tif", ".png"];
    const extension = path.extname(fileToUpload);

    const type = imageFormats.includes(extension) ? "photos" : "Wrong type";

    if (type === "Wrong type") return "Wrong type";

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
        .then((result: any) => {
          if (result && result.hasOwnProperty("secure_url")) {
            // if secure_url exists
            // console.log(result);
            Logger.info(result);
            resolve(result);
          }
        })
        .catch((error: any) => {
          Logger.error(error);
          // console.error(error);
        });
    });

    let result = await promise; // wait until the promise resolves (*)

    return result;
  } catch (error) {
    Logger.error(error);
    return error;
  }
};

const cloudinaryDeleteUserImg = async (public_id: string) => {
  try {
    // console.log("delete");
    const getPublicId = public_id.split("/").pop()?.split(".")[0];
    var imagePath = "habitune/user/photos/" + getPublicId;

    const data = await cloudinary.v2.uploader.destroy(
      imagePath,
      (error: any, result: any) => {
        Logger.info(result);
        // console.log(result);
      }
    );

    return {
      data,
    };
  } catch (error) {
    Logger.error(error);
    return error;
  }
};

module.exports = {
  cloudinaryUploadUserImg,
  cloudinaryDeleteUserImg,
};
