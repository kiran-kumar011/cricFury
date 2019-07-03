var express = require('express');
var router = express.Router();
var cricketController = require('../../controllers/cricketController');


router.post('/new/team', cricketController.post_newTeam);


router.get('/create/match', cricketController.get_hostMatch);


router.post('/create/match', cricketController.post_hostMatch);



router.post('/matches/update/toss/bat/bowl', cricketController.updateOversTossAndOptedTo);


router.get('/matches/innings/update', cricketController.getMatchDetails);



router.get('/match/update/firstInnings', (req, res) => {
	console.log('hey...........', req.session.matchId)
	Match.findById({_id: req.session.matchId})
	.populate({
		path: 'team1',
		populate: 'players',
		select: {playerName: 1, id:1}
	}).populate({
		path: 'team2',
		populate: 'players',
		select: {playerName: 1, id:1}
	}).populate({
		path : 'firstInnings'
	}).populate({
		path: 'secondInnings'
	}).exec((err, match) => {
		if(err) return res.status(500).json({'error': err});
		return res.json({match});
	})
})

module.exports = router;
