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
  
  function drawRoute(){

        const url = 'http://localhost/ssrm/Response_SRM.json';
        var points = [];
    fetch(
        url,
        {
            headers: { "Content-Type": "application/json" },         
            method: "Get"
        }
    )
    .then(data => data.json())
    .then((json) => {
    
      for (var item in json.routePointWithDetails) { 
        var linestring = new H.geo.LineString();
        var linesegment = json.routePointWithDetails[item];
        linesegment.routePoints.forEach(function(point) {
          linestring.pushPoint(point);
        });

        // Initialize a polyline with the linestring:
        var polyline = new H.map.Polyline(linestring, { style: { lineWidth: 3}});

        // Add the polyline to the map:
        map.addObject(polyline);
      }  
    });
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