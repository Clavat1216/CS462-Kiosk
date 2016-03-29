var express = require('express');
var router = express.Router();

var postsStore = require('../postsStore');

/*

REST API - CRUDS

CREATE  HTTP  POST    /
READ    HTTP  GET     /:id
UPDATE  HTTP  PUT     /:id
DELETE  HTTP  DELETE  /:id
SEARCH  HTTP  GET     /

*/

// CREATE
router.post('/', function(req, res) {

  var id = postsStore.add(req.body);
  res.json({
    id: id
  });

});

// READ
router.get('/:id', function(req, res) {

  var post = postsStore.get(req.params.id);
  if (post) {
    res.json(post);
  } else {
    res.sendStatus(404);
  }

});

// UPDATE
router.put('/:id', function(req, res) {

  var id = req.params.id;
  var post = req.body;
  var success = postsStore.update(id, post);
  if (success) {
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }

});

// DELETE
router.delete('/:id', function(req, res) {

  var id = req.params.id;
  var success = postsStore.del(id);
  if (success) {
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }

});

// SEARCH
router.get('/', function(req, res) {

  var posts = postsStore.get();
  res.json(posts);

});


module.exports = router;
