var router = require('express').Router();
var Team = require('../models/Team');
var Player = require('../models/Player');
var Match = require('../models/Match');
var Admin = require('../models/Admin');

router.get('/new/team', (req, res, next) => {
	res.render('team');
})


router.post('/new/team', (req, res, next) => {
	Team.findOne({teamName: req.body.teamName}, (err, team) => {
		if(err) return res.send(err);
		if(!team) {
			console.log('.............from team did not found...........');
			var record = new Team();
			record.teamName = req.body.teamName;
			record.save((err, team) => {
				if(err) return console.log(err); 
				if(team) {
					var playersList = req.body.players.map(name => {
						return { playerName: name, team: team.id };
					});
					Player.insertMany(playersList, (err, playersDoc) => {
						if(err) return console.log(err);
						if(playersDoc) {
							console.log(playersDoc, '..........insertmany playersDoc......');
							var playersIds = playersDoc.map(player => {
								return player._id;
							});
							Team.findByIdAndUpdate(team._id,{$push :{players: {$each: playersIds}}}, {new: true}, (err, team) => {
								if(err) return res.send(err);
								res.render('profile');
							})
						}
					})
				}
			})
		} else {
			return res.render('team');
		}
	})
})


router.get('/host', (req, res) => {
	Team.find({}).populate('player').exec((err, teams) => {
		if(err) return res.status(500).send(err);
		if(teams) {
			console.log(teams, '/.................teams.............');
			console.log(req.session.userId, '..............user id created.........');

			res.render('host', { teams });
		}
	})
});


router.post('/host', (req, res) => {
	console.log(req.body, '.................match document..........');
	Match.findOne({ team1: req.body.team1, team2: req.body.team2 }, (err, match) => {
		if(err) return res.send(err);
		if(!match) {
			var record = new Match();
			record.team1 = req.body.team1;
			record.team2 = req.body.team2;
			record.ground = req.body.ground;
			record.overs = req.body.overs;
			record.save((err, match) => {
				if(err) return console.error(err);
				if(match) {
					console.log(req.session.userId, '..............match created.........');
					Admin.findByIdAndUpdate(req.session.userId,{ $push: { matches: match.id }}, { new: true }, (err, admin) => {
						if(err) return console.error(err);
						console.log(admin, '...............updated matches array in admin.........')
					})
					res.render('profile');
				}
			})
		}
	})
})


module.exports = router;