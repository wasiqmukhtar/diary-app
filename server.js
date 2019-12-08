const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');


// create express app
const app = express();

// parse application
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

// Connecting to the database
mongoose.connect(dbConfig.url, {
	useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

//connect app to defined routes
require('./app/routes/diary.routes.js')(app);
require('./app/routes/user.routes.js')(app);

// define the index or base route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to DiaryQuick. A simple diary application that can be used by multiple people. "});
});

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});