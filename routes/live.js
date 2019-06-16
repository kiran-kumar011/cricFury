var express = require('express');
var router = express.Router();

// importing schemas models from models. 
var Match = require('../models/Match');
var Admin = require('../models/Admin');
var Innings = require('../models/Innings');
var BattingScoreCard = require('../models/BattingScoreCard');
var BowlingScoreCard = require('../models/BowlingScoreCard');
var Team = require('../models/Team');
var Player = require('../models/Player');

router.get('/', (req, res) => {
	console.log(req.session.matchId, '...........stored match id...........');
	// Match.findOne({_id: match._id})
	// .populate({
	// 	path: 'team1',
	// 	populate : {
	// 		path: 'players',
	// 		select: {playerName:1, id:1}
	// 	}
	// })
	// .populate({
	// 	path: 'team2',
	// 	populate: {
	// 		path: 'players',
	// 		select: {playerName:1, id:1}
	// 	}
	// })
	// .exec((err, match) => {
	// 	if(err) return console.log(err);
	// 	if(match) {
	// 		console.log(req.session.matchId, '............from match.............',req.session.userId);
	// 		res.render('update', { match });
	// 	}
	// })
	res.send('create the whole scoring page');
});




module.exports = router;