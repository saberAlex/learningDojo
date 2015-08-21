var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');


function readJSONFile(filename, callback) {
  fs.readFile(filename, function (err, data) {
    if(err) {
      callback(err);
      return;
    }
    try {
      callback(null, JSON.parse(data));
    } catch(exception) {
      callback(exception);
    }
  });
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/data', function(req, res, next) {
	readJSONFile('category.json', function (err, json) {
	  if(err) { throw err; }
	  console.log(json);
	  res.setHeader('Content-Type', 'application/json');
	  res.send(json);
	});
});

module.exports = router;
