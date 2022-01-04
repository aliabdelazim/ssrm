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
    center: {lat: 24.720955,lng: 46.850254},
    zoom: 13,
    pixelRatio: window.devicePixelRatio || 1
  });
  
  
  // add a resize listener to make sure that the map occupies the whole container
  window.addEventListener('resize', () => map.getViewPort().resize());
  
  // Step 3: make the map interactive
  // MapEvents enables the event system
  // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
  var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
  
  // Create the default UI components
  var ui = H.ui.UI.createDefault(map, defaultLayers);