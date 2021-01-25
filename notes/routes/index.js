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

// Add Note.
router.get('/notes/add', (req, res, next) => {
  res.render('noteedit', {
      title: "Add a Note",
      docreate: true,
      notekey: "", note: undefined
  });
});

router.get('/notes/view', async (req, res, next) => {
  var note = await notes.read(req.query.key);
  res.render('noteview', {
      title: note ? note.title : "",
      notekey: req.query.key, note: note
  });
});

// Ask to Delete note (destroy)
router.get('/notes/destroy', async (req, res, next) => {
  var note = await notes.read(req.query.key);
  res.render('notedestroy', {
      title: note ? note.title : "",
      notekey: req.query.key, note: note
  });
});
// Ask to Delete note (destroy)
router.get('/notes/destroy', async (req, res, next) => {
  var note = await notes.read(req.query.key);
  res.render('notedestroy', {
      title: note ? note.title : "",
      notekey: req.query.key, note: note
  });
});

// Really destroy note (destroy)
router.post('/notes/destroy/confirm', async (req, res, next) => {
  await notes.destroy(req.body.notekey);
  res.redirect('/');
});

module.exports = router;
