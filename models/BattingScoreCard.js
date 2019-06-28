var mongoose = require('mongoose');

/**
 * Feedback
 * Not now, later
 * 
 * bowledBy -> PlayerId
 * fielders involved
 */


var battingSchema = new mongoose.Schema({
	playerId: {type: mongoose.Schema.Types.ObjectId, ref: 'Player'},
	matchId: {type: mongoose.Schema.Types.ObjectId, ref: 'Match'},
	inningsId: {type: mongoose.Schema.Types.ObjectId, ref: 'Innings'},
	numRuns: {type: Number, default: 0},
	numBallsFaced: {type: Number, default: 0},
	numFours: {type: Number, default: 0},
	numSixes: {type: Number, default: 0},
	isOut: {type: Boolean, default: false},
	isBatted: {type: Boolean, default: false},
	outType: { type: String },
	numStrikeRate: {type: Number, default: 0},
	numBattingPosition: {type: Number, default: 0},
});


var BattingScoreCard = mongoose.model('BattingScoreCard', battingSchema);

module.exports = BattingScoreCard;
