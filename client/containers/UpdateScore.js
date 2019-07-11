import React, { Component } from 'react';
import Runs from './Runs';
import Extras from './Extras';
import Wickets from './Wickets';
import axios from 'axios';
import { connect } from 'react-redux';
import ScoreBoard from './ScoreBoard';


import { getUpdatedInnings, postOpenersData, getLiveScoreUpdate } from '../actions';



class Update extends Component {

	state = {
		player1: '',
		player2: '',
		bowler: '',
		batsmen: '',
		balls: 0,
	}


	componentDidMount = () => {
		this.props.dispatch(getUpdatedInnings());
	}



	handleChange = (e) => {
		this.setState({[e.target.name] : e.target.value});	
	}


	submitPlayers = (e) => {
		e.preventDefault();
		
		const data = {
			player1 : this.state.player1,
			player2 : this.state.player2,
			bowler: this.state.bowler,
		}

		this.props.dispatch(postOpenersData(data)).then(res => {
			console.log(res, 'after the post openers data promise returns');
			
			this.props.dispatch(getLiveScoreUpdate()).then(res => {
				console.log(res.match, 'after the getLiveScoreUpdate promise returns');
				this.setState({player1: '', player2: '', bowler: '', batsmen: ''})
			});
		})	
	}


	render() {

		const { battingTeamId, bowlingTeamId, batsmanScoreCard, numScore, numWickets, numOversBowled } = this.props.match.firstInnings;
		const { tossWonBy , optedTo, team1, team2 } = this.props.match;

		const toss = tossWonBy && battingTeamId ? ((tossWonBy == battingTeamId._id ) ? battingTeamId : bowlingTeamId) : {} ; 

		const batsmen = battingTeamId ? battingTeamId.players : [];
		const bowlers = bowlingTeamId ? bowlingTeamId.players : [];
		const batsmenArr = batsmanScoreCard  ? batsmanScoreCard : [];
		const score = numScore ? numScore : 0;

		var bowls = JSON.parse(localStorage.getItem('ballsBowled')) ? JSON.parse(localStorage.getItem('ballsBowled')).length : 0;

		return(
			<div>
				<div className='control selectContailer'>
					{
						<div>
							<h1 className='content is-large'>
								toss won by {toss.teamName ? toss.teamName : ''} and elected to  {(optedTo ? optedTo : '')} first
							</h1>
							<h1 className='content is-large'>
								{(battingTeamId ?  battingTeamId.teamName : '')} : {score}/{numWickets} 
								<span>overs: {`${numOversBowled}.${bowls}` }</span>
							</h1>

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
											(<button className='prime-button' type='submit'>submit</button>) : ''
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
								<Runs />
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





