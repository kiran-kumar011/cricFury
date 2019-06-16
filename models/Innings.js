var mongoose = require('mongoose');

var inningsSchema = new mongoose.Schema({
	matchId: { type: mongoose.Schema.Types.ObjectId, ref:'Team' },
	battingTeamId: { type: mongoose.Schema.Types.ObjectId, ref:'Team' },
	bowlingTeamId: { type: mongoose.Schema.Types.ObjectId, ref:'Team' },
	batsmanScoreCard: [{ type: mongoose.Schema.Types.ObjectId, ref:'Batting' }],
	bowlingScoreCard: [{ type: mongoose.Schema.Types.ObjectId, ref:'Bowling' }],
});

var Innings = new mongoose.model('Innings', inningsSchema);

module.exports = Innings;