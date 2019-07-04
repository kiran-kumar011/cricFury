import React, { Component } from 'react';
import Nav from './Nav';
import axios from 'axios';
import Runs from './Runs';
import Extras from './Extras';
import Wickets from './Wickets';
import UpdateScore from './UpdateScore';
import {connect} from 'react-redux';

import { getMatchDetails, updateOversandToss, getUpdatedInnings, getLiveScoreUpdate } from '../actions';

class Scoring extends Component {
	state = {
		tossWonBy: '',
		optedTo: '',
		overs: '',
		isTossWonteam1: false,
		isTossWonteam2: false,
		isOptedToBat: false,
		isOptedToBowl: false,
	}

	componentDidMount = () => {
		this.getRequestForMatchDetails();
	}


	getRequestForMatchDetails = () => {
		this.props.dispatch(getMatchDetails()).then(res => {
			console.log('redux store updated');
		})

	}

	submitOver = (e) => {
		this.setState({overs: e.target.value});
	}


	submitMatchData = (e) => {
		e.preventDefault();
		const data = {
			tossWonBy: this.state.tossWonBy,
			optedTo: this.state.optedTo, 
			overs: this.state.overs,
		}

		this.props.dispatch(updateOversandToss(data)).then(res => {
			console.log(res, '...............updated overs and toss.......')
			this.props.dispatch(getUpdatedInnings())
		})
	}


	render() {
		const match = this.props.match._id ? this.props.match : {};

		return(
			<div>
				<Nav />
				<div className='scoringWrapper'>
					<form className='updateToss' onSubmit={ this.submitMatchData }>
						{
							match.tossWonBy ? 
							''
							: 
							(<div>
								<div className='oversWrapper'>
									<label className=''>Overs</label>
									<input className='overs' onChange={this.submitOver} 
									value={this.state.overs} type='text' name='overs'></input>
								</div> 
								<h1 className=''>toss won by</h1>
								<button className={this.state.isTossWonteam1 ? 'activeButton button': 'inactiveButton button'} 
									onClick={() => this.setState({tossWonBy: match.team1._id, isTossWonteam1: true, isTossWonteam2: false})}>
									{match._id ? match.team1.teamName : 'team1'}
								</button>
								<button className={this.state.isTossWonteam2 ? 'activeButton button': 'inactiveButton button'} 
									onClick={() => this.setState({tossWonBy: match.team2._id, isTossWonteam2: true, isTossWonteam1: false})}>
									{match._id ? match.team2.teamName : 'team2'}
								</button>
							</div>
							)
						}

						{
							match.optedTo ? 
							''
							: 
							(
								<div>
									<h1 className=''>elected to</h1>
									<div className='buttons'>
										<button 
											className={this.state.isOptedToBat ? 'activeButton button': 'inactiveButton button'}
											onClick={() => this.setState({isOptedToBat: true, isOptedToBowl: false, optedTo: 'bat'})}>
											bat
										</button>
										<button className={this.state.isOptedToBowl ? 'activeButton button': 'inactiveButton button'} 
											onClick={() => this.setState({isOptedToBat: false, isOptedToBowl: true, optedTo: 'bowl'})}>
											bowl
										</button>
									</div>
								</div>
							)
						}

						{
							match.optedTo ? '' : <button className='button' onClick={this.submitMatchData}>submit</button>
						}
					</form>
				</div>


				{
					match.optedTo ? 
					<UpdateScore optedTo={this.state.optedTo} tossWonBy={this.state.tossWonBy} players={match.players}/>
					: 
					''
				}
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		match: state.match,
	}
}

export default connect(mapStateToProps)(Scoring);
