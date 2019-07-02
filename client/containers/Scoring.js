import React, { Component } from 'react';
import Nav from './Nav';
import axios from 'axios';
import Runs from './Runs';
import Extras from './Extras';
import Wickets from './Wickets';
import UpdateScore from './UpdateScore';
import {connect} from 'react-redux';

import { getMatchDetailsBeforeToss, updateOversandToss } from '../actions';

class Scoring extends Component {
	state = {
		matchData: null,
		tossWonBy: '',
		optedTo: '',
		overs: '',
		isTossWonteam1: false,
		isTossWonteam2: false,
		isOptedToBat: false,
		isOptedToBowl: false,
		start: false,
	}

	submitOver = (e) => {
		this.setState({overs: e.target.value});
	}

	submitMatchData = (e) => {
		e.preventDefault();
		const data = {
			tossWonBy: this.state.tossWonBy,
			optedTo: this.state.optedTo, 
			overs: this.state.overs
		}

		// TODO: Refactor it to make it such that actioncreator returns a promise 
		// and then you can dispatch

		// it should return a promise.
		// this.props.dispatch(updateOversandToss(data)).then(() => {
		// 	this.props.dispatch(getMatchDetailsBeforeToss());
		// })

		// dispatch an action
		this.props.dispatch(updateOversandToss(data, this.getRequestForMatchDetails))
	}


	getRequestForMatchDetails = () => {

		this.props.dispatch(getMatchDetailsBeforeToss(this.stateUpdate))
	}


	stateUpdate = (data) => {		
		this.setState({matchData: data})
	}

	componentDidMount = () => {
		this.props.dispatch(getMatchDetailsBeforeToss(this.stateUpdate));
	}


	render() {
		const match = this.state.matchData ? this.state.matchData : {}
		return(
			<div>
				<Nav />
				<h1 className='content'>create scoring page</h1>
				<section onSubmit={this.submitMatchData}>
					{
						match.tossWonBy ? 
						''
						: 
						(<div>
							<div className='oversWrapper'>
								<label className='content is-large'>Overs</label>
								<input className='overs' onChange={this.submitOver} value={this.state.overs} type='text' name='overs'></input>
							</div> 
							<h1 className='content is-large'>toss won by</h1>
							<button className={this.state.isTossWonteam1 ? 'activeButton button': 'inactiveButton button'} onClick={() => this.setState({tossWonBy: this.state.matchData.team1._id, isTossWonteam1: true, isTossWonteam2: false})}>{this.state.matchData? this.state.matchData.team1.teamName : 'team1'}</button>
							<button className={this.state.isTossWonteam2 ? 'activeButton button': 'inactiveButton button'} onClick={() => this.setState({tossWonBy: this.state.matchData.team2._id, isTossWonteam2: true, isTossWonteam1: false})}>{this.state.matchData ? this.state.matchData.team2.teamName : 'team2'}</button>
						</div>)
					}

					{
						match.optedTo ? 
						''
						: 
						(
							<div>
								<h1 className='content is-large'>elected to</h1>
								<div className='buttons'>
									<button 
										className={this.state.isOptedToBat ? 'activeButton button': 'inactiveButton button'}
										onClick={() => this.setState({isOptedToBat: true, isOptedToBowl: false, optedTo: 'bat'})}>
										bat
									</button>
									<button className={this.state.isOptedToBowl ? 'activeButton button': 'inactiveButton button'} onClick={() => this.setState({isOptedToBat: false, isOptedToBowl: true, optedTo: 'bowl'})}>bowl</button>
								</div>
							</div>
						)
					}

					{
						match.optedTo ? '' : <button className='button' onClick={this.submitMatchData}>submit</button>
					}
				</section>
				{
					this.state.start && match.optedTo ? 
					<UpdateScore optedTo={this.state.optedTo} tossWonBy={this.state.tossWonBy} players={this.state.matchData.players}/>
					: 
					<button className='button' onClick={() => this.setState({start: true})}>Start the Game</button>
				}
			</div>
		)
	}
}



export default connect()(Scoring);
