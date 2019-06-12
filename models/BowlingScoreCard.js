var mongoose = require('mongoose');

var bowlingSchema = new mongoose.Schema({
	playerDetails: {type: mongoose.Schema.Types.ObjectId, ref: 'Player'},
	numOversBowled: Number,
	numWickets: Number,
	numEconomy: Number,
	numMaiden: Number,
	numNoball: Number,
	numWides: Number,
	numGivenRuns: Number,
});

var BowlingScoreCard = new mongoose.model('BowlingScoreCard', bowlingSchema);

module.exports = BowlingScoreCard;