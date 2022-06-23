const fs = require("fs");
const db = require("../models");
const Image = db.images;

const ALLOWED_FILE_TYPES = [".jpg"];

function writeImage(filename, imagesFolderPath, imageStatus, removeImageAfterWrite) {
  const imageInfo = splitFileNameAndType(filename);
  if (!ALLOWED_FILE_TYPES.includes(imageInfo.type)) {
    throw new Error(
      "Error in image: " +
        imageInfo.name +
        " - Image type not allowed: " +
        imageInfo.type
    );
  }
  return createImage(
    imageInfo.name,
    imageInfo.type,
    imagesFolderPath,
    imageStatus
  )
    .then((image) => {
      console.log(
        "Image: " + imageInfo.name + imageInfo.type + " Write on DB correctly!"
      );
      if(removeImageAfterWrite){
        fs.unlinkSync(imagesFolderPath + filename);
      }

      return image;
    })
    .catch((error) => {
      if(error == 'SequelizeUniqueConstraintError: Validation error'){
        fs.unlinkSync(imagesFolderPath + filename);
      }
      console.error(error);
      throw error;
    });
}

function createImage(filename, filetype, filepath, status) {
  return Image.create({
    type: filetype,
    name: filename,
    status: status,
    data: fs.readFileSync(filepath + filename + filetype),
  });
}

function validateRequest(req) {
  
  if (req.file == undefined) {
    return {
      error: true,
      errorMessage: "not upload, you must select a file.",
    };
  }
  if (!req.body.status) {
    return {
      error: true,
      errorMessage: "not upload, you must send a status param.",
    };
  }
  const imageInfo = splitFileNameAndType(req.file.filename);
  if (!ALLOWED_FILE_TYPES.includes(imageInfo.type)) {
    return {
      error: true,
      errorMessage: "not upload, only .jpg images are allowed",
    };
  }
  return {
    error: false,
    errorMessage: "",
  };
}

function splitFileNameAndType(filename) {
  return {
    name: filename.substring(0, filename.indexOf(".")),
    type: filename.substring(filename.indexOf("."), filename.length),
  };
}

module.exports = {
  writeImage,
  splitFileNameAndType,
  validateRequest,
};
