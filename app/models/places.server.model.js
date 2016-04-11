'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var util = require('util');

/**
 * Place Schema
 */
function AbstractPlaceSchema() {
    Schema.apply(this, arguments);

    this.add({
        name: {
            type: String,
            trim: true,
            default: ''
        },
        logo: {
            data: Buffer,
            contentType: String
        },
        address: {
            type: String,
            trim: true,
            default: ''
        },
        hours: String,
        website: {
            type: String,
            trim: true,
            default: ''
        },
        yelpId: String,
        coordinates: 
        {
            longitude: {
                type: Number,
                default: -111.658492
            },
            latitude: {
                type: Number,
                default: 40.233622
            }
        }
    });
}

util.inherits(AbstractPlaceSchema, Schema);

var PlaceSchema = new AbstractPlaceSchema();

var GovBSchema = new AbstractPlaceSchema({
    govBDept: String,
    govBServices: {
        type: [String],
        index: true
    }
});

var RestauranteSchema = new AbstractPlaceSchema({
    menu: {
        data: Buffer,
        contentType: String
    },
    type: String, //TODO change to enumeration
    price: Number,
    yelpReview: String
});

var StoreSchema = new AbstractPlaceSchema({
    type: String, //TODO change to enumeration
    inventory: [{
        item: String,
        quantity: {
            type: Number,
            default: 0
        }
    }]
});

var LocationSchema = new AbstractPlaceSchema({
    type: String, //TODO change to enumeration
    activities: String
});

var Place = mongoose.model('Place', PlaceSchema);
var GovB = mongoose.model('GovB', GovBSchema);
var Restaurant = mongoose.model('Restaurant', RestauranteSchema);
var Store = mongoose.model('Store', StoreSchema);
var Location = mongoose.model('Location', LocationSchema);