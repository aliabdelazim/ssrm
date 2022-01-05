let json = {
    "vehicles": [
      {
        "name": "Vechile 1",
        "trip": [
          {
            "id": 1,
            "startTime": 8888888,
            "routingLink": "adasd"
          },
          {
            "id": 8,
            "startTime": 999999,
            "routingLink": "adasd"
          }
        ]
      },
      {
        "name": "Vechile 2",
        "trip": [
          {
            "id": 1,
            "startTime": 8888888,
            "routingLink": "adasd"
          },
          {
            "id": 3,
            "startTime": 9999999,
            "routingLink": "adasd"
          }
        ]
      },
      {
        "name": "Vechile 3",
        "trip": [
          {
            "id": 1,
            "startTime": 8888888,
            "routingLink": "adasd"
          },
          {
            "id": 3,
            "startTime": 9999999,
            "routingLink": "adasd"
          }
        ]
      },
      {
        "name": "Vechile 4",
        "trip": [
          {
            "id": 1,
            "startTime": 8888888,
            "routingLink": "adasd"
          },
          {
            "id": 3,
            "startTime": 9999999,
            "routingLink": "adasd"
          }
        ]
      }
    ]
  }


addVehicles();

/**
 * adds the list of vehicles collapsables
 */
function addVehicles() {
    var sidePage = document.getElementById('vehicles');
    for ( var i = 0; i < json.vehicles.length; i++) {
        var panel = '<div id="panel" class="vehicle-container">';
        panel+= '<button type="button" class="collapsible panel-head"><h4 class="vehicle-name">'
        panel+= json.vehicles[i].name + ' trips list</h4></button>'
        panel+= '<div class="content" id="vehicle">'
        panel+= addTripsToVehicle(json.vehicles[i].trip)
        panel+= '</div></div>'
        sidePage.innerHTML += panel;
    }
}

/**
 * 
 * @param {list of all vehicle trips} vehicleTrips 
 * @returns trips cards
 */
function addTripsToVehicle(vehicleTrips) {
    var trips = '';
    for (var i = 0; i < vehicleTrips.length; i++) {
        trips += '<div id="trip-card" class="trip-card">';
        trips += addTripDetails(vehicleTrips[i]);
        trips += '</div>'
    }
    return trips;
}

/**
 * 
 * @param {trip details data} trip 
 * @returns trip card content
 */
function addTripDetails(trip) {
    var tripContent =  '<p>'
    tripContent += '<label> id : </label><span>' +  trip.id + '</span></br>';
    tripContent += '<label> startTime : </label><span>' +  trip.startTime + '</span></br>';
    tripContent += '<label> routingLink : </label><a href="'+ trip.routingLink + '">' +  trip.routingLink + '</a>';
    tripContent += '</p>';
    return tripContent
}

/**
 * managing collapsable
 */
  var coll = document.getElementsByClassName("collapsible");
  var i;
  
  for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    });
  }
