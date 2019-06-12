var mongoose = require('mongoose');

var inningsSchema = new mongoose.Schema({
	battingTeamId: { type: mongoose.Schema.Types.ObjectId, ref:'Team' },
	bowlingTeamId: { type: mongoose.Schema.Types.ObjectId, ref:'Team' },
	score: [{ type: mongoose.Schema.Types.ObjectId, ref:'Batting' }],
	bowling: [{ type: mongoose.Schema.Types.ObjectId, ref:'Bowling' }],
});

var Innings = new mongoose.model('Innings', inningsSchema);

module.exports = Innings;