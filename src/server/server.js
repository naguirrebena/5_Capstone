const dotenv = require('dotenv')
dotenv.config()

// Geonames API and URL
const geoNamesURL = 'http://api.geonames.org/searchJSON?q=';
const geoNamesUsername = `&username=${process.env.GEONAME_USERNAME}`;

// Weatherbit API and URL
const weatherBitURL = 'http://api.weatherbit.io/v2.0/forecast/daily?';
const weatherBitKey = `&key=${process.env.WEATHERBIT_API_KEY}`;
const weatherBitParams = "&units="
// Pixabay API and URL
const pixaBayURL = 'https://pixabay.com/api/?q='; 
const pixaBayKey = `&key=${process.env.PIXABAY_KEY}`;
const pixaBayParams = "&image_type=photo&orientation=horizontal";

// Rest Countries API
const restCountriesURL = 'https://restcountries.eu/rest/v2/lang/';

const path = require('path');
const fetch = require('node-fetch'); 

const express = require('express');
const app = express();

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());
  
app.use(express.static('dist'));

module.exports = app;

app.listen(8081, function () {
    console.log('App running on port 8081')
})

let tripData = {};

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
});

app.get('/test', function(req, res) {
    res.json({
      status : 200
    })
  })

app.post('/callgeoNames', callgeoNames)

async function callgeoNames(req, res) {
    const geonamesUrl = `${geoNamesURL}${addPlus(req.body.details.tripDestination)}${geoNamesUsername}`;
    try {
        const response = await fetch(geonamesUrl)
        tripData['long'] = response.geonames[0].lng;
        tripData['lat'] = response.geonames[0].lat;
        const responseJSON = await response.json()
        res.send(responseJSON)
    } catch (error) {
        console.log(`Error connecting to API.`)
        res.send(null)
    }
}

app.post('/callWeather', callWeather)

async function callWeather(req, res) {
    const weatherbitUrl = `${weatherBitURL}lat=${req.body.details.lat}&lon=${req.body.details.long}${weatherBitKey}${weatherBitParams}`;
    try {
        const response = await fetch(weatherbitUrl)
        tripData.weatherDesc = data.weather.description;
        const responseJSON = await response.json()
        res.send(responseJSON)
    } catch (error) {
        console.log(`Error connecting to API.`)
        res.send(null)
    }
}

app.post('/callPixabay', callPhotos)

async function callPhotos(req, res) {
    const pixabayUrl = `${pixaBayURL}+${req.body.details.tripLocation}+${pixaBayKey}+${pixaBayParams}`;
    try {
        const response = await fetch(pixabayUrl)
        const cityArray = [];
        const result1 = response.hits[0].webformatURL;
        const result2 = response.hits[1].webformatURL;
        const result3 = response.hits[2].webformatURL;

        cityArray.push(result1);
        cityArray.push(result2);
        cityArray.push(result3);
        planData.cityArray = cityArray
        res.send(true);
        const responseJSON = await response.json()
        res.send(responseJSON)
    } catch (error) {
        console.log(`Error connecting to API.`)
        res.send(null)
    }
}

app.post('/callCountries', callLanguage)

async function callLanguage(req, res) {
    const restCountriesUrl = `${restCountriesURL}${req.body.details.code}`;
    try {
        const response = await fetch(restCountriesUrl)
        tripData['languages'] = response.languages[0].name
        const responseJSON = await response.json()
        res.send(responseJSON)
    } catch (error) {
        console.log(`Error connecting to API.`)
        res.send(null)
    }
}



app.post('/datastore', dataStorage)

function dataStorage(req, res) {
    tripData.push(req.body)
    console.log(tripData)
    res.send({ message: "Data stored" })
}








