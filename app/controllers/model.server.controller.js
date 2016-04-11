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

/**
 * Get Model
 */
exports.get = function(req, res){
    var model = {};
    var places = model['Places'] = {};
	GovB.find({}, function(err, govbs){
		if(err){
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}
		else{
            if (!('GovB' in places)) places['GovB'] = [];
            places['GovB'] = places['GovB'].concat(govbs);

            Restaurant.find({}, function(err, restaurants){
                if(err){
                    return res.status(400).send({
                        message: errorHandler.getErrorMessage(err)
                    });
                }
                else{
                    if (!('Restaurant' in places)) places['Restaurant'] = [];
                    places['Restaurant'] = places['Restaurant'].concat(restaurants);

                    Store.find({}, function(err, stores){
                        if(err){
                            return res.status(400).send({
                                message: errorHandler.getErrorMessage(err)
                            });
                        }
                        else{
                            if (!('Store' in places)) places['Store'] = [];
                            places['Store'] = places['Store'].concat(stores);

                            Location.find({}, function(err, locations){
                                if(err){
                                    return res.status(400).send({
                                        message: errorHandler.getErrorMessage(err)
                                    });
                                }
                                else{
                                    if (!('Location' in places)) places['Location'] = [];
                                    places['Location'] = places['Location'].concat(locations);
                                    res.json(model);
                                }
                            });
                        }
                    });
                }
            });
        }
    });
};

/**
 * Add Place
 */
exports.addPlace = function(req, res){
	//Add place to db
	var place = new Place(req.body);
	var type = req.type;
	switch(type)
            {
		case 'GovB':
			place = new GovB(req.body);
			place.govBDept = req.govBDept;
			place.govBServices = req.govBServices;
			break;
		case 'Restaurant':
			place = new Restaurant(req.body);
			place.menu = req.menu;
			place.type = type;
			place.price = req.price;
			place.yelpReview = req.yelpReview;
			break;
		case 'Store':
			place = new Store(req.body);
			place.type = type;
			place.inventory = req.inventory;
			break;
		case 'Location':
			place = new Location(req.body);
			place.type = type;
			place.activities = req.activities;
			break;
    }
	place.name = req.name;
	place.logo = req.logo;
	place.address = req.address;
	place.hours = req.address;
	place.website = req.website;
	place.yelpId = req.yelpId;
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
};

exports.removePlace = function(req, res){
	//Remove place from db
	var place = req.place;
	place.remove(function(err){
		if(err){
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}
		else{
			res.json(place);
		}
	});
};

exports.updatePlace = function(req, res){
	//Update place in db
	var place = req.place;
	place = _.extend(place, req.body);
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
};




