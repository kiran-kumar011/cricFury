var router = require('express').Router();
var Team = require('../models/Team');
var Player = require('../models/Player');
var Match = require('../models/Match');
var Admin = require('../models/Admin');
var cricketController = require('../controllers/cricketController');




router.post('/new/team', cricketController.post_newTeam);


router.get('/host/match', cricketController.get_hostMatch);


router.post('/create/match', cricketController.post_hostMatch);


router.get('/score/update', (req, res) => {
	console.log(req.session.match, '.............stored.........');
});

router.post('matches/update/toss/bat/bowl', cricketController.updateOversTossAndOptedTo);




router.get('/matches/innings/update', cricketController.getMatchDetails);


module.exports = router;








