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

router.post('/notes/save', async (req, res, next) => {
  var note;
  console.log(req.body);
  if (req.body.docreate === "create") {
    note = await notesMongo.create(req.body.notekey,
      req.body.title, req.body.body);
  } else {
    note = await notes.update(req.body.notekey,
      req.body.title, req.body.body);
  }
  res.redirect('/notes/view?key='+ req.body.notekey);
});

router.get('/notes/view', async (req, res, next) => {
  var note = await notesMongo.read(req.query.key);
  res.render('noteview', {
    title: note ? note.title : "",
    notekey: req.query.key, note: note
  });
});

router.get('/notes/destroy', async (req, res, next) => {
  var note = await notesMongo.read(req.query.key);
  res.render('notedestroy', {
    title: note ? note.title : "",
    notekey: req.query.key, note: note
  });
});

router.post('/notes/destroy/confirm', async (req, res, next) => {
  await notesMongo.destroy(req.body.notekey);
  res.redirect('/');
});
module.exports = router;
