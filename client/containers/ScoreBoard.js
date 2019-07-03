import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class ScoreBoard extends Component {

	state = {
		isUpdated: false,
		runs: '',
		updateStriker: '',
		isWicket: false,
	}

	componentDidMount = () => {
		this.getMatchData();
	}




	getMatchData = () => {
		axios.get('http://localhost:3000/api/v1/live/start/match/firstInnings')
		.then(res => {
			this.props.dispatch({type: 'ADD_MATCH', data: res.data.match});

			// var batsmenArr = res.data.match.firstInnings.batsmanScoreCard.map(batsmen => {
			// 	return {...batsmen, isOnstrike: false};
			// })

			// this.props.dispatch({type: 'ADD_BATSMENS', data: batsmenArr});

			// var bowlersArr = res.data.match.firstInnings.bowlingScoreCard.map(bowler => {
			// 	return {...bowler, isBowling: false };
			// })

			// this.props.dispatch({ type:'ADD_BOWLERS', data: bowlersArr });


			this.setState({ isUpdated: true })
		}).catch(err => console.log(err))
	}



	strikeRate(sr) {
		if(sr) {
			let arr = sr.toString().split('.');
			let aaa = arr[1] ? arr[1].slice(0, 2) : "00";
			return arr[0] + '.' + aaa;
		}
	}


	numEconomy(eco) {
		var res = eco ? eco.toString().split('.') : '00'
		var save = res[1] ? res[1].slice(0, 2) : '00';

		return res[0] + '.' + save;
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
										<h1 className={batsmen.isOut ? 'content is-large out' : 'content is-large'} 
											onClick={this.handlePlayers} id={batsmen._id}>{batsmen.playerId.playerName}</h1>
										<p className='content is-large'>{batsmen.numRuns}</p>
										<p className='content is-large'>{batsmen.numBallsFaced}</p>
										<p className='content is-large'>{batsmen.numFours}</p>
										<p className='content is-large'>{batsmen.numSixes}</p>
										<p className='content is-large'>{this.strikeRate(batsmen.numStrikeRate)}</p>
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
										<h1 className='content is-large'>{bowler.playerId.playerName}</h1>
										<p className='content is-large'>{bowler.numOversBowled}</p>
										<p className='content is-large'>{bowler.numMaiden}</p>
										<p className='content is-large'>{bowler.numGivenRuns}</p>
										<p className='content is-large'>{bowler.numWickets}</p>
										<p className='content is-large'>{bowler.numNoball}</p>
										<p className='content is-large'>{bowler.numWides}</p>
										<p className='content is-large'>{this.numEconomy(bowler.numEconomy)}</p>
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