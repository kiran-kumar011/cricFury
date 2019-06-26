var mongoose = require('mongoose');

var inningsSchema = new mongoose.Schema({
	matchId: { type: mongoose.Schema.Types.ObjectId, ref:'Team' },
	numScore: {type: Number, default: 0},
	numWickets: {type: Number, default: 0},
	numBallsBowled: {type: Number, default: 0},
	numOversBowled: {type: Number, default: 0},
	battingTeamId: { type: mongoose.Schema.Types.ObjectId, ref:'Team' },
	bowlingTeamId: { type: mongoose.Schema.Types.ObjectId, ref:'Team' },
	batsmanScoreCard: [{ type: mongoose.Schema.Types.ObjectId, ref:'BattingScoreCard' }],
	bowlingScoreCard: [{ type: mongoose.Schema.Types.ObjectId, ref:'BowlingScoreCard' }],
});

var Innings = mongoose.model('Innings', inningsSchema);

module.exports = Innings;