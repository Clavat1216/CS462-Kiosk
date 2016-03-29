var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	console.log("Test");
	res.redirect('./splashPage.html');
	// res.render('index', {
 //    	env: process.env.ENV || 'dev',
 //    	title: 'Demo NodeJS App'
 //  	});
});

module.exports = router;
