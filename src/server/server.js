const dotenv = require('dotenv')
dotenv.config()

//  // Geonames API and URL
// const geoNamesURL = 'http://api.geonames.org/searchJSON?q=';
// const geoNamesUsername = `&username=${process.env.GEONAME_USERNAME}`;

// // Weatherbit API and URL
// const weatherBitURL = 'http://api.weatherbit.io/v2.0/forecast/daily?';
// const weatherBitKey = `&key=${process.env.WEATHERBIT_API_KEY}`;
// const weatherBitParams = "&units="

// // Pixabay API and URL
// const pixaBayURL = 'https://pixabay.com/api/?q='; 
// const pixaBayKey = `&key=${process.env.PIXABAY_KEY}`;
// const pixaBayParams = "&image_type=photo&orientation=horizontal";

// // Rest Countries API
// const restCountriesURL = 'https://restcountries.eu/rest/v2/lang/';

const path = require('path')
const fetch = require('node-fetch')

const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const cors = require('cors')
app.use(cors())
  
app.use(express.static('dist'))

module.exports = app

const port = 8081
app.listen(port, () => 
console.log(`Travel app listening on port ${port}!`)
)

app.get('/test', function(req, res) {
  res.json({
    status : 200
  })
});

let tripData = {};

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
});

app.get("/all", (req, res) => {
  res.send(tripData);
  console.log(tripData);
});

  app.post('/newTrip', (req, res) => {
    
  let newData = req.body;
  let newEntry = {
    location: newData.Location,
    startDate: newData.Start,
    endDate: newData.End,
    duration: newData.Duration,
    daysToTrip: newData.TimeUntilTravel
  }
  
  tripData = newEntry;

  res.send('ok');
  });

app.get('/geonamesData', (req, res) => {

    console.log('GET geonames');
    const url = `https://api.geonames.org/searchJSON?placename=${tripData.location}&maxRows=1&username=${process.env.GEONAME_USERNAME}`;
    console.log(url);
    fetch(url)
      .then(res => res.json())
        .then(response =>{
          try {
            console.log('Data From GeoNames')
            console.log(response);
            tripData['long'] = response.geonames.lng;
            tripData['lat'] = response.geonames.lat;
            tripData['countryName'] = response.geonames.countryName;
            tripData['code'] = response.geonames.countryCode;
            res.send(true);
          } catch (e) {
            console.log("Error: ", e);
          }
    })
    .catch(error => {
      res.send(JSON.stringify({error: error}));
    })
    
  });

  
  app.get('/weatherBit', (req, res) => {
    console.log('GET weatherBit');
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${tripData.lat}&lon=${tripData.long}&key=${process.env.WEATHERBIT_API_KEY}`
    fetch(url)
      .then(response => response.json())
        .then(response =>{
          tripData.weatherDesc = data.weather.desc;
          res.send(true);
  })
  .catch(error => {
    res.send(JSON.stringify({error: error}));
  })

});

  app.get('/pixabay', (req, res) => {
    console.log('GET pixabay');
    const url = `https://pixabay.com/api/?key=${process.env.PIXABAY_KEY}&q=${tripData.location}&image_type=photo`;
console.log(url);
    fetch(url)
      .then(response => response.json())
        .then(response =>{
          tripData.img = response.hits[0].webformatURL;
          res.send(true);
        })
        .catch(error => {
          res.send(JSON.stringify({error: "An error has occured"}));
        })
})

app.get("/all", (req, res) => {
  res.send(tripData);
  console.log(tripData);
});

app.post('/storedata', storeData)

function storeData(req, res) {
    tripData.push(req.body)
    console.log(tripData)
    res.send({ message: "Data received" })
}

