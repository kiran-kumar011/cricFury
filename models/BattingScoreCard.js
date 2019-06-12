var mongoose = require('mongoose');

var battingSchema = new mongoose.Schema({
	playerId: {type: mongoose.Schema.Types.ObjectId, ref: 'Player'},
	numRuns: Number,
	numBallsFaced: Number,
	numFours: Number,
	numSixes: Number,
	numStrikeRate: Number,
});


var BattingScoreCard = new mongoose.model('BattingScoreCard', battingSchema);

module.exports = BattingScoreCard;


// BallByBall
/*
{
- matchId
- ininggsId
- batsmenId
- bowlerId
- over
- ballnumber
- resultType
}
*/