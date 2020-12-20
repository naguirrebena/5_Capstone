const dotenv = require('dotenv')
dotenv.config()

// // Geonames API and URL
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

const port = 8081;
const server = app.listen(port, listening);

// Callback to degug
function listening() {
  console.log("server running");
  console.log(`running on localhost ${port}`);
}

let tripData = {};

app.get('/all', (req, res) => {
    console.log(tripData);
    res.send(tripData);
})

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
});

app.get('/test', function(req, res) {
    res.json({
      status : 200
    })
  })

  app.post('/newTrip', (req, res) => {
    let newData = req.body;
    let newEntry = {
      location: newData.Location,
      startDate: newData.Start,
      endDate: newData.End,
      duration: newData.Duration,
      daysToTrip: newData.DaysToGo
    }
    
    tripData = newEntry;
    console.log(tripData)
    res.send('ok');
})


app.get('http://localhost:8081/geonameData', (req, res) => {

    console.log('GET geonames');
    const url = `http://api.geonames.org/searchJSON?placename=${tripData.location}&maxRows=1&username=${process.env.GEONAME_USERNAME}`
    console.log(url);
    getData(url).then(response => {
      console.log('Data from Genames[0]')
      console.log(response.geonames[0]);
      tripData.lat = response.geonames[0].lat;
      tripData.long = response.geonames[0].lng;
      
      console.log(`TripData is, ${tripData}`);
      res.send(true);
    }).catch(error => {
      res.send(JSON.stringify({error: error}))
    })
    
  })
//     console.log('GET geonames');
//     const url = `http://api.geonames.org/searchJSON?placename=${tripData.location}&maxRows=1&username=${process.env.GEONAME_USERNAME}`;
//   console.log(url);
//     fetch(url)
//       .then(res => res.json())
//         .then(response =>{
//           try {
//             console.log('Data From GeoNames')
//             console.log(response.geonames[0]);
//             tripData['long'] = response.geonames[0].lng;
//             tripData['lat'] = response.geonames[0].lat;
//             tripData['code'] = response.geonames[0].countryCode;
//             res.send(true);
//           } catch (e) {
//             console.log("Error: ", e);
//           }
//     })
//     .catch(error => {
//       res.send(JSON.stringify({error: error}));
//     })
//   })
  
  app.get('http://localhost:8081/weatherBit', (req, res) => {
    console.log('GET weatherBit');
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${tripData.lat}&lon=${tripData.long}&key=${process.env.WEATHERBIT_API_KEY}`
    console.log(url);
    getData(url).then(response => {
      console.log('Data from weatherBit');
      const weatherData = response.data;
  
      weatherData.forEach((data) => {
        if (data.valid_date == tripData.startDate) {
          tripData.description = data.weather.desc;
          triptData.temp = data.temp;
          console.log(tripData);
          res.send(true);
        } else return
      })
    })
  })

//     console.log('GET weather');
//     const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${tripData.lat}&lon=${tripData.long}&key=${process.env.WEATHERBIT_API_KEY}`;
//     console.log(url);
//       fetch(url)
//         .then(response => response.json())
//           .then(response =>{
//             let forecastDay = tripData.daysToTrip;
//             const data = response.data[forecastDay]
//             console.log(data)
//             tripData.maxTemp = data.max_temp;
//             tripData.minTemp = data.min_temp;
//             tripData.weatherDesc = data.weather.description

//             res.send(true)
//       })
//       .catch(error => {
//         res.send(JSON.stringify({error: "An error occured"}));
//       })
//   })
  
  app.get('http://localhost:8081//pixabay', (req, res) => {
    console.log('GET pixabay');
  const url = `https://pixabay.com/api/?&key=${process.env.PIXABAY_KEY}&q=${tripData.location}&image_type=photo`
  console.log(url);
  getData(url).then(response => {
    console.log("Data from pixabay");
    tripData.img = response.hits[0].webformatURL;
    console.log(tripData);
    res.send(true);
  })
})

//     console.log('GET Image')
//     const url = `https://pixabay.com/api/?&key=${process.env.PIXABAY_KEY}&q=${tripData.location}&image_type=photo`;
//     console.log(url);
//       fetch(url)
//         .then(response => response.json())
//           .then(response =>{
//             console.log("Pixabay data");
//             tripData.img = response.hits[0].webformatURL;
//             console.log(tripData);
//             res.send(true);
//           })
//           .catch(error => {
//             res.send(JSON.stringify({error: "An error has occured"}));
//           })
//   })
  

app.get('/getNewTrip', (req, res) => {
  console.log(tripData);
  res.send(tripData);
})


app.post('/datastore', dataStorage)

function dataStorage(req, res) {
    tripData.push(req.body)
    console.log(tripData)
    res.send({ message: "Data stored" })
}