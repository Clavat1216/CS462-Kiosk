var kiosk = kiosk || {};

kiosk.Place = (function PlaceClass() {

    var Place = (function () {


        function Place(placeJSON) {
            //TODO place default constructor
        }

        return Place;
    })();

    return Place;

})();

kiosk.GovB = (function GovBClass() {
    forceClassInherit(GovB, kiosk.Place);

    var GovB = (function () {


        function GovB(GovBJSON) {
            this.update(GovBJSON);
        }

        GovB.prototype.update = function (data) {
            this.name = data.name;
            this.logo = data.logo;
            this.address = data.address;
            this.hours = data.hours;
            this.website = data.website;
            this.govBDept = data.govBDept;
            this.govBServices = data.govBServices;
            this.coordinates = data.coordinates;
        };

        return GovB;
    })();

    return GovB;

})();


kiosk.Restaurant = (function RestaurantClass() {
    forceClassInherit(Restaurant, kiosk.Place);

    var Restaurant = (function () {


        function Restaurant(RestaurantJSON) {
            this.update(RestaurantJSON);
        }

        Restaurant.prototype.update = function (data) {
            this.name = data.name;
            this.logo = data.logo;
            this.address = data.address;
            this.hours = data.hours;
            this.website = data.website;
            this.menu = data.website;
            this.type = data.type;
            this.price = data.price;
            this.yelpReview = data.yelpReview;
            this.coordinates = data.coordinates;
        };

        return Restaurant;
    })();

    return Restaurant;

})();


kiosk.Store = (function StoreClass() {
    forceClassInherit(Store, kiosk.Place);

    var Store = (function () {


        function Store(StoreJSON) {
            this.update(StoreJSON);
        }

        Store.prototype.update = function (data) {
            this.name = data.name;
            this.logo = data.logo;
            this.address = data.address;
            this.hours = data.hours;
            this.website = data.website;
            this.type = data.type;
            this.inventory = data.inventory;
            this.coordinates = data.coordinates;
        };

        return Store;
    })();

    return Store;

})();

kiosk.Location = (function LocationClass() {
    forceClassInherit(Location, kiosk.Place);

    var Location = (function () {


        function Location(LocationJSON) {
            this.update(LocationJSON);
        }

        Location.prototype.update = function (data) {
            this.name = data.name;
            this.logo = data.logo;
            this.address = data.address;
            this.hours = data.hours;
            this.website = data.hours;
            this.type = data.type;
            this.activities = data.activities;
            this.coordinates = data.coordinates;
        };

        return Location;
    })();

    return Location;

})();

/**
	 Returns a newly created object that inherits properties from the
	 prototype object p.  It uses the ECMAScript 5 function Object.create() if
	 it is defined, and otherwise falls back to an older technique.
	 @method inherit
	 @param {Object} p Non-null object. P stands for parent. It's the object to extend
	 @return {Object} An object that extends p.
	 **/
function inherit(p) {
    if (p == null) throw TypeError(); // p must be a non-null object
    if (Object.create) // If Object.create() is defined...
        return Object.create(p); //    then just use it.
    var t = typeof p; // Otherwise do some more type checking
    if (t !== "object" && t !== "function") throw TypeError();

    function f() {}; // Define a dummy constructor function.
    f.prototype = p; // Set its prototype property to p.
    return new f(); // Use f() to create an "heir" of p.
};

function forceClassInherit(classA, classB) {
    if(typeof classA == "undefined" ||typeof classB == "undefined" )
        return;
    classA.prototype = inherit(classB.prototype);
    classA.prototype.constructor = classA;
}