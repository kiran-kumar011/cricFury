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
		message: ''
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
		this.setState({overs: e.target.value, message: ''});
	}


	submitMatchData = (e) => {
		e.preventDefault();

		var data = {
			tossWonBy: this.state.tossWonBy,
			optedTo: this.state.optedTo, 
			overs: this.state.overs,
		}
		if(!this.state.tossWonBy) {
			this.setState({message: 'select the toss won team'});
			return;
		}

		if(!this.state.optedTo) {
			this.setState({message: 'select whether tossWonBy team is batting or bowling'});
			return;
		}

		if(!this.state.overs) {
			this.setState({message: 'please enter number of overs'});
			return;
		}

		if(typeof +this.state.overs != 'number') {
			this.setState({message: 'the overs should be in integers'});
			return;
		} 

		this.props.dispatch(updateOversandToss(data)).then(res => {
			this.props.dispatch(getUpdatedInnings())
			this.setState({tossWonBy: '', optedTo: '', overs: ''});
		})
	}


	render() {
		const match = this.props.match._id ? this.props.match : {};

		return(
			<div>
				<Nav />
				<div className='scoringWrapper'>
					<div className={ match.tossWonBy ? 'hide' : 'updateToss' }>
						{
							match.tossWonBy ? 
							''
							: 
							(<div>
								<div className='oversWrapper'>
									<input className='input' placeholder='enter the overs' onChange={this.submitOver} 
									value={this.state.overs} type='text' name='overs' />
								</div>
								<h1 className='primary-text'>toss won by</h1>
								<div className='matchbtns'>
									<button className={this.state.isTossWonteam1 ? 'activeButton prime-button': 'inactiveButton prime-button'} 
										onClick={() => this.setState({tossWonBy: match.team1._id, message: '',isTossWonteam1: true, isTossWonteam2: false})}>
										{match._id ? match.team1.teamName : 'team1'}
									</button>
									<button className={this.state.isTossWonteam2 ? 'activeButton prime-button': 'inactiveButton prime-button'} 
										onClick={() => this.setState({tossWonBy: match.team2._id, message: '',isTossWonteam2: true, isTossWonteam1: false})}>
										{match._id ? match.team2.teamName : 'team2'}
									</button>
								</div>
								<div>
									<h1 className='primary-text'>elected to</h1>
									<div className='matchbtns'>
										<button 
											className={this.state.isOptedToBat ? 'activeButton prime-button': 'inactiveButton prime-button'}
											onClick={() => this.setState({isOptedToBat: true, message: '',isOptedToBowl: false, optedTo: 'bat'})}>
											bat
										</button>
										<button className={this.state.isOptedToBowl ? 'activeButton prime-button': 'inactiveButton prime-button'} 
											onClick={() => this.setState({isOptedToBat: false, message: '',isOptedToBowl: true, optedTo: 'bowl'})}>
											bowl
										</button>
									</div>
								</div>								
							</div>
							)
						}
						{
							this.state.message ? <h1 className='red'>{this.state.message}</h1> : ''
						}
						{
							match.optedTo ? '' : <button type='submit' className='prime-button' onClick={this.submitMatchData}>submit</button>
						}
					</div>
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



