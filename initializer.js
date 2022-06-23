const { async } = require("rxjs");
const db = require("./models");
const Image = db.images;


init()

function createDatabase() {
    return Image.sync({ force: true }).then(() => {
            return "Initialization completed!"
        }
    ).catch(error => {
        console.error(error)
        throw new Error(error)
    });
}

function closeDatabaseConnection(){
    return db.sequelize.close().then(() => {
        return "Database connection closed successfully"
    }).catch(error => {
        console.error(error)
        throw new Error(error)
    })
}

async function init(){
    try{
        console.log("Starting Image DB initialization...")
        const creationResponse = await createDatabase();
        console.log("Database creation result: "+creationResponse)
        const closingConnectionResponse = await closeDatabaseConnection()
        console.log("Database connection closing result : "+closingConnectionResponse)
    }catch(e){
        console.log("Problem during database creation: "+e)
    }
}