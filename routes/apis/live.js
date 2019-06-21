var express = require('express');
var router = express.Router(); 

var Match = require('../../models/Match');
var Admin = require('../../models/Admin');
var Innings = require('../../models/Innings');
var BattingScoreCard = require('../../models/BattingScoreCard');
var BowlingScoreCard = require('../../models/BowlingScoreCard');
var Team = require('../../models/Team');
var Player = require('../../models/Player');



router.get('/', (req, res) => {
	console.log('..............hello.......update live');
})



router.get('/match/update/firstInnings', (req, res) => {
	console.log('hey...........', req.session.matchId)
	Match.findById({_id: req.session.matchId})
	.populate({
		path : 'firstInnings',
		populate: {
			path: 'battingTeamId',
			populate: {
				path: 'players', 
				select: { playerName: 1, id: 1 }
			}
		}
	}).populate({
		path: 'firstInnings',
		populate: {
			path: 'bowlingTeamId',
			populate: {
				path: 'players', 
				select: { playerName: 1, id: 1 }
			}
		}
	}).exec((err, match) => {
		if(err) return res.status(500).json({'error': err});
		return res.json({match});
	})
})


router.post('/start/match/firstInnings', (req, res) => {
	console.log(req.body,'..........afterpost data');

	var striker = new BattingScoreCard({
		playerId: req.body.player1,
		matchId: req.session.matchId,
		numBattingPosition: 1,
		isBatting: true
	});

	var nonStriker = new BattingScoreCard({
		playerId: req.body.player2,
		matchId: req.session.matchId,
		numBattingPosition: 2,
		isBatting: true
	});

	var bowler = new BowlingScoreCard({
		playerId: req.body.bowler,
		matchId: req.session.matchId,
		numOversBowled: 0,
		numWickets: 0,
		numEconomy: 0,
		numMaiden: 0,
		numNoball: 0,
		numWides: 0,
		numGivenRuns: 0,
	});

	console.log('..........data stored', bowler, striker, nonStriker);
	striker.save((err, savedSriker) => {
		console.log('..........data stored', err, savedSriker)
		nonStriker.save((err, savedNonStriker) => {
			console.log('..........data stored',err, savedNonStriker)
			bowler.save((err, savedBowler) => {
				console.log('..........data stored',err, savedBowler)

				Innings.findOneAndUpdate({matchId: req.session.matchId }, 
					{ $push : 
						{
							batsmanScoreCard: { $each: [savedSriker._id, savedNonStriker._id]},
							bowlingScoreCard: savedBowler._id 
						}
					}, 
					{new:true}, 
					(err, innings) => {
					if(err) return res.status(500).json({'error' : err});
					console.log(innings, 'updated innings fields');

					Player.findByIdAndUpdate(savedBowler.playerId, 
						{ $push: { bowling: savedBowler._id}}, 
						{new: true}, 
						(err, player) => {
							if(err) return res.status(500).json({error: err})
							console.log(player, 'updated player schema...........');

							Player.findByIdAndUpdate(savedSriker.playerId, 
							{ $push : { batting: savedSriker._id}}, {new: true},
							(err, player) => {
								if(err) return res.status(500).json({error: err});
								console.log(player, 'updated batsmen striker in schema.......')
									
								Player.findByIdAndUpdate(savedNonStriker.playerId, 
									{ $push : { batting: savedNonStriker._id}}, {new: true},
									(err, player) => {
										if(err) return res.status(500).json({error: err});
										console.log(player, 'updated batsmen nonStriker in schema.......')	
								})
							})
						return res.json({success: true});
					})
				})
			})
		})
	})
})


router.get('/start/match/firstInnings', (req, res) => {
	console.log('hello from start match firstInnings route');
	Match.findById({_id: req.session.matchId})
	.populate({
		path : 'firstInnings',
		populate: {
			path: 'battingTeamId',
			populate: {
				path: 'players', 
				select: { playerName: 1, id: 1 }
			}
		}
	}).populate({
		path: 'firstInnings',
		populate: {
			path: 'bowlingTeamId',
			populate: {
				path: 'players', 
				select: { playerName: 1, id: 1 }
			}
		}
	}).populate({
		path: 'firstInnings',
		populate: {
			path: 'bowlingScoreCard', 
			populate: {
				path: 'playerId',
				select: {playerName: 1, id: 1}
			}
		} 
	}).populate({
		path: 'firstInnings',
		populate: {
			path: 'batsmanScoreCard',
			populate: {
				path: 'playerId',
				select: {playerName: 1, id: 1}
			}
		}
	}).exec((err, match) => {
		if(err) return res.status(500).json({'error': err});
		console.log(match, '...........populated batting score card and bowling cards.')
		return res.json({match});
	})
})


router.post('/add/runs/firstInnings', (req, res) => {
	console.log(req.body, 'adding runs route');
})
module.exports = router;















