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
		if(err) return res.status(500).json({error: err});
		console.log(match)
		return res.json({match});
	})
})


router.post('/start/match/firstInnings', (req, res) => {
	console.log(req.body,'..........afterpost data');

	var striker = new BattingScoreCard({
		playerId: req.body.player1,
		matchId: req.session.matchId,
		numBattingPosition: 1,
		isBatted: true
	});

	var nonStriker = new BattingScoreCard({
		playerId: req.body.player2,
		matchId: req.session.matchId,
		numBattingPosition: 2,
		isBatted: true
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
					// console.log(innings, 'updated innings fields');

					Player.findByIdAndUpdate(savedBowler.playerId, 
						{ $push: { bowling: savedBowler._id}}, 
						{new: true}, 
						(err, player) => {
							if(err) return res.status(500).json({error: err})
							// console.log(player, 'updated player schema...........');

							Player.findByIdAndUpdate(savedSriker.playerId, 
							{ $push : { batting: savedSriker._id}}, {new: true},
							(err, player) => {
								if(err) return res.status(500).json({error: err});
								// console.log(player, 'updated batsmen striker in schema.......')
									
								Player.findByIdAndUpdate(savedNonStriker.playerId, 
									{ $push : { batting: savedNonStriker._id}}, {new: true},
									(err, player) => {
										if(err) return res.status(500).json({error: err});
										// console.log(player, 'updated batsmen nonStriker in schema.......')	
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
	console.log('hello from start match firstInnings route', req.session.matchId);
	Match.findById({ _id: req.session.matchId })
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
		// console.log(match, '...........populated batting score card and bowling cards.', err)
		return res.json({match});
	})
})




router.post('/add/runs/firstInnings', (req, res) => {
	console.log(req.body, 'adding runs route');

	BattingScoreCard.findById({ _id: req.body.batsmenId }).exec((err, batsmen) => {
		if(err) return res.status(500).json({error: err});
		console.log(req.body, 'adding runs route check1');
		batsmen.numRuns = (batsmen.numRuns + req.body.run);
		batsmen.numBallsFaced = ++batsmen.numBallsFaced;
		batsmen.numFours = (req.body.run == 4) ?  ++batsmen.numFours : batsmen.numFours;
		batsmen.numSixes = (req.body.run == 6) ? ++batsmen.numSixes : batsmen.numSixes;
		batsmen.numStrikeRate = (batsmen.numRuns / batsmen.numBallsFaced) * 100;


		batsmen.save((err, savedBatsmen) => {
			if(err) return res.status(500).json({error: err});
				console.log(req.body, 'adding runs route ckeck2');

				BowlingScoreCard.findById({ _id: req.body.bowlerId }).exec((err, bowler) => {
					console.log(req.body, 'adding runs route check3');
					if(err) return res.status(500).json({error: err});

					bowler.numGivenRuns = (bowler.numGivenRuns + req.body.run);
					bowler.numBowlsBowled = ++bowler.numBowlsBowled;
					bowler.numOversBowled = Math.floor( bowler.numBowlsBowled / 6);
					bowler.numEconomy = (bowler.numGivenRuns / bowler.numOversBowled);
					bowler.save((err, savedbowler) => {
						if(err) return res.status(500).json({error: err});
						console.log(savedBatsmen, '..........savedBatsmen check4', savedbowler);


						Innings.findById(req.body.inningsId, (err, innings) => {
							if(err) return res.status(500).json({error: err});

							innings.numOversBowled = (req.body.isOverComplete) ? ++innings.numOversBowled : innings.numOversBowled;
							innings.numScore = innings.numScore +	req.body.run;
							innings.numBallsBowled = ++innings.numBallsBowled;

							innings.save((err, savedInnings) => {
								if(err) return res.status(500).json({error: err});
								res.json({success: true});
							})
						})			
					})
				})
		})
	})
})


// add new bowler condition needs to be checked and then add new bowler.


router.post('/add/new/bowler/firstInnings', (req, res) => {
	console.log(req.body, '.............adding new bowler');
	BowlingScoreCard.findOne({playerId: req.body.bowlerId}, (err, savedBowler) => {
		if(err) return res.status(500).json({error : err});
		console.log('.....................findOne bowlrer after error', savedBowler)

		if(!savedBowler) {
			var bowler = new BowlingScoreCard({
				playerId: req.body.bowlerId,
				matchId: req.session.matchId,
				numOversBowled: 0,
				numWickets: 0,
				numEconomy: 0,
				numMaiden: 0,
				numNoball: 0,
				numWides: 0,
				numGivenRuns: 0,
			});

		

			console.log(bowler, 'new bowler created..............');

			bowler.save((err, savedNewBowler) => {
				if(err) return res.status(500).json({error: err});
				console.log(savedNewBowler._id, 'new bowler created..............');

				Innings.findByIdAndUpdate(req.body.inningsId, 
					{ $push: { bowlingScoreCard: savedNewBowler._id }}, 
					{ new : true }, (err, innings) => {
					if(err) return res.status(500).json({error: err});
					console.log(innings, 'new updated innings');

				})
				Player.findByIdAndUpdate(req.body.newBowler, 
					{ $push: {bowling: savedNewBowler._id }}, 
					{new: true}, 
					(err, player) => {
					if(err) return res.status(500).json({error: err});
					console.log(player, 'new player added...........');

					res.json({success: true});
				})
			})
		}
	})
})


// adding wickets to the database and updating the new wicket taken and got out batsmen.
router.post('/add/wickets/firstInnings', (req, res) => {
	console.log(req.body, '..................from wickets route');
	BattingScoreCard.findById(req.body.batsmenId, (err, batsmen) => {
		if(err) return res.status(500).json({error: err});

		batsmen.isOut = true;
		batsmen.outType = req.body.typeOfWicket;

		BowlingScoreCard.findById(req.body.bowlerId, (err, bowler) => {
			if(err) return res.status(500).json({ error: err });

			bowler.numWickets = ++bowler.numWickets;
			bowler.numBowlsBowled = ++bowler.numBowlsBowled;

			batsmen.save((err, savedBatsmen) => {
				if(err) return res.status(500).json({error: err});
				console.log(savedBatsmen, 'updated batsmen state..........');

				bowler.save((err, savedBowler) => {
					if(err) return res.status(500).json({error : err});

					console.log(savedBowler, '............updated bowler state');

					Innings.findById(req.body.inningsId, (err, innings) => {
						if(err) res.status(500).json({error: err});

						innings.numWickets = ++innings.numWickets;
						innings.numBallsBowled = ++innings.numBallsBowled;

						innings.save((err, savedInnings) => {
							if(err) return res.status(500).json({error: err});

							console.log(savedInnings, '............updated bowler state');
							res.json({success: true})

						})
					})

				})
			})
		})
	})
})



router.post('/add/new/batsmen', (req, res) => {
	console.log(req.body, '...............from adding new batsmen.....');
	BattingScoreCard.findOne({playerId: req.body.playerId}, (err, batsmen) => {
		if(err) return res.status(500).json({ error: err });

		var newBatsmen = new BattingScoreCard({
			playerId: req.body.playerId,
			matchId: req.session.matchId,
			numBattingPosition: req.body.position,
			isBatted: true,
		})

		newBatsmen.save((err, savedBatsmen) => {
			if(err) return res.status(500).json({error: err});
			console.log(savedBatsmen, 'after saving new batsmen');

			Innings.findByIdAndUpdate(req.body.inningsId, 
				{ $push: { batsmanScoreCard: savedBatsmen._id }}, 
				{ new : true }, (err, innings) => {
				if(err) return res.status(500).json({error: err});
				console.log(innings, 'new updated innings');
				
				res.json({success: true});

			})

		})
	})

})


module.exports = router;















