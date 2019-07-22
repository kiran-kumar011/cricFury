import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { updateWickets, addNewBatsmen, getLiveScoreUpdate } from '../actions';

class Wickets extends Component {


	state = {
		newBatsmen: localStorage.getItem('newBatsmen') || '',
		typeOfWicket: '',
		isSelected: false,
	}

	handlingWicket = (e) => {
		this.props.isWicket();
		if(e.target.value == 'bowled' || e.target.value == 'lbw' || e.target.value == 'stumped') {
			var { bowlingScoreCard } = this.props.match.firstInnings;
			var id = '';

			bowlingScoreCard.length == 1 ? id = bowlingScoreCard[0]._id : '';

			bowlingScoreCard.forEach(bow => {
				if(bow.playerId._id == localStorage.getItem('newBowler')) {
					id = bow._id;
				} 
			})
			this.postToAddNewWicket(localStorage.getItem('currentStriker'),  id, e.target.value);

		} else {
			console.log('take got out batsmen id from admin and handle for runout and caught out');
		}
	}

	postToAddNewWicket = (batsmenId, bowlerId, typeOfWicket) => {
		var isOverComplete = localStorage.getItem('ballsBowled').length == 0 ? true : false;

		var data = {
			batsmenId,
			bowlerId,
			typeOfWicket,
			isOverComplete,
			inningsId: this.props.match.firstInnings._id,
		}

		this.props.dispatch(updateWickets(data)).then(res => {
			this.setState({ typeOfWicket: typeOfWicket});
			this.props.dispatch(getLiveScoreUpdate())
		})
	}

	selectNewBatsmen = (e) => {
		this.setState({ newBatsmen : e.target.value, isSelected: true });
	}


	posttoAddNewBatsmen = () => {


		var length = this.props.match.firstInnings.batsmanScoreCard.length + 1;
		var id = this.props.match.firstInnings._id; 

		var data = { playerId: localStorage.getItem('newBatsmen'), position: length, inningsId: id }

		this.props.dispatch(addNewBatsmen(data)).then(res => {
			this.props.dispatch(getLiveScoreUpdate()).then(response => {
				this.props.wicket(this.state.typeOfWicket);
				this.setState({ isSelected: false });
				this.props.isWicket();
				this.props.updateWicket();
			});
		});
	}


	render() {

		var batsmenPlaying = this.props.match.firstInnings.batsmanScoreCard.filter(player => (!player.isOut && player.isBatted));

		console.log(batsmenPlaying, ',..........playing 1')
		localStorage.setItem('newBatsmen', this.state.newBatsmen);

		const wickets = ['bowled', 'caughtOut', 'lbw', 'runout', 'stumped'];

		var batsmens = this.props.match.firstInnings ? this.props.match.firstInnings.battingTeamId.players : [];

		return(
			<div>
				{
					this.props.wicketState ?  
					(
						<div>
							<select onChange={this.selectNewBatsmen} name='newBatsmen'>
								<option>select New batsmen</option>
								{
									batsmens.map((player, index) => {
										return <option key={index} value={player._id}>{player.playerName}</option>
									})
								}
							</select>
							{
								this.state.isSelected ? 
								<button onClick={this.posttoAddNewBatsmen}>submit</button>
								:
								''
							}
						</div>
					)
					:
					(
						<div className='updatingScore'>
							<h1 className='content is-large'>add wickets</h1>
							{
								wickets.map((typ, index) => {
									return <button onClick={this.handlingWicket} className='button is-outlined' 
									value={typ} key={index}>{typ}</button>
								})
								
							}
						</div>
					)
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


export default connect(mapStateToProps)(Wickets);




