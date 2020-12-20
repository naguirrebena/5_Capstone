

async function handleSubmit(event) {
    event.preventDefault();
    console.log('Submit event working')

    const errorMessage = document.getElementById('error_message')
    errorMessage.innerHTML = ""
    document.getElementById('trip_destination').innerHTML = ""
    document.getElementById('departure_date').innerHTML = ""
    document.getElementById('return_date').innerHTML = ""
    

      const tripDestination = document.getElementById('trip_destination').value
      console.log(`City: ${tripDestination}`)
      if (tripDestination == "") {
          errorMessage.innerHTML = "Please enter a destination"
        return
      }
      
      const departureDate = document.getElementById('departure_date').value
      if (departureDate == "") {
          errorMessage.innerHTML = "Enter departure date"
          return
      }
      console.log(`Departure date: ${departureDate}`)
  
      
      const returnDate = document.getElementById('return_date').value
      if (returnDate == "") {
          errorMessage.innerHTML = "Enter return date"
          return
      }
      console.log(`Return date: ${returnDate}`)

      const today = new Date();
      const startDate = new Date(departureDate);
      const endDate = new Date(returnDate);
       

      const travelTime = endDate.getTime() - startDate.getTime();
      const daysTravelling = timeUnitConversion(travelTime);
      console.log(daysTravelling);
  

      const timeUntilTrip = startDate.getTime() - today;
      const daysUntilTrip = timeUnitConversion(timeUntilTrip) + 1;
      console.log(daysUntilTrip);

    let tripData = {}
    tripData = { 
        tripDestination, 
        departureDate, 
        returnDate, 
        daysUntilTrip, 
        daysTravelling }
    console.log(tripData)


        const geonamesData = await callServer('callgeoNames', tripData)
        if (geonamesData == null) {
            errorMessage.innerHTML = "Couldn't connect to server. Try again later."
        return null
         }   
         console.log(bigData.cityData)


        const weatherbitData = await callServer('callWeather', tripData)
        if (weatherbitData == null) {
            errorMessage.innerHTML = "Couldn't connect to server. Try again later."
            return null
        }
        console.log(weatherbitData)

     
        const photoData = await callServer('callPhotos', tripData)
        if (photoData == null) {
            errorMessage.innerHTML = "Couldn't connect to server. Try again later."
            return null
        }
        console.log(photoData)

        const countryData = await callServer('callLanguage', tripData)
        if (countryData == null) {
            errorMessage.innerHTML = "Couldn't connect to server. Try again later."
            return null
        }
        console.log(countryData)

        const getDataTrip = await callServer('http://localhost:8081/tripDetails')
        console.log(getDataTrip);

        updateUI(getDataTrip)

}
  

async function callServer(url, tripData){
    try {
        const response = await fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tripData)
        })
        if (!response.correct) {
            console.log(`Error`)
            return null
        }
        const responseJSON = await response.json()
        return responseJSON
    } catch (error) {
        console.log(`Error connecting to server: ${error}`)
        return null
    }
}

function updateUI() {

    document.getElementById('destination').innerHTML = details.tripDestination;
    document.getElementById('departure').innerHTML = details.departureDate;
    document.getElementById('return').innerHTML = details.returnDate;
    document.getElementById('trip_duration').innerHTML = details.daysTravelling;

}



function checkLocalStorage(event) {
    if (localStorage.tripData) {
        const tripData = JSON.parse(localStorage.getItem('tripData'))
        Client.updateUI(tripData)
    }
}

function clearLocalStorage(event) {
    localStorage.clear()
    location.reload()
}

const timeUnitConversion = (timeInMilliseconds) => {
    let timeInDays = timeInMilliseconds/(1000 * 60 * 60 * 24);
    return Math.ceil(timeInDays);
  }

export { handleSubmit, callServer, updateUI, checkLocalStorage, clearLocalStorage }
