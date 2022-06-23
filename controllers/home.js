const db = require("../models");
const upload = require('./upload-helper')

const Image = db.images;

const findAll = (req, res) => {
  try {
    Image.findAll().then((images) => {
      console.log("find all images " + images);
      return res.status(200).json({
        message: "Images fetched correctly",
        images: images,
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

const findById = (req, res) => {
  try {
    Image.findOne({ where: { id: req.params.id } }).then((image) => {
      if (image) {
        console.log("find image: " + image.info);
        return res.status(200).json({
          message: "Image with ID: " + image.id + " fetched correctly",
          image_data: image,
        });
      } else {
        console.log("image with id: " + req.params.id + " new not found");
        return res.status(200).json({
          message: "image with id: " + req.params.id + " new not found",
        });
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

const findFirstNew = (req, res) => {
  try {
    Image.findOne({ where: { status: "NEW" } }).then((image) => {
      if (image) {
        console.log("find first NEW image " + image.info);
        return res.status(200).json({
          message: "Image with status NEW fetched correctly",
          image_data: image,
        });
      } else {
        console.log("image with status new not found");
        return res.status(200).json({
          message: "image with status NEW not found",
        });
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

const uploadImage = (req, res) => {
    if (upload.validateRequest(req).error) {
      return  res.status(200).json({
        message: upload.validateRequest(req).errorMessage,
      });
    }
    const filePath = __basedir + "/resources/static/assets/uploads/"
    upload.writeImage(req.file.filename, filePath,  req.body.status, true).then((image) => {
      console.log("uploaded NEW image: " + image.info);
      return res.status(200).json({
        message: "Image : "+image.info+" uploaded successfully",
      });
    }).catch(error => {
      return res.status(500).json({
        message: "Error during image upload: "+error
      });
    });
};

const updateRecordStatus = (req, res) => {
  try {
    Image.update(
      { status: req.query.status },
      {
        where: {
          id: req.params.id,
        },
      }
    ).then((updateResult) => {
      if (updateResult[0] > 0) {
        console.log("update status of image: " + req.params.id);
        return res.status(200).json({
          message: "Image: " + req.params.id + " updated correctly",
        });
      } else {
        console.log(
          "impossible to update status of image: " +
            req.params.id +
            " not found"
        );
        return res.status(200).json({
          message: "Image: " + req.params.id + " not found",
        });
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

const updateAllRecordStatus = (req, res) => {
  try {
    Image.update(
      { status: req.query.new_status },
      {
        where: {
          status: req.params.status,
        },
      }
    ).then((updateResult) => {
      if (updateResult[0] > 0) {
        console.log("update status of " + updateResult[0] + " images");
        return res.status(200).json({
          message: "updated " + updateResult[0] + " images",
        });
      } else {
        console.log("images with status: " + req.params.status + " not found");
        return res.status(200).json({
          message: "Image with status : " + req.params.status + " not found",
        });
      }
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({ error: error.message });
  }
};

const deleteRecordWithName = (req, res) => {
  try {
    Image.destroy({
      where: {
        name: req.query.name,
      },
    }).then((deleteResult) => {
      if (deleteResult > 0) {
        const resultMessage = "delete image with name: " + req.query.name;
        console.log(resultMessage);
        return res.status(200).json({
          message: resultMessage,
        });
      } else {
        const notFoundMessage =
          "images with name: " + req.query.name + " not found";
        console.log(notFoundMessage);
        return res.status(200).json({
          message: notFoundMessage,
        });
      }
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({ error: error.message });
  }
};

const deleteRecordsWithStatus = (req, res) => {
  try {
    Image.destroy({
      where: {
        status: req.query.status,
      },
    }).then((deleteResult) => {
      if (deleteResult > 0) {
        const resultMessage =
          "deleted " +
          deleteResult +
          " images with status: " +
          req.query.status;
        console.log(resultMessage);
        return res.status(200).json({
          message: resultMessage,
        });
      } else {
        const notFoundMessage =
          "images with status: " + req.query.status + " not found";
        console.log(notFoundMessage);
        return res.status(200).json({
          message: notFoundMessage,
        });
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getById: findById,
  getAllImages: findAll,
  getFirstNew: findFirstNew,
  postNewImage: uploadImage,
  updateImageStatus: updateRecordStatus,
  updateAllImagesStatus: updateAllRecordStatus,
  deleteImageWithName: deleteRecordWithName,
  deleteImagesWithStatus: deleteRecordsWithStatus,
};
