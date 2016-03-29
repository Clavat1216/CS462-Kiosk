var map;
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var youHereLat = 40.233622;
var youHereLong = -111.658492;

var defaultLat = 40.233622;
var defaultLong = -111.658492;

$(window).load(function () {
    google.maps.Map.prototype.markers = new Array();

    google.maps.Map.prototype.bindMarker = function (marker) {
        this.markers[this.markers.length] = marker;
    };

    google.maps.Map.prototype.getMarkers = function () {
        return this.markers
    };

    google.maps.Map.prototype.clearMarkers = function () {
        for (var i = 0; i < this.markers.length; i++) {
            this.markers[i].setMap(null);
        }
        this.markers = new Array();
    };

    initializeMap();

    createYouAreHereMarker();
    
    loadModel();
})

function initializeMap() {

    directionsDisplay = new google.maps.DirectionsRenderer();
    var mapProp = {
        center: new google.maps.LatLng(defaultLat, defaultLong),
        zoom: 17,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
    directionsDisplay.setMap(map);
    
    

    //    var marker = new google.maps.Marker({
    //        position: new google.maps.LatLng(40.233622, -111.658492),
    //        map: map,
    //        title: 'You Are Here',
    //        clickable: false,
    //        icon: '/imgs/yhere.png'
    //    });
}

function createYouAreHereMarker() {
    addMarker('Home', youHereLat, youHereLong, 'You are Here', true, refreshContactList);
}

function refreshContactList() {
    alert('You Are Here');
}

function calcRoute(endLat, endLong, startLat, startLong) {
    startLat = (typeof startLat === "undefined") ? youHereLat : startLat;
    startLong = (typeof startLong === "undefined") ? youHereLong : startLong;

    var request = {
        origin: new google.maps.LatLng(startLat, startLong),
        destination: new google.maps.LatLng(endLat, endLong),
        travelMode: google.maps.DirectionsTravelMode.WALKING
    };
    directionsService.route(request, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        }
    });
}

function addMarker(placeType, latitude, longitude, titleP, isClickable, clickFunction) {

    /*
    Optional Parameters set to default
    */
    isClickable = (typeof isClickable === "undefined") ? false : isClickable;
    clickFunction = (typeof clickFunction === "undefined") ? function () {
        Console.log(titleP);
    } : clickFunction;

    var iconImage;
    if (placeType == 'Restaurant')
        iconImage = "http://maps.google.com/mapfiles/kml/pal2/icon46.png";
    else if (placeType == 'GovB')
        iconImage = "http://maps.google.com/mapfiles/kml/pal2/icon8.png";
    else if (placeType == 'Store')
        iconImage = "http://maps.google.com/mapfiles/kml/pal3/icon26.png";
    else if (placeType == 'Location')
        iconImage = "http://maps.google.com/mapfiles/kml/pal2/icon13.png";
    else if (placeType == 'Home')
        iconImage = "/imgs/yhere.png";
    else
        iconImage = "http://maps.google.com/mapfiles/ms/micons/blue-dot.png";

    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(latitude, longitude),
        map: map,
        title: titleP,
        clickable: isClickable,
        icon: iconImage
    });

    google.maps.event.addListener(marker, "click", clickFunction);

    map.bindMarker(marker);

    return marker;
}

function clearMapRoutes()
{
    directionsDisplay.setDirections({routes: []});
}