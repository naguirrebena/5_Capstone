

    const tripDetails = document.getElementById('trip_details');
    const tripPlan = document.getElementById('trip_plan');

export async function handleSubmit(event) {
    event.preventDefault();
    console.log('Submit event working')

      const destination = document.getElementById('trip_destination').value;
      const departureDate = document.getElementById('departure_date').value;
      const returnDate = document.getElementById('return_date').value;
      
    const currentDate = new Date();
   const startDate = new Date(departureDate);
   const endDate = new Date(returnDate);

   const travelTime = endDate.getTime() - startDate.getTime();
   const daysTravelling =  travelTime / (1000 * 3600 * 24);
   console.log(daysTravelling);

   const timeUntilTrip = startDate.getTime() - currentDate.getTime();
   const daysUntilTrip = Math.round(timeUntilTrip / (1000 * 3600 * 24));
   console.log(daysUntilTrip);



  await postData('http://localhost:8081/newTrip', {
      Location: destination,
      Start: startDate,
      End: endDate,
      Duration: daysTravelling,
      TimeUntilTravel: daysUntilTrip
    })
  
    await getData('http://localhost:8081/geonamesData')
    await getData('http://localhost:8081/weatherBit')
    await getData('http://localhost:8081/pixabay')

    const getTripData = await getData(`http://localhost:8081/all`);

    console.log(getTripData);
    updateUI(getTripData)

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
        console.log('error', error);
      }
    }

    const getData = async (url) => {
      const response = await fetch(url);
      try {
        const data = await response.json();
        console.log(data);
        return data;
      } catch (error) {
        console.log("error", error);
      }
    };

export const updateUI = async () =>{
  const request = await fetch('/all');
  console.log(request)
  try {
    const allData = await request.json()
  document.getElementById('destination').innerHTML = allData.location;
  document.getElementById('departure').innerHTML = allData.startDate;
  document.getElementById('return').innerHTML = allData.endDate;
  document.getElementById('duration').innerHTML = allData.duration;
  document.getElementById('days_left').innerHTML = allData.daysToTrip;
  document.getElementById('weather').innerHTML = allData.weatherDesc;
  document.getElementById('destination_image').innerHTML = allData.img;

  }  catch(error) {
    console.log("error", error);
  }
};

