var express = require('express');
var router = express.Router();

var model = require('../app/controllers/model.server.controller');
var users = require('../app/controllers/users.server.controller');
var places = require('../app/controllers/places.server.controller');

router.get('/', model.get);

//router.post('/add', users.requiresLogin, places.add);
router.post('/add', places.add);

router.param('placeId', places.placeByID);
router.put('/edit/:placeId', places.edit);
router.delete('/remove/:placeId', places.remove);

module.exports = router;
