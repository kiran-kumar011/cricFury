var mongoose = require('mongoose');

var playerSchema = new mongoose.Schema({
	playerName: { type: String, required: true, lowercase: true },
	numMatchesPlayed: [{type: mongoose.Schema.Types.ObjectId, ref: 'Match'}],
	team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
	batting: [{type: mongoose.Schema.Types.ObjectId, ref: 'BattingScoreCard'}],
	bowling: [{type: mongoose.Schema.Types.ObjectId, ref: 'BowlingScoreCard'}],
});

var Player = mongoose.model('Player', playerSchema);

module.exports = Player;