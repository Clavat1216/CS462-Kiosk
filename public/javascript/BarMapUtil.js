function AddPlaceMarkers(places, typeOfPlace) {

    for (var index = 0; index < places.length; ++index) {
        var place = places[index];
        addMarker(typeOfPlace, place.coordinates.latitude, place.coordinates.longitude, place.name, true, (function () {
            markerClick(place.name, place, typeOfPlace, index);}));

    }
}

function RemoveMarkers() {
    map.clearMarkers();
    createYouAreHereMarker();
}

function markerClick(name, place, type, index) {
    socket.emit('marker-click', { yelpId: place.yelpId });
}

function drawRoute(place) {
    calcRoute(place.coordinates.latitude, place.coordinates.longitude);
}

function clearRoutes() {
    clearMapRoutes();
}