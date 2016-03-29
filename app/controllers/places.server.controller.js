'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	_ = require('lodash'),
	GovB = mongoose.model('GovB'),
	Restaurant = mongoose.model('Restaurant'),
	Store = mongoose.model('Store'),
	Location = mongoose.model('Location');


exports.add = function(req, res){
	//Add place to db
    var place = req.body.place;
	switch(req.body.type){
		case 'GovB':
			place = new GovB(place);
			break;
		case 'Restaurant':
			place = new Restaurant(place);
			break;
		case 'Store':
			place = new Store(place);
			break;
		case 'Location':
			place = new Location(place);
			break;
    }
    if (place){
        place.save(function(err){
            if(err){
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            }
            else{
                res.json(place);
            }
        });
    }
    else{
        res.status(400).send();
    }
};

exports.edit = function(req, res){
    // Edit place in db
    var place = req.place;

    place = _.extend(place, req.body.place);

    place.save(function(err, place){
        if (err){
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }
        else{
            res.json(place);
        }
    });
}

exports.remove = function(req, res){
    // Remove place from db
    var place = req.place;

    place.remove(function(err){
        if (err){
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }
        else{
            res.json(place);
        }
    });
};

/**
 * Place Middleware
 */
exports.placeByID = function(req, res, next, id) {
    var Place = null;
    switch(req.body.type){
        case 'GovB':
            Place = GovB;
            break;
        case 'Restaurant':
            Place = Restaurant;
            break;
        case 'Store':
            Place = Store;
            break;
        case 'Location':
            Place = Location;
            break;
    }
    if (Place){
        Place.findById(id, function(err, place){
            if (err) return next(err);
            if (!place) return next(new Error('Failed to load place ' + id));
            req.place = place;
            next();
        });
    }
    else {
        return next(new Error('Failed to load place with type ' + req.body.type));
    }
}
