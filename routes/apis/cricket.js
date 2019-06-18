var express = require('express');
var router = express.Router();
var cricketController = require('../../controllers/cricketController');


router.get('/new/team', cricketController.get_newTeam);


router.post('/new/team', cricketController.post_newTeam);


router.get('/create/match', cricketController.get_hostMatch);


router.post('/create/match', cricketController.post_hostMatch);


router.get('/score/update', (req, res) => {
	console.log(req.session.match, '.............stored.........');
});


router.post('/matches/update/toss/bat/bowl', cricketController.updateTossAndOptedTo);

router.post('/matches/innings/update', cricketController.addInningsToMatch);


router.get('/matches/innings/update', cricketController.getMatchDetails);


module.exports = router;
