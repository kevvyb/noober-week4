window.addEventListener('DOMContentLoaded', async function() {
  let response = await fetch('https://kiei451.com/api/rides.json')
  let json = await response.json()

  // writes the returned JSON to the console
  console.dir(json)

  
  // 🔥 start here: write the recipe (algorithm), then write the code
  
  //function to determine ride type
  function rideType(numPass,purpRequest) {
    if (purpRequest) {
      service = `Purple`
    } else if (numPass > 3) {
      service = `XL`
    } else {
      service = `X`
    }
    return service
  }

  //function to get border color
  function borderColor(service){
    if (service == `XL`){
      return `blue`
    }
    else if (service == "Purple"){
      return `purple`
    }
    else {
      return `yellow`
    }

  }

  //function to create the individual div object
  function riderTileCreate(name,number,pickupAdd, pickupCity, pickupState,pickupZip, dropoffAdd, dropoffCity,dropoffState,dropoffZip, numPass, borderColor){
    return (
    `<div class="border-4 border-gray-900 p-4 my-4 text-left">
      <div class="flex">
        <div class="w-1/2">
          <h2 class="text-2xl py-1">${name}</h2>
          <p class="font-bold text-gray-600">${number}</p>
        </div>
        <div class="w-1/2 text-right">
          <span class="rounded-xl bg-${borderColor}-600 text-white p-2">
            ${numPass} Passengers
          </span>
        </div>
      </div>
      <div class="mt-4 flex">
        <div class="w-1/2">
          <div class="text-sm font-bold text-gray-600">PICKUP</div>
          <p>${pickupAdd}</p>
          <p>${pickupCity}, ${pickupState} ${pickupZip}</p>
        </div>
        <div class="w-1/2">
          <div class="text-sm font-bold text-gray-600">DROPOFF</div>
          <p>${dropoffAdd}</p>
          <p>${dropoffCity}, ${dropoffState} ${dropoffZip}</p>
        </div>
      </div>
    </div>`
    )
  }

  //funciton to create header div object
  function headerTileCreate(service){
    return(
    `<h1 class="inline-block mt-8 px-4 py-2 rounded-xl text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
      <i class="fas fa-car-side"></i>
      <span>Noober ${service}</span>
    </h1>`
    )
  }

  //create a variable for the html element we're going to add to
  let riderList = document.querySelector(`.rides`)
  console.log(riderList)

  //loop through the json to pull each ride information
  for (i=0; i<json.length; i++){
    ride = json[i]
    //console.log(ride)
    firstName = ride.passengerDetails.first
    lastName = ride.passengerDetails.last
    passName = `${firstName} ${lastName}`
    phone = ride.passengerDetails.phoneNumber
    numPass = ride.numberOfPassengers
    dropOffAdd = ride.dropoffLocation.address
    dropOffCity = ride.dropoffLocation.city
    dropOffState = ride.dropoffLocation.state
    dropOffZip = ride.dropoffLocation.zip
    pickupAdd = ride.pickupLocation.address
    pickupCity = ride.pickupLocation.city
    pickupState = ride.pickupLocation.state
    pickupZip = ride.pickupLocation.zip
    purRequest = ride.purpleRequested

    service = rideType(numPass,purRequest)
    color = borderColor(service)
    rideInfoDiv = riderTileCreate(passName, phone, pickupAdd,pickupCity,pickupState,pickupZip,dropOffAdd,dropOffCity,dropOffState,dropOffZip,numPass,color)
    headerDiv = headerTileCreate(service)
    console.log(rideInfoDiv)
    riderList.insertAdjacentHTML(`beforeend`, headerDiv)
    riderList.insertAdjacentHTML(`beforeend`,rideInfoDiv)
  }

  //empty the rides div element

})