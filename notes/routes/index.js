var express = require('express');
var router = express.Router();
const notesMongo = require('../models/notes-mongo');

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/
router.get('/', async (req, res, next) => {
  let keylist = await notesMongo.keylist();
  res.render('index', { title: 'Notes', notelist: keylist });
});

module.exports = router;
