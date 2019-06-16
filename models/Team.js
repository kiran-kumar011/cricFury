var mongoose = require('mongoose');

var teamSchema = new mongoose.Schema({
	adminId: {type: mongoose.Schema.Types.ObjectId, ref: 'Admin'},
	matchesId: [{type: mongoose.Schema.Types.ObjectId, ref: 'Match'}],
	teamName: { type: String, required: true, unique: true, lowercase: true },
	players: [{type: mongoose.Schema.Types.ObjectId, ref: 'Player'}],
	date: Date,
});

var Team = mongoose.model('Team', teamSchema);

module.exports = Team;