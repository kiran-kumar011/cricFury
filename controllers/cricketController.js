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
			record.adminId = req.session.userId;

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
	console.log(req.session.userId, '...............user id from hom req route')
	Team.find({ adminId: req.session.userId }).populate('players').exec((err, teams) => {
		if(err) return res.status(500).send(err);
		if(teams) {
			console.log(teams, '..............found team');
			res.json(teams);
		}
	})
}


exports.post_hostMatch = (req, res) => {
	console.log(req.body, '.......matchid in get request......');

	Match.findOne({ team1: req.body.team1, team2: req.body.team2 }, (err, match) => {
		if(err) return res.send(err);
		if(!match) {
			var record = new Match();
			record.team1 = req.body.team1;
			record.team2 = req.body.team2;
			record.ground = req.body.ground;

			record.save((err, match) => {
				if(err) return console.error(err);
				if(match) {
					console.log(match, '.................match document..........');
					req.session.matchId = match._id;

					Team.findByIdAndUpdate(req.body.team1, 
						{ $push: {matchesId: match.id}}, 
						{new: true}, 
						(err, savedTeam1) => {
						if(err) return res.status(500).json({error: err});
						console.log(savedTeam1, '.................team after pushing the matchid..........');
						savedTeam1.players.forEach(id => {
							Player.findByIdAndUpdate(id, { $push: {numMatchesPlayed: match.id}}, {new: true}, (err, player) => {
								if(err) return res.status(500).json({error: err});
								console.log(player, 'team1 players pushed matches id');
							})
						})

						Team.findByIdAndUpdate(req.body.team2, 
							{ $push: {matchesId: match.id}}, 
							{new: true}, 
							(err, savedteam2) => {
							if(err) return res.status(500).json({error: err});
							
							savedteam2.players.forEach(id => {
								Player.findByIdAndUpdate(id, { $push: {numMatchesPlayed: match.id}}, {new: true}, (err, player) => {
								if(err) return res.status(500).json({error: err});
								console.log(player, 'team2 players, pushed matches id');
								})

							})

						})
					})

					Admin.findByIdAndUpdate(req.session.userId, { $push: { matches: match.id}}, { new: true }, (err, admin) => {
						if(err) return console.error(err);
						return res.json(match);
					});
				}
			})
		}
	})
}


exports.getMatchDetails = (req, res) => {
	console.log(req.session.matchId, '......matchid');
	Match.findById({ _id: req.session.matchId })
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
		if(err) return res.status(500).json({error: err});
		if(match) {
			console.log(match,"................match in json.......");
			res.json(match);
		}
	})
}



exports.updateOversTossAndOptedTo = (req, res) => {
	console.log('check1..........heeaa........', req.session.matchId, req.body);


	Match.findById({ _id: req.session.matchId }).exec((err, match) => {
		if(err) return res.status(500).json({error: err});

		if(req.body.tossWonBy == match.team1 && req.body.optedTo == 'bat') {

			var firstInnings = new Innings({
				matchId : match._id,
				battingTeamId : match.team1,
				bowlingTeamId : match.team2,
			});

			var secondInnings = new Innings({
				matchId : match._id,
				battingTeamId : match.team2,
				bowlingTeamId : match.team1,
			});

 		} else if(req.body.tossWonBy == match.team1 && req.body.optedTo == 'bowl') {

	 		var firstInnings = new Innings({
 				matchId : match._id,
				battingTeamId : match.team2,
				bowlingTeamId : match.team1,
	 		});

	 		var secondInnings = new Innings({
	 			matchId : match._id,
				battingTeamId : match.team1,
				bowlingTeamId : match.team2,
	 		});
	 		
 		}

	 	firstInnings.save((err, savedFirstInnings) => {
	 		secondInnings.save((err, savedSecondInnings) => {

	 			match.tossWonBy = req.body.tossWonBy;
				match.optedTo = req.body.optedTo;
				match.numTotalOvers = req.body.overs;
				match.firstInnings = savedFirstInnings.id;
				match.secondInnings = savedSecondInnings.id;

				match.save((err, savedMatch) => {
					if(err) return res.status(500).json({'error': err})
					res.json({success: true});
				});
	 		})
	 	})
	})
}











