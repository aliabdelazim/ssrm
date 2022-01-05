/**
 * Boilerplate map initialization code starts below:
 */

// set up containers for the map + panel
var mapContainer = document.getElementById('map'),
  routeInstructionsContainer = document.getElementById('panel');

// Step 1: initialize communication with the platform
 // In your own code, replace variable window.apikey with your own apikey
 var platform = new H.service.Platform({
    apikey: "CHxAmo_Q-UwWjf3giMYx7zB5bhRfPOHTXtoxms7M9PE"
  });
  
  var defaultLayers = platform.createDefaultLayers();
  
  // Step 2: initialize a map - this map is centered over Berlin 24.764842, 46.784035
  var map = new H.Map(mapContainer,
    defaultLayers.vector.normal.map, {
    center: {lat: 25.019856,lng: 55.145438},
    zoom: 13,
    pixelRatio: window.devicePixelRatio || 1
  });
  
  function drawRoute(tripid,vid){

    
    var found = false;
    var shouldbelocation = false;
    map.removeObjects(map.getObjects ())
    const now = Date.now();
    for ( var i = 0; i < json.vehicleTrips.length; i++) {
      if(found == true)
      {
        break;
      }
      if(json.vehicleTrips[i].vehicleId == vid)
      {
        var vehicleTrips = json.vehicleTrips[i].trips
      
       

        for (var i = 0; i < vehicleTrips.length; i++) {
          if(vehicleTrips[i].id ==tripid)
          {
            var startTripTime =vehicleTrips[i].startTimeUTC
            var diff = (now - startTripTime) / 1000;

            found = true;
            var linestring = new H.geo.LineString();
            for (var item in vehicleTrips[i].route) { 
             
              var linesegment = vehicleTrips[i].route[item];
              if(shouldbelocation == false)
              {
                var time = vehicleTrips[i].route[item].time;
                if(diff < time)
                {
                  shouldbelocation = true;
                  var marker = new H.map.Marker({
                    lat: linesegment.routePoints[0].lat,
                    lng: linesegment.routePoints[0].lng
                  });
                  // add custom data to the marker                  
                  map.addObject(marker);
                }
              }
              linesegment.routePoints.forEach(function(point) {
                linestring.pushPoint(point);
              });
            }
             // Initialize a polyline with the linestring:
             var polyline = new H.map.Polyline(linestring, { style: { lineWidth: 2}});
      
             // Add the polyline to the map:
             map.addObject(polyline);
              // And zoom to its bounding rectangle
             map.getViewModel().setLookAtData({
               bounds: polyline.getBoundingBox()
             });
            break;
          }
        }
      }
    }
    
     
   
    // Define points to represent the vertices of a short route in Berlin, Germany:
     
     

      // Initialize a linestring and add all the points to it:
      


  }
  
  // add a resize listener to make sure that the map occupies the whole container
  window.addEventListener('resize', () => map.getViewPort().resize());
  
  // Step 3: make the map interactive
  // MapEvents enables the event system
  // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
  var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
  
  // Create the default UI components
  var ui = H.ui.UI.createDefault(map, defaultLayers);

  var x =document.getElementsByClassName('H_logo');
  var y =document.getElementsByClassName('H_copyright');
  
    var j;
    for (j = 0; j < x.length; j++) {
        x[j].style.display = 'none';
    }
    for (j = 0; j < y.length; j++) {
      y[j].style.display = 'none';
  }