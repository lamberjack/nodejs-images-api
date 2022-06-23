const fs = require('fs');
const rxjs = require('rxjs')
const db = require("./models");
const upload = require('./controllers/upload-helper')


const IMG_UPLOAD_FOLDER = "./resources/static/assets/uploads/";

function removeLocalUpdatedImages(filesToWrite) {
  console.log("Starting remove local updated images...");
  filesToWrite.forEach(fileName => {
    fs.unlinkSync(IMG_UPLOAD_FOLDER + fileName);
  });
  console.log("All Updated images are removed from local directory successfully!");
}

function writeFiles(filesToWrite) {
  const writers$ = [];
  filesToWrite.forEach(fileName => writers$.push(rxjs.from(upload.writeImage(fileName, IMG_UPLOAD_FOLDER, 'NEW', true))));
  rxjs.zip(writers$).subscribe(() => {
    db.sequelize.close().then(() => {
      console.log("Database connection close")
    })
  });
}

function connectWithDatabase(){
  return db.sequelize.sync().then(() => {
      return "connection established"
  }).catch(error => {
    console.error(error)
    throw new Error(error)
  })
}

async function load(){
  try{
    const connectionDbResponse = await connectWithDatabase()
    console.log("Database connection result: "+connectionDbResponse)

    let filesToWrite = fs.readdirSync(IMG_UPLOAD_FOLDER);
    if(!filesToWrite || filesToWrite.length === 0){
      throw new Error("No file to write have been read from the folder!")
    }else{
      writeFiles(filesToWrite);
    }
  }catch(e){
    console.log("Problem during data loading: "+e)
  }
}

load()





