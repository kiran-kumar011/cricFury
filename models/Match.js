var mongoose = require('mongoose');

var matchSchema = new mongoose.Schema({
	team1: {type: mongoose.Schema.Types.ObjectId, ref: 'Team'},
	team2: {type: mongoose.Schema.Types.ObjectId, ref: 'Team'},
	firstInnings: {type: mongoose.Schema.Types.ObjectId, ref:'Innings'},
	secondInnings: { type: mongoose.Schema.Types.ObjectId, ref:'Innings' },
	date: Date,
	ground: String,
	tossWonBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
	optedTo: { type: String, enum: ['bat', 'bowl'] }, // bat or bowl
	numTotalOvers: {type: Number},
});


var Match = mongoose.model('Match', matchSchema);


module.exports = Match;