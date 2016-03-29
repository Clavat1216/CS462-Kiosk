'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
    Enum = require('enum');

var enumerate = function() {
    var enums = this.find();
    var names = [];
    for (var i = 0; i < names.length; ++i) {
        names.push(enums[i].state);
    }
    var newEnum = new Enum(names);
    return newEnum;
};

var message = 'enum validator failed for path `{PATH}` with value `{VALUE}`';
var state = function(enu) {
    return {
        type: String,
        enum: enu
    };
};

/**
 * Admin Level enum
 */
var adminEnu = {
    values: 'Admin  Editor'.split('  '),
    message: message
};
var AdminLevelSchema = new Schema({
    state: state(adminEnu)
});
AdminLevelSchema.static('enumerate', enumerate);
mongoose.model('AdminLevel', AdminLevelSchema);

/**
 * Restaurant Type enum
 */
var restaurantEnu = {
    values: 'Mexican  Chinese  Indian  Japanese  Spanish  Fast Food  Italian  Greek  Thai  Other'.split('  '),
    message: message
};
var RestaurantTypeSchema = new Schema({
    state: state(restaurantEnu)
});
RestaurantTypeSchema.static('enumerate', enumerate);
mongoose.model('RestaurantType', RestaurantTypeSchema);

/**
 * Location Type enum
 */
var locationEnu = {
    values: 'Dark Lair  Park  Parka  Parkoo'.split('  '),
    message: message
};
var LocationTypeSchema = new Schema({
    state: state(locationEnu)
});
LocationTypeSchema.static('enumerate', enumerate);
mongoose.model('LocationType', LocationTypeSchema);

/**
 * Store Type enum
 */
var storeEnu = {
    values: 'Candy  Clothes  Shoes  Department  Electronics  Toys  Boutique  Jewelry'.split('  '),
    message: message
};
var StoreTypeSchema = new Schema({
    state: state(storeEnu)
});
StoreTypeSchema.static('enumerate', enumerate);
mongoose.model('StoreType', StoreTypeSchema);
