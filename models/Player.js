var mongoose = require('mongoose');

var playerSchema = new mongoose.Schema({
	playerName: { type: String, required: true, lowercase: true },
	numMatches: Number,
	team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
	batting: [{type: mongoose.Schema.Types.ObjectId, ref: 'Batting'}],
	bowling: [{type: mongoose.Schema.Types.ObjectId, ref: 'Bowling'}],
	// batting: {
	// 	innings: Number,
	// 	totalRuns: Number,
	// 	totalBallsFaced: Number,
	// 	strikeRate: Number,
	// 	fours: Number,
	// 	sixes: Number,
	// },
	// bowling: {
	// 	oversBowled: Number,
	// 	wickets: Number,
	// 	economy: Number,
	// 	maiden: Number,
	// 	noball: Number,
	// 	wides: Number,
	// 	givenRuns: Number,
	// }
});

var Player = mongoose.model('Player', playerSchema);

module.exports = Player;