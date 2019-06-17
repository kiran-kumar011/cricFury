var Team = require('../models/Team');
var Player = require('../models/Player');
var Match = require('../models/Match');
var Admin = require('../models/Admin');
var Innings = require('../models/Innings');
var BattingScorecard = require('../models/BattingScoreCard');
var BowlingScoreCard = require('../models/BowlingScoreCard');

exports.get_newTeam = (req, res, next) => {
	res.render('team');
}

exports.post_newTeam = (req, res, next) => {
	console.log(req.body, '..........posted from react...');
	Team.findOne({teamName: req.body.teamName}, (err, team) => {
		if(err) return res.send(err);
		if(!team) {
			// console.log('.............from team did not found...........');
			var record = new Team();
			record.teamName = req.body.teamName;

			record.save((err, team) => {
				if(err) return console.log(err); 
				if(team) {

					Admin.findByIdAndUpdate(req.session.userId, {$push: {teams: team.id}}, {new: true}, (err, team) => {
						if(err) return res.send(err);
					});

					var playersList = req.body.players.map(name => {
						return { playerName: name, team: team.id, numMatches: 0 };
					});

					Player.insertMany(playersList, (err, playersDoc) => {
						if(err) return console.log(err);
						if(playersDoc) {

							// console.log(playersDoc, '..........insertmany playersDoc......');
							var playersIds = playersDoc.map(player => {
								return player._id;
							});

							Team.findByIdAndUpdate(team._id,{$push :{players: {$each: playersIds}}}, {new: true}, (err, team) => {
								if(err) return res.send(err);
								if(team) {
									Team.findOne({_id: team._id}).populate('players').exec((err, newTeam) => {
											// console.log(newTeam,'.............inside false', err)
										if(err) return res.json({error: err});
										if(newTeam) {
											// console.log(newTeam,'.............inside true')
											return res.json(newTeam);
										}
									})
								}
							})
						}
					})
				}
			})
		} else {
			return res.json({error :'team name already exists please change the name'});
		}
	})
}

exports.get_hostMatch = (req, res) => {
	Team.find({}).populate('players').exec((err, teams) => {
		if(err) return res.status(500).send(err);
		if(teams) {
			console.log(teams, '/.................teams.............');
			console.log(req.session, '..............user id created.........');
			res.json(teams);
		}
	})
}

exports.post_hostmatch = (req, res) => {
	Match.findOne({ team1: req.body.team1, team2: req.body.team2 }, (err, match) => {
		if(err) return res.send(err);
		if(!match) {
			var record = new Match();
			record.team1 = req.body.team1;
			record.team2 = req.body.team2;
			record.ground = req.body.ground;
			record.tossWonBy = req.body.tossWonBy;
			record.overs = req.body.numOvers;
			record.optedTo = req.body.optedTo;

			record.save((err, match) => {
				if(err) return console.error(err);
				if(match) {
					console.log(match, '.................match document..........');
					req.session.matchId = match._id;

					Admin.findByIdAndUpdate(req.session.userId, { $push: { matches: match.id}}, { new: true }, (err, admin) => {
						if(err) return console.error(err);
						res.json(match);
					});
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
				}
			})
		}
	})
}

exports.addInningsToMatch = (req, res) => {
	console.log('check point 1', req.body);

	var matchId = req.body.matchId;
	var tossWonBy = req.body.tossWonBy; // teamId
	var optedTo = req.body.optedTo; // either bat or bowl

	var battingTeamId, bowlingTeamId;

	Match.findById(matchId).exec(function(err, match) {

		// team1: 'Aus'
		// team2: 'Ind' -> Ind (toss + bat)

		if( optedTo == 'bat') {
			battingTeamId = tossWonBy;
			bowlingTeamId = (matchId.team1 == tossWonBy ? matchId.team2 : matchId.team1);
		} else {
			bowlingTeamId = tossWonBy;
			battingTeamId = (matchId.team1 == tossWonBy ? matchId.team2 : matchId.team1);
		}

		// first innings
		var firstInnings = new Innings({
			matchId,
			battingTeamId,
			bowlingTeamId
		});

		// second inningsp
		var secondInnings = new Innings({
			matchId,
			battingTeamId: firstInnings.bowlingTeamId,
			bowlingTeamId: firstInnings.battingTeamId
		});

		firstInnings.save(function(err, savedFirstInnings) {
			secondInnings.save(function(err, savedSecondInnings) {
				match.firstInnings = savedSecondInnings;
				match.secondInnings = savedSecondInnings;

				match.save((err, savedMatch) => {
					res.json({ match: savedMatch });
				})
			});
		});
	})
}

exports.getMatchDetails = (req, res) => {
	if(req.session && req.session.matchId) {
		Match.findOne({ id: req.session.matchId })
		.populate({
			path: 'team1',
			populate: {
				path: 'players',
				select: {playerName: 1, id:1}
			}
		})
		.populate({
			path: 'team2',
			populate: {
				path: 'players',
				select: {playerName: 1, id:1}
			}
		})
		.exec((err, match) => {
			if(err) return res.json(err);
			if(match) {
				console.log(match,"................match in json.......");
				res.json(match);
			}
		})
	}
}















