import React, { Component } from 'react';
import Runs from './Runs';
import Extras from './Extras';
import Wickets from './Wickets';
import axios from 'axios';
import { connect } from 'react-redux';
import ScoreBoard from './ScoreBoard';


import { getUpdatedInnings, postOpenersData } from '../actions';



class Update extends Component {

	state = {
		isDone: false,
		player1: '',
		player2: '',
		bowler: '',
		batsmen: '',
		runs: '',
		extras: '',
		wickets: '',
		balls: 0,
	}


	// fetchMatchData = () => {
	// 	axios.get('http://localhost:3000/api/v1/live/match/update/firstInnings')
	// 	.then(res => {
	// 		console.log(res, '.........from updated score component');
	// 		this.props.dispatch({ type: 'ADD_MATCH', data: res.data.match });
	// 		this.setState({isDone: true })
	// 	}).catch(error => {
	// 		console.log(error)
	// 	})
	// }

	getNumberOfballsBowled = (count) => {
		console.log('balls count ', count)
		this.setState({balls: count});
	}

	componentDidMount() {
		console.log('..........update score mounted.........')
		// this.fetchMatchData();
		this.props.dispatch(getUpdatedInnings(this.stateUpdate))
	}

	handleChange = (e) => {
		this.setState({[e.target.name] : e.target.value});	
	}


	stateUpdate = () => {
		this.setState({ isDone : true });
	}


	handleClick = (e) => {
		this.state.batsmen.push(e.target.value)
		this.setState({ batsmen: this.state.batsmen });
	}

	// strikeRate(sr) {
	// 	console.log(sr)
	// }

	submitPlayers = (e) => {
		e.preventDefault();
		console.log('............submit function call');
		
		const data = {
			player1 : this.state.player1,
			player2 : this.state.player2,
			bowler: this.state.bowler
		}

		this.props.dispatch(postOpenersData(data, this.fetchMatchData))
		

		// axios.post('http://localhost:3000/api/v1/live/start/match/firstInnings', data).then(res => {
		// 	console.log(res);
		// 	this.fetchMatchData();
		// }).catch(err => console.log(err));
		this.setState({isDone: false, player1: '', player2: '', bowler: '', batsmen: ''})
	}

	fetchMatchData = () => {
		this.props.dispatch(getUpdatedInnings(this.stateUpdate))
	}

	updatePlayersScoreCard = (e) => {
		this.setState({[e.target.name]: e.target.value})
	}

	render() {

		const { battingTeamId, bowlingTeamId, batsmanScoreCard, numScore } = this.props.match.firstInnings;
		const { tossWonBy , optedTo, team1, team2 } = this.props.match;

		const toss = tossWonBy && this.state.isDone ? (tossWonBy == battingTeamId._id ? battingTeamId : bowlingTeamId) : {} ; 

		const batsmen = battingTeamId && this.state.isDone ? battingTeamId.players : [];
		const bowlers = bowlingTeamId && this.state.isDone ? bowlingTeamId.players : [];
		const batsmenArr = batsmanScoreCard && this.state.isDone ? batsmanScoreCard : [];
		const score = numScore && this.state.isDone ? numScore : 0;

		console.log(bowlingTeamId, 'bowlersd team')
		return(
			<div>
				<div className='control selectContailer'>
					{
						<div>
							<h1 className='content is-large'>toss won by {toss.teamName ? toss.teamName : ''} and elected to  {(optedTo ? optedTo : '')} first</h1>
							<h1 className='content is-large'>{(battingTeamId && this.state.isDone ?  battingTeamId.teamName : '')} : {score}/0 </h1>
						</div>		
					}

					{

						batsmenArr.length >= 2 ? 
						(
							<ScoreBoard />
						)

						:	

						(
							<div className='openerContainer'>
								<form className="select is-multiple" onSubmit={this.submitPlayers}>
									<div className="openerForm">
										<div className="openerBatsmen">
											<h1 className='content is-large'>select batsman</h1>
											<select onChange={this.handleChange} name='player1'>
												<option>select striker Batsman</option>
												{
													batsmen.filter(player => player._id != this.state.player2).map((player, index) => {
														return <option key={index} value={player._id} >{player.playerName}</option>
													})
												}
											</select>
											<select onChange={this.handleChange} name='player2'>
												<option>select Non striker Batsman</option>
												{
													batsmen.filter(player => player._id != this.state.player1).map((player, index) => {
														return <option key={index} value={player._id}>{player.playerName}</option>
													})
												}
											</select>
										</div>

										<div className="openerBatsmen">
											<h1 className='content is-large'>select bowler</h1>
											<select onChange={this.handleChange} name='bowler'>
												<option>select Bowler</option>
												{
													bowlers.map((player, index) => {
														return <option key={index} value={player._id}>{player.playerName}</option>
													})
												}
											</select>
										</div>
										
										{
											this.state.player1 && this.state.player2 && this.state.bowler ? 
											(<button className='button' type='submit'>submit</button>) : ''
										}
									</div>
								</form>
							</div>
						)
					}
	
					{
						batsmenArr.length >= 2 ?
						<div className='updatingScoreWrapper'>
							<div className='buttons'>
								<Runs balls={this.getNumberOfballsBowled} />
							</div>
						</div>
						:
						''
					}
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

export default connect(mapStateToProps)(Update);





