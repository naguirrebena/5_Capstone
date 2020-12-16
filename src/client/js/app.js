// Personal API Key for OpenWeatherMap API
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = `&appid=4b657e9e6da863eeac9055c61a192fbf&units=metric`;

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.toDateString();


  // Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);
export function performAction(e){
    const userResponse = document.getElementById('feelings').value;
    const zipCode = document.getElementById('zip').value;
    

// chain the promises
getWeather(baseURL, zipCode, apiKey)
.then(function (data) {
    postData('/addData', {
        temp: data.main.temp,
        date: newDate,
        userResponse: userResponse
    })
    updateUI();
}); 
}

//TODO-Async GET
const getWeather = async (baseURL, zipCode, apiKey) => {
    console.log(baseURL+zipCode+apiKey);
    const request = await fetch(baseURL+zipCode+apiKey);
        try {
         const data = await request.json();
          console.log(data);
          return data;
      } catch(error) {   // appropriately handle the error
          console.log("error", error);
      }
};

//Async POST
const postData = async ( url = '', data = {})=>{
    console.log(data);
    const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json', },
    body: JSON.stringify(data), });
    
    try {
    
    const newData = await response.json();
    console.log(newData);
    return newData; 

    }catch(error) {
    
    console.log("error", error);
    
    }};

// Function to get project data

  const updateUI = async () =>{
    const request = await fetch('/all');
    console.log(request)
    try {
      const allData = await request.json()
    document.getElementById('date').innerHTML = allData.date;
    document.getElementById('temp').innerHTML = allData.temp;
    document.getElementById('content').innerHTML = allData.userResponse;
    }  catch(error) {
      console.log("error", error);
    }
  };

// export function performAction(event) {
//   event.preventDefault()
//   console.log('I\'m connected');
//   const destCity = document.getElementById('city').value;
//   console.log(`The city is ${destCity}`);
//   const departureDate = document.getElementById('date-departure').value;
//   const returnDate = document.getElementById('date-return').value;
//   console.log(`The dates are ${departureDate} and ${returnDate}`);
//   // join all the data info
//   const theUserTrip = {destCity, departureDate, returnDate};
//   console.log(theUserTrip);

//   //postRoute(theUserTrip);
//   const response = await postRoute(theUserTrip)
//   const responseJSON = await response.json()
//   const theCity = responseJSON.body;
//   console.log(theCity);
// };

// async function postRoute(theUserTrip) {
//   const response = await fetch('http://localhost:8000/postData', {
//       method: 'POST',
//       credentials: 'same-origin',
//       headers: {
//           'Content-Type': 'text/plain'
//       },
//       body: (theUserTrip)
//   });

//   try {
//       const newData = await response.json();
//       console.log(newData)
//       return newData
//     } catch (error) {
//       console.log('error', error);
//   }
// };




