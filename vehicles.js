
let json;


  const url = 'http://localhost/ssrm/response.json';
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
});


/**
 * adds the list of vehicles collapsables
 */
function addVehicles() {
    var sidePage = document.getElementById('vehicles');
    for ( var i = 0; i < json.vehicleTrips.length; i++) {
        var panel = '<div id="panel" class="vehicle-container">';
        panel+= '<button type="button" class="collapsible panel-head"><h4 class="vehicle-name">'
        panel+= json.vehicleTrips[i].vehicleId + ' trips list</h4><i class="fas fa-minus"></i></button>'
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
    var tripContent =  '<p>'
    tripContent += '<label> Id : </label><span>' +  trip.id + '</span></br>';
    tripContent += '<label> Start Time : </label><span>' +  datestart.toString() + '</span></br>';
    tripContent += '<label> Loaded Capacity : </label><span>' +  trip.loadedCapacity + '</span></br>';
    tripContent += '<label> ETA" : </label><span>' +  dateeta.toString() + '</span></br>';
    tripContent += '<label> Distance (m) : </label><span>' +  trip.distanceInMeter + '</span></br>';
    tripContent += '<label> Link : </label><a href="#" onclick=drawRoute();>Route</a>';
    tripContent += '</p>';
    return tripContent
}

/**
 * managing collapsable
 */
  var coll = document.getElementsByClassName("collapsible");
  
  for (var i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      if (content.style.display === "block" || content.style.display === "") {
        content.style.display = "none";
        this.innerHTML += '<i class="fas fa-plus"></i>'
        this.removeChild(this.childNodes[1]);  
      } else {
        content.style.display = "block";
        this.innerHTML += '<i class="fas fa-minus"></i>'
        this.removeChild(this.childNodes[1]);  
      }
    });
  }
