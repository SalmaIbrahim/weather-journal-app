// Setup empty JS object to act as endpoint for all routes
projectData = {};

// requirements -  No.1
// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder //make hosting to be accessed // to be available
app.use(express.static('website'));


// Setup Server
const port = 8000;

app.listen(port, listening);

function listening () {
    console.log(`Server is running on port ${port}`);
}

// requirements - No.2
// GET request
app.get('/getData', function (req, res) {
    console.log('GET Request!');
    res.send(projectData);
});

// POST request
app.post('/addTemp', function (req, res) {
    const data = req.body;
    console.log('POST Request!');
    console.log(data);
    projectData = {...data};
    // res.send();
    res.send(projectData);
    console.log(projectData);
});

