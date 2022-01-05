
let json;


  const url = './response.json';
  var points = [];
fetch(
  url,
  {
      headers: { "Content-Type": "application/json" },         
      method: "Get"
  }
)
.then(data => data.json())
.then((json1) => {
 json = json1;
 addVehicles();
 handlingCollapse();
 search();
});


/**
 * adds the list of vehicles collapsables
 */
function addVehicles() {
    var sidePage = document.getElementById('vehicles');
    for ( var i = 0; i < json.vehicleTrips.length; i++) {
        var panel = '<div id="panel" class="vehicle-container">';
        panel+= '<button type="button" class="collapsible panel-head"><p class="vehicle-name">'
        panel+= json.vehicleTrips[i].vehicleId + '-' + json.vehicleTrips[i].vehicleTypeId + '</p><i class="fa fa-minus"></i></button>'
        panel+= '<div class="content" id="vehicle">'
        panel+= addTripsToVehicle(json.vehicleTrips[i].trips,json.vehicleTrips[i].vehicleId)
        panel+= '</div></div>'
        sidePage.innerHTML += panel;
    }
}

/**
 * 
 * @param {list of all vehicle trips} vehicleTrips 
 * @returns trips cards
 */
function addTripsToVehicle(vehicleTrips,vid) {
    var trips = '';
    for (var i = 0; i < vehicleTrips.length; i++) {
        trips += '<div id="trip-card" class="trip-card">';
        trips += addTripDetails(vehicleTrips[i],vid);
        trips += '</div>'
    }
    return trips;
}

/**
 * 
 * @param {trip details data} trip 
 * @returns trip card content
 */
function addTripDetails(trip,vid) {
    var datestart = new Date(trip.startTimeUTC);
    var dateeta = new Date(trip.etautc);
    var now = new Date().getTime();
    var isInProgress = dateeta.getTime() > now;

    var tripContent =  '<div>'
    tripContent += '<div class="trip-card-header"><p class"trip-id-container"><label class="trip-id"> Id : </label><span class="trip-id">' +  trip.id + '</span></p>';
                   isInProgress ? tripContent += '<span class="onprogress-label">onprogress</span></div>' : tripContent += '<span class="completed-label">completed</span></div>'
    tripContent += '<label class="trip-details"> Start Time : </label><span class="trip-details">' +  
                    datestart.getDate() + '/'+ datestart.getMonth()+1 + '/'+ datestart.getFullYear() + '-' +
                    datestart.getUTCHours() + ':' + datestart.getMinutes() + '</span></br>';
    tripContent += '<label class="trip-details"> Loaded Capacity : </label><span class="trip-details">' +  trip.loadedCapacity + '</span></br>';
    tripContent += '<label class="trip-details"> ETA" : </label><span class="trip-details">' + 
                     dateeta.getDate() + '/'+ dateeta.getMonth()+1 + '/'+ dateeta.getFullYear() + '-' +
                     dateeta.getUTCHours() + ':' + dateeta.getMinutes() + '</span></br>';
    tripContent += '<label class="trip-details"> Distance (m) : </label><span class="trip-details">' +  trip.distanceInMeter + '</span></br>';
    tripContent += `<label> Link : </label><a href="#" class="trip-details" onclick=drawRoute(${trip.id},${vid})>Route</a>`;  
    tripContent += '</div>';
    return tripContent
}

/**
 * managing collapsable
 */
function handlingCollapse() {
  var coll = document.getElementsByClassName("collapsible");
  for (var i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      if (content.style.display === "block" || content.style.display === "") {
        content.style.display = "none";
        this.innerHTML += '<i class="fa fa-plus"></i>'
        this.removeChild(this.childNodes[1]);  
      } else {
        content.style.display = "block";
        this.innerHTML += '<i class="fa fa-minus"></i>'
        this.removeChild(this.childNodes[1]);  
      }
    });
  }
}

function search() {
  var searchInput = document.getElementById('search');
  searchInput.addEventListener('change', function() {
    var sidePage = document.getElementById('vehicles');
    var searchValue = searchInput.value;
    sidePage.innerHTML = '';
    filteredVehicles = json.vehicleTrips.filter((vehicle)=> (vehicle.vehicleId.toString().includes(searchValue)));
    addFilteredVehicles(filteredVehicles);

  })
}

/**
 * adds the list of vehicles collapsables
 */
 function addFilteredVehicles(filteredVehicles) {
  var sidePage = document.getElementById('vehicles');
  for ( var i = 0; i < filteredVehicles.length; i++) {
      var panel = '<div id="panel" class="vehicle-container">';
      panel+= '<button type="button" class="collapsible panel-head"><p class="vehicle-name">'
      panel+= filteredVehicles[i].vehicleId + '-' + filteredVehicles[i].vehicleTypeId + '</p><i class="fa fa-minus"></i></button>'
      panel+= '<div class="content" id="vehicle">'
      panel+= addTripsToVehicle(filteredVehicles[i].trips,filteredVehicles[i].vehicleId)
      panel+= '</div></div>'
      sidePage.innerHTML += panel;
  }
}
 
