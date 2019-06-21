import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class ScoreBoard extends Component {

	state = {
		isUpdated: false,
	}

	componentDidMount = () => {
		this.getMatchData();
	}

	getMatchData = () => {
		axios.get('http://localhost:3000/api/v1/live/start/match/firstInnings')
		.then(res => {
			console.log(res);
			this.props.dispatch({type: 'ADD_MATCH', data: res.data.match});
			this.setState({ isUpdated: true })
		}).catch(err => console.log(err))
	}

	handlePlayers = (e) => {
		console.dir(e.target.id);
	}

	render() {
		const {batsmanScoreCard, bowlingScoreCard, numScore, battingTeamId} = this.props.match.firstInnings;
		const batsmenArr = batsmanScoreCard && this.state.isUpdated ? batsmanScoreCard : [];
		const bowlersArr = bowlingScoreCard && this.state.isUpdated ? bowlingScoreCard : [];
		return(
			<div>
				<div className='scoreCardWrapper'>
					<div className='childScoreCardWrapper'>
						<div className='batsmenScoreList bottomBorder'>
							<h1 className='content is-large'>batsman</h1>
							<p className='content is-large'>R</p>
							<p className='content is-large'>B</p>
							<p className='content is-large'>4s</p>
							<p className='content is-large'>6s</p>
							<p className='content is-large'>SR</p>
						</div>
						{
							batsmenArr.map((batsmen, index) => {
								return (
									<div key={index} className='batsmenScoreList'>
										<h1 className='content is-large' onClick={this.handlePlayers}>{batsmen.playerId.playerName}</h1>
										<p className='content is-large'>{batsmen.numRuns}</p>
										<p className='content is-large'>{batsmen.numBallsFaced}</p>
										<p className='content is-large'>{batsmen.numFours}</p>
										<p className='content is-large'>{batsmen.numSixes}</p>
										<p className='content is-large'>{batsmen.numStrikeRate}</p>
									</div>)
							})
						}
					</div>
					<div className='childScoreCardWrapper'>
						<div className='bowlerScoreList'>
							<h1 className='content is-large'>bowler</h1>
							<p className='content is-large'>O</p>
							<p className='content is-large'>M</p>
							<p className='content is-large'>R</p>
							<p className='content is-large'>W</p>
							<p className='content is-large'>NB</p>
							<p className='content is-large'>WD</p>
							<p className='content is-large'>ECO</p>

						</div>
						{
							bowlersArr.map((bowler, index) => {
								return (
									<div key={index} className='bowlerScoreList'>
										<h1 className='content is-large' value={bowler.playerId.id}>{bowler.playerId.playerName}</h1>
										<p className='content is-large'>{bowler.numOversBowled}</p>
										<p className='content is-large'>{bowler.numMaiden}</p>
										<p className='content is-large'>{bowler.numGivenRuns}</p>
										<p className='content is-large'>{bowler.numWickets}</p>
										<p className='content is-large'>{bowler.numNoball}</p>
										<p className='content is-large'>{bowler.numWides}</p>
										<p className='content is-large'>{bowler.numEconomy}</p>
									</div>)
							})
						}
					</div>
				</div>
				
			</div>
		)
	}
}


function mapStateToProps(state) {
	return {
		match: state.match,
	}
}

export default connect(mapStateToProps)(ScoreBoard);