var mongoose = require('mongoose');

/**
 * Feedback
 * // Naming -> matches || matchIds
 * // Naming -> admin
 * // Use timestamps. remove date field line 15
 */

var teamSchema = new mongoose.Schema({
	adminId: {type: mongoose.Schema.Types.ObjectId, ref: 'Admin'},     
	matchesId: [{type: mongoose.Schema.Types.ObjectId, ref: 'Match'}], 
	teamName: { type: String, required: true, unique: true, lowercase: true },
	players: [{type: mongoose.Schema.Types.ObjectId, ref: 'Player'}],
	date: Date,
}, { timestamps: true });

var Team = mongoose.model('Team', teamSchema);

module.exports = Team;