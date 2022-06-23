const supertest = require("supertest");
const fs = require("fs");
const expect = require("chai").expect;
const app = require("../server");
const upload = require("../controllers/upload-helper");
const db = require("../models");
const rxjs = require("rxjs");

const IMG_TEST_INIT_PATH = "./test/img/init-images/";
const IMG_TEST_POST_PATH = "./test/img/test-post/pig.jpg";

describe("Testing IMAGE STORE SERVICE API", function () {
  before((done) => {
    initTestDatabase(done);
  });

  it("GET /images/id", async function () {
    const response = await supertest(app).get("/images/2").send();
    expect(response.status).equal(200);
    expect(response.body.image_data.id).equal(2);
    expect(response.body.image_data.type).equal(".jpg");
    expect(response.body.image_data.name).equal("cat");
    expect(response.body.image_data.status).equal("NEW");
  });

  it("GET /images/first-new", async function () {
    const response = await supertest(app).get("/images/first-new").send();
    expect(response.status).equal(200);
    expect(response.body.image_data.id).equal(1);
    expect(response.body.image_data.type).equal(".jpg");
    expect(response.body.image_data.name).equal("bugatti");
    expect(response.body.image_data.status).equal("NEW");
  });

  it("GET /images/all", async function () {
    const response = await supertest(app).get("/images").send();
    expect(response.status).to.equal(200);
    expect(response.body.message).equal("Images fetched correctly");
    expect(response.body.images.length).equal(4);
  });

  it("PUT /images/update/1?status=BLOCKED", async function () {
    const response = await supertest(app)
      .put("/images/update/1?status=BLOCKED")
      .send();
    expect(response.status).to.equal(200);
    expect(response.body.message).equal("Image: 1 updated correctly");
  });

  it("PUT /images/update-all/BLOCKED?new_status=NEW", async function () {
    const response = await supertest(app)
      .put("/images/update-all/BLOCKED?new_status=NEW")
      .send();
    expect(response.status).to.equal(200);
    expect(response.body.message).equal("updated 1 images");
  });

  it("DELETE /images/delete-by-name/?name=cat", async function () {
    const response = await supertest(app)
      .delete("/images/delete-by-name/?name=cat")
      .send();
    expect(response.status).to.equal(200);
    expect(response.body.message).equal("delete image with name: cat");
  });

  it("DELETE /images/delete-by-status/?status=NEW", async function () {
    const response = await supertest(app)
      .delete("/images/delete-by-status/?status=NEW")
      .send();
    expect(response.status).to.equal(200);
    expect(response.body.message).equal("deleted 3 images with status: NEW");
  });

  it("POST /images/upload/", async function () {
    //load image from local test directory
    const response = await supertest(app)
      .post("/images/upload")
      .type("form")
      .field("status", "NEW")
      .attach("file", IMG_TEST_POST_PATH);
    expect(response.status).to.equal(200);
    expect(response.body.message).equal("Image : ID: 5 - NAME: pig - STATUS: NEW uploaded successfully");
  });

  after((done) => {
    db.sequelize.close().then(() => {
      console.log("*** TEST DATABASE CONNECTION CLOSE ***");
      console.log("TEST FINISHED!");
      done();
    });
  });
});

function initTestDatabase(done) {
  console.log("*** TEST DATABASE SYNCHRONIZATION START ***");
  db.sequelize
    .sync({ force: true })
    .then(() => {
      populateDatabase(IMG_TEST_INIT_PATH).subscribe(() => {
        console.log("*** TEST DATABASE SYNCHRONIZATION END ***");
        done();
      });
    })
    .catch((error) => {
      console.error("*** ERROR DURING TEST DATABASE SYNCHRONIZATION  ***");
      console.error(error);
    });
}

function populateDatabase(imagesPath) {
  let filesToWrite = fs.readdirSync(imagesPath);
  const writers$ = [];
  filesToWrite.forEach((fileName) =>
    writers$.push(rxjs.from(upload.writeImage(fileName, imagesPath, 'NEW', false)))
  );
  return rxjs.zip(writers$);
}
