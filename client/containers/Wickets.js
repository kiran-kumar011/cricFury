import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { updateWickets, addNewBatsmen, getLiveScoreUpdate } from '../actions';

class Wickets extends Component {


	state = {
		newBatsmen: localStorage.getItem('newBatsmen') || '',
		isWicket: false,
		isSelected: false,
		typeOfWicket: '',
	}

	handlingWicket = (e) => {
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
			console.log('take got out batsmen id from admin');
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

		this.props.dispatch(updateWickets(data, this.getMatchData()))
		
		this.setState({  isWicket: true, typeOfWicket: typeOfWicket});

	}

	selectNewBatsmen = (e) => {
		console.log(e.target.value);
		this.setState({ newBatsmen : e.target.value, isSelected: true });
	}


	posttoAddNewBatsmen = () => {

		var length = this.props.match.firstInnings.batsmanScoreCard.length + 1;
		var id = this.props.match.firstInnings._id; 

		var data = { playerId: localStorage.getItem('newBatsmen'), position: length, inningsId: id }

		this.props.dispatch(addNewBatsmen(data, this.getMatchData));
	}

	getMatchData = () => {
		this.props.dispatch(getLiveScoreUpdate())

		this.props.wicket(this.state.typeOfWicket);

	}

	render() {

		localStorage.setItem('newBatsmen', this.state.newBatsmen);

		const wickets = ['bowled', 'caughtOut', 'lbw', 'runout', 'stumped'];

		var batsmens = this.props.match.firstInnings ? this.props.match.firstInnings.battingTeamId.players : [];

		return(
			<div>
				<div>
					{
						this.state.isWicket ? 
						<div>
							<select onChange={this.selectNewBatsmen}>
								{
									batsmens.map(batsmen => {
										return <option key={batsmen._id} value={batsmen._id}>{batsmen.playerName}</option>
									})
								}
							</select>
						</div>
						:
						''
					}
					{
						this.state.isSelected ? 
						<button onClick={this.posttoAddNewBatsmen}>submit</button> : ''
					}
					{
						this.props.isWicket ? 
						<button onClick={this.props.updateWicket}>update Batsmen</button>
						:
						''
					}
				</div>
				<div className='updatingScore'>
					<h1 className='content is-large'>add wickets</h1>
					{
						wickets.map((typ, index) => {
							return <button onClick={this.handlingWicket} className='button is-outlined' 
							value={typ} key={index}>{typ}</button>
						})
						
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


export default connect(mapStateToProps)(Wickets);




