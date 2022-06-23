## Img Storage service ##

This node.js backedn application provide API to handle a database containing images. 


### Environment configuration ###

The environment configuration parameters for server and database connection is stored in /config/config.js.

In this example mariadb have been used for dev and test environments. 

When you launch the application you have to define the NODE_ENV variable to establish which environment use (dev,tes,prod).


### Database connection ###

The application defines the model of database on which it works using Sequelize as ORM: https://sequelize.org/

Inside the /config/config.js file you find the parametrized configuration to connect to the database.

To initialize the databse you can launch the script initializer.js : npm run init:dev


### Start the application ###

You need to pass the NODE_ENV environment variable to establish which environment use (dev,tes,prod).

There are 2 types of functionality that this application offers:

1) Start node.js server exposing the API : npm run start:dev

2) Start a script (loader.js) to load massively the images stored into app\resources\static\assets\uploads : npm run load:dev


### Test the application ###

A test suite used to verify the endpoint functioning. All the API exposed by the server have been tested. 

For test purpose a dedicated environment have to be configured in config/config.js.

1) Initialize the test database: npm run init:test

2) Run the tests: npm test





