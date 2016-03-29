var express = require('express');
var router = express.Router();

var users = require('../app/controllers/users.server.controller');

router.post('/register', users.signup);
router.post('/login', users.signin);
router.post('/logout', users.signout);

router.get('/me', users.me);
router.put('/', users.update);

router.post('/password', users.changePassword);
router.post('/forgot', users.forgot);
router.get('/reset/:token', users.validateResetToken);
router.post('/reset/:token', users.reset);

router.delete('/accounts', users.removeOAuthProvider);

// Finish by binding the user middleware
router.param('userId', users.userByID);

module.exports = router;
