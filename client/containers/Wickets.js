import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class Wickets extends Component {

// type of wicket fell. 
// out batsman id. 
// handling strike and nonstrike id.
// adding runs if in case.



	state = {
		newBatsmen: localStorage.getItem('newBatsmen') || '',
		isWicket: false,
		isSelected: false,
		typeOfWicket: '',
	}

	handlingWicket = (e) => {
		console.log(e.target.value);
		if(e.target.value == 'bowled' || e.target.value == 'lbw' || e.target.value == 'stumped') {
			console.log('striker got out');
			var { bowlingScoreCard } = this.props.match.firstInnings;
			var id = '';

			bowlingScoreCard.length == 1 ? id = bowlingScoreCard[0]._id : '';

			bowlingScoreCard.forEach(bow => {
				if(bow.playerId._id == localStorage.getItem('newBowler')) {
					id = bow._id;
					console.log('bowler from forEach after post requst', bow)
				} 
			})
			this.postToAddNewWicket(localStorage.getItem('currentStriker'),  id, e.target.value);

		} else {
			console.log('take got out batsmen id from admin');
		}
	}

	postToAddNewWicket = (batsmenId, bowlerId, typeOfWicket) => {
		console.log(batsmenId, bowlerId, typeOfWicket, 'from posting wickerts request');




		var isOverComplete = localStorage.getItem('ballsBowled').length == 0 ? true : false;
		console.log(isOverComplete, '..............over completed state............');
		var data = {
			batsmenId,
			bowlerId,
			typeOfWicket,
			isOverComplete,
		}

		axios.post('http://localhost:3000/api/v1/live/add/wickets/firstInnings', data)
		.then(res => {
			console.log(res);
			this.setState({ isWicket: true,  typeOfWicket: typeOfWicket});
			this.props.getMatchData();
		}).catch(err => console.log(err));

	}

	selectNewBatsmen = (e) => {
		console.log(e.target.value);
		this.setState({ newBatsmen : e.target.value, isSelected: true });
	}


	posttoAddNewBatsmen = () => {
		console.log('dasdasd');

		var length = this.props.match.firstInnings.batsmanScoreCard.length + 1;
		var id = this.props.match.firstInnings._id; 

		var data = { playerId: localStorage.getItem('newBatsmen'), position: length, inningsId: id }

		axios.post('http://localhost:3000/api/v1/live/add/new/batsmen', data)
		.then(res => {
			console.log(res);
			this.props.getMatchData();
			this.props.wicket(this.state.typeOfWicket);
		}).catch(err => {
			console.log(err)
		})
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
				</div>
				<div className='updatingScore'>
					<h1 className='content is-large'>add wickets</h1>
					{
						wickets.map((typ, index) => {
							return <button onClick={this.handlingWicket} className='button is-outlined' value={typ} key={index}>{typ}</button>
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




