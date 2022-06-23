## Images Storage service ##

This node.js backend application provide API to handle a database containing images. 


### Environment configuration ###

The environment configuration parameters for server and database connection is stored in /config/config.js.
In this example mariadb have been used for dev and test environments. You can configure remote environments for production and other contexts.
When you launch the application you have to define the <b>NODE_ENV</b> variable to establish which environment use (dev,tes,prod.etc..).
Inside package.json you can find any examples of run configuration with <b>NODE_ENV</b> environment variable.
<hr></hr>

### Database connection ###

The application defines the model of database on which it works using Sequelize as ORM: https://sequelize.org/ .
Inside the /config/config.js file you find the parametrized configuration to connect to the database.
To create the database you can launch the script initializer.js : <code> npm run init:dev </code>
<hr></hr>

### Start the application ###

You need to pass the NODE_ENV environment variable to establish which environment use (dev,tes,prod).
There are 2 types of functionality that this application offers:

1) Start node.js server exposing the public APIs : <code>npm run start:dev</code>

2) Start a script (loader.js) to load massively the images stored into app\resources\static\assets\uploads : <code>npm run load:dev</code>
<hr></hr>

### Test the application ###

A test suite used to verify the endpoint functioning. All the API exposed by the server have been tested. 
For test purpose a dedicated environment have to be configured in config/config.js.

1) Initialize the test database: <code>npm run init:test</code>

2) Run the tests: <code>npm test</code>





