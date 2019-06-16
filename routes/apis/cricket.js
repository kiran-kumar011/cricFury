var express = require('express');
var router = express.Router();
var cricketController = require('../../controllers/cricketController');


router.get('/new/team', cricketController.get_newTeam);


router.post('/new/team', cricketController.post_newTeam);


router.get('/host/match', cricketController.get_hostMatch);


router.post('/score/update', cricketController.post_hostmatch);


router.get('/score/update', (req, res) => {
	console.log(req.session.match, '.............stored.........');
});


router.post('/matches/innings/update', cricketController.addInningsToMatch);


router.get('/matches/innings/update', cricketController.getMatchDetails);


module.exports = router;
