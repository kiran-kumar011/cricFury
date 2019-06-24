var mongoose = require('mongoose');

var bowlingSchema = new mongoose.Schema({
	playerId: {type: mongoose.Schema.Types.ObjectId, ref: 'Player'},
	matchId: {type: mongoose.Schema.Types.ObjectId, ref: 'Match'},
	numOversBowled: {type: Number, default: 0},
	numBowlsBowled: {type: Number, default: 0},
	numWickets: {type: Number, default: 0},
	numEconomy: {type: Number, default: 0},
	numMaiden: {type: Number, default: 0},
	numNoball: {type: Number, default: 0},
	numWides: {type: Number, default: 0},
	numGivenRuns: {type: Number, default: 0},
});

var BowlingScoreCard = mongoose.model('BowlingScoreCard', bowlingSchema);

module.exports = BowlingScoreCard;