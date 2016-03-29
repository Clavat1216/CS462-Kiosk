function AddPlaceMarkers(places, typeOfPlace) {

    for (var index = 0; index < places.length; ++index) {
        var place = places[index];
        addMarker(typeOfPlace, place.coordinates.latitude, place.coordinates.longitude, place.name, true, (function () {
            markerClick(place.name, typeOfPlace, index);}));

    }
}

function RemoveMarkers() {
    map.clearMarkers();
    createYouAreHereMarker();
}

function markerClick(name, type, index) {
    //TODO
    // spotClicker(type, index);
}

function drawRoute(place) {
    calcRoute(place.coordinates.latitude, place.coordinates.longitude);
}

function clearRoutes() {
    clearMapRoutes();
}