// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

const bodyParser = require('body-parser')
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('/src/views/'));


// Setup Server
const port = 8000
const server = app.listen(port, listening);

function listening(){
  console.log("server running");
  console.log(`running on localhost: ${port}`);
}

app.get('/', function(req, res){
  res.sendFile('views/index.html')
});

// Initialize all route with a callback function
// Callback function to complete GET '/all'


// app.get('/all', getData);

// function getData(req, res){
//   res.send(projectData)
//   console.log(projectData)
// }    

// // Post Route
// app.post('/addData', addData);

// function addData(req, res){
//   const newEntry = {
//     temp: req.body.temp,
//     date: req.body.date,
//     userResponse: req.body.userResponse   
//   }

//   projectData = newEntry;
//   res.send(projectData)
//   console.log(projectData)
// };

