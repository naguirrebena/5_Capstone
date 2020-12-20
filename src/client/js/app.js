

export async function handleSubmit(event) {
    event.preventDefault();
    console.log('Submit event working')

      const destination = document.getElementById('trip_destination').value;
      const departureDate = document.getElementById('departure_date').value;
      const returnDate = document.getElementById('return_date').value;
      

      const startDate = new Date(departureDate);
      const endDate = new Date(returnDate);

      const currentDate = new Date();
      const newDate = currentDate.getMonth() + "-" + currentDate.getDate() + "-" + currentDate.getFullYear();
      console.log(`newDate: ${newDate}`)

      const tripDuration = endDate.getTime() - startDate.getTime();
      const daysTravelling = tripDuration / (1000 * 3600 * 24);
      console.log(daysTravelling);
  
      const timeUntilTrip = startDate.getTime() - currentDate.getTime();
      const daysUntilTrip = Math.round(timeUntilTrip / (1000 * 3600 * 24));
      console.log(daysUntilTrip);

    //   const travelCard = document.getElementById('travel-card');
    //   const travelResults = document.getElementById('travel-results');

    await postData('http://localhost:8081/newTrip', {
        location: destination,
        startDate: startDate,
        endDate: endDate,
        duration: daysTravelling,
        daysUntilTrip: daysUntilTrip
      });
    
      await Client.getData('http://localhost:8081/geonameData')
      await Client.getData('http://localhost:8081/weatherBit')
      await Client.getData('http://localhost:8081/pixabay')
      await Client.updateUI('http://localhost:8081/all')



}

const postData = async ( url='', data={})=>{
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      credentials: 'same-origin',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
      } catch (error) {
        console.log('error', error)
      }
    }

const Client.getData = async (url) => {
    const response = await fetch(url);
    try {
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log('error', error)
    }
  };
 

export const CLient.updateUI = async (url) => {
    const response = await fetch(url);
    try {
      const data = await response.json();
      document.getElementById("destination_image").src = data.img;
      document.getElementById("destination").innerHTML = `${data.location}`
      document.getElementById("departure").innerHTML = `${data.startDate}`
      document.getElementById("return").innerHTML = `${data.endDate}`
      document.getElementById("trip_duration").innerHTML = `${data.duration} days`
      document.getElementById("trip-start").innerHTML = `${data.daysToTrip} days from now`
      document.getElementById("days_left").innerHTML = `${data.temp}°F`
      document.getElementById("weather_desc").innerHTML = `${data.description}`
    } catch (error) {
      console.log("error", error);
    }
  };
  
  
  