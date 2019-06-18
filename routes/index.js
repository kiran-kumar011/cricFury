var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});


router.get('/login', function(req, res) {
  res.render('index');
});

router.get('/create/team', (req, res) => {
	res.render('index')
})

router.get('/live/update', (req, res) => {
	res.render('index')
})


router.get('/create/match', (req, res) => {
	res.render('index')
})

router.get('/signup', function(req, res) {
  res.render('index');
});

router.get('/logout', (req, res) => {
	res.render('index');
})

router.get('/profile', function(req, res) {
  res.render('index');
});

module.exports = router;
