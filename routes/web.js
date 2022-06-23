const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home");
const upload = require("../middleware/upload");
let routes = (app) => {
  router.get("/images/", homeController.getAllImages);
  router.get("/images/first-new/", homeController.getFirstNew);
  router.get("/images/:id", homeController.getById);
  router.put("/images/update/:id", homeController.updateImageStatus);
  router.put("/images/update-all/:status", homeController.updateAllImagesStatus);
  router.post("/images/upload", upload.single("file"), homeController.postNewImage);
  router.delete("/images/delete-by-name/", homeController.deleteImageWithName)
  router.delete("/images/delete-by-status/", homeController.deleteImagesWithStatus)
  // todo ripartire da qui capire come implementare la delete con parametro name
  return app.use("/", router);
};
module.exports = routes;