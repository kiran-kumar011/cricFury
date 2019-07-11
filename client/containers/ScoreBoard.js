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
		var bowls = JSON.parse(localStorage.getItem('ballsBowled')) ? JSON.parse(localStorage.getItem('ballsBowled')).length : 0;
		return(
			<div>
				<div className='scoreCardWrapper'>
					<div className='childScoreCardWrapper'>
						<div className='batsmenScoreList bottomBorder'>
							<h1 className=' text is-medium'>batsman</h1>
							<p className=' text is-medium'>R</p>
							<p className=' text is-medium'>B</p>
							<p className=' text is-medium'>4s</p>
							<p className=' text is-medium'>6s</p>
							<p className=' text is-medium'>SR</p>
						</div>
						{
							batsmenArr.map((batsmen, index) => {
								return (
									<div key={index} className='batsmenScoreList'>
										<h1 className={batsmen.isOut ? ' text is-medium out' : ' text is-medium playing'} 
											onClick={this.handlePlayers} id={batsmen._id}>
											{`${batsmen.playerId.playerName} 
											${batsmen._id == localStorage.getItem('currentStriker') ? '*' : ''}`}</h1>
										<p className=' text is-medium'>{batsmen.numRuns}</p>
										<p className=' text is-medium'>{batsmen.numBallsFaced}</p>
										<p className=' text is-medium'>{batsmen.numFours}</p>
										<p className=' text is-medium'>{batsmen.numSixes}</p>
										<p className=' text is-medium'>{this.strikeRate(batsmen.numStrikeRate)}</p>
									</div>)
							})
						}
					</div>
					<div className='childScoreCardWrapper'>
						<div className='bowlerScoreList'>
							<h1 className=' text is-medium'>bowler</h1>
							<p className=' text is-medium'>O</p>
							<p className=' text is-medium'>M</p>
							<p className=' text is-medium'>R</p>
							<p className=' text is-medium'>W</p>
							<p className=' text is-medium'>NB</p>
							<p className=' text is-medium'>WD</p>
							<p className=' text is-medium'>ECO</p>
						</div>
						{
							bowlersArr.map((bowler, index) => {
								return (
									<div key={index} className='bowlerScoreList'>
										<h1 className={bowler.playerId._id == localStorage.getItem('newBowler') ? 
										' text is-medium playing' : `${localStorage.getItem('currentBowler') === bowler._id ? 
										'text is-medium playing' : 'text is-medium' }` }>{`${bowler.playerId.playerName} 
										${bowler.playerId._id == localStorage.getItem('newBowler') ? '*' : 
										`${localStorage.getItem('currentBowler') === bowler._id ? '*' : '' }`}`}</h1>
										<p className=' text is-medium'>{bowler.numOversBowled} {`
										${bowler.playerId._id == localStorage.getItem('newBowler') ? '.'+bowls : 
										`${localStorage.getItem('currentBowler') === bowler._id ? '.'+bowls : '' }` }`}</p>
										<p className=' text is-medium'>{bowler.numMaiden}</p>
										<p className=' text is-medium'>{bowler.numGivenRuns}</p>
										<p className=' text is-medium'>{bowler.numWickets}</p>
										<p className=' text is-medium'>{bowler.numNoball}</p>
										<p className=' text is-medium'>{bowler.numWides}</p>
										<p className=' text is-medium'>{this.numEconomy(bowler.numEconomy)}</p>
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