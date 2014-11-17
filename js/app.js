/* app.js -- our application code */

"use strict";

// UW coordinates:
// lat: 47.655
// lng: -122.3080

$(document).ready(function () {
   function createMap(center, zoom) {
       var mapElem = document.getElementById('map');

       var map = new google.maps.Map(mapElem, {
           center: center,
           zoom: zoom
       });

       var marker = new google.maps.Marker({
          position: center,
          map: map,
           animation: google.maps.Animation.DROP
       });

       var infoWindow = new google.maps.InfoWindow();
       infoWindow.setContent('<h2> Here I am!</h2>');

       google.maps.event.addListener(marker, 'click', function() {
          console.log('marker clicked!');
           infoWindow.open(map, marker);
           map.panTo(center);
       });
   }

    function onGeoSuccess(position) {
        var center = {
            lat:position.coords.latitude,
            lng: position.coords.longitude
        };
        createMap(center, 14);
    }

    function onGeoError(error) {
        console.log(error);
    }

    var uwCoord = {
        lat: 20.8,
        lng: -156.333
    };
    createMap(uwCoord, 10);

    if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError, {
            enableHighAccuracy: true
        });
    } else {
        createMap(uwCoord, 10);
    }

});
