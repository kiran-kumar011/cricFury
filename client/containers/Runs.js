import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Wickets from './Wickets';
import Extras from './Extras';

class Runs extends Component {
	state = {
		balls: JSON.parse(localStorage.getItem('ballsBowled')) || [],
		striker: '',
		nonStriker: '',
		currentStriker: localStorage.getItem('currentStriker') || '',
		bowler: localStorage.getItem('currentBowler') || '',
		inningsId: '',
		nextBowler: localStorage.getItem('newBowler') || '',
		isNewBowler: false, 
	}

	updateRuns = (e) => {
		var run = +(e.target.value);


		

		// this.state.bowler ? this.state.bowler : this.setState({bowler: newBowler._id});

 		if(run % 2 == 0) {
 			console.log('event numbers');
 			// even runs scored 
 			this.state.balls.push(run);

 			if(this.state.balls.length == 6) {
 				this.state.balls.length = 0;
 				this.setState({balls: this.state.balls, striker: this.state.nonStriker, nonStriker: this.state.striker, currentStriker: this.state.nonStriker, bowler: ''});
 			} else {
 				this.setState({balls: this.state.balls });
 			}
 			
 			// var isOverComplete = this.state.balls.length == 0 ? true: false;

 			// console.log('is over completed status, check state', isOverComplete, this.props.match.firstInnings.numOvers, this.state.balls.length );
 			this.postRunsToServer(run, localStorage.getItem('currentStriker'), localStorage.getItem('currentBowler'), (this.state.balls.length == 0 ? true: false), this.state.inningsId);

 		} else {
 			console.log('odd numbers');

 			// odd run handling state.

 			this.state.balls.push(run);
 			console.log(this.state.balls.length, 'before setstate');

 			if(this.state.balls.length != 6) {
 				this.setState({balls: this.state.balls, striker: this.state.nonStriker, nonStriker: this.state.striker, currentStriker: this.state.nonStriker, });
 				console.log(this.state.balls.length, 'after setstate');
 			}
 			if(this.state.balls.length == 6) {
 				this.state.balls.length = 0;
 				this.setState({balls: this.state.balls, bowler: ''});
 			}
 			this.postRunsToServer(run, localStorage.getItem('currentStriker'), localStorage.getItem('currentBowler'), (this.state.balls.length == 0 ? true: false), this.state.inningsId);
 		}
	}


	getMatchData = () => {
		axios.get('http://localhost:3000/api/v1/live/start/match/firstInnings')
		.then(res => {
			console.log(res);
			this.props.dispatch({type: 'ADD_MATCH', data: res.data.match});


			var newBowler = bowlingScoreCard.length > 1 ? bowlingScoreCard.filter(bow => bow.playerId._id == this.state.nextBowler) : bowlingScoreCard;


			console.log(newBowler, 'new bowler after fetching the data');
			this.setState({ isUpdated: true });
		}).catch(err => console.log(err))
	}


	componentDidUpdate() {
		console.log('componentDidUpdate')
		var { batsmanScoreCard, bowlingScoreCard } = this.props.match.firstInnings;

		var currentBowler = bowlingScoreCard[0]._id;

		var batsmenPlaying = batsmanScoreCard.filter(player => (!player.isOut && player.isBatted)).map(playr => ({...playr, isOnStrike: false }));

		var striker = batsmenPlaying ? batsmenPlaying : [];
		console.log(this.state.currentStriker ? true: false, 'from componentDidUpdate');

		var nonStriker = batsmanScoreCard.filter(player => player._id != this.state.currentStriker)

		// var inningsId = this.props.match.firstInnings.numOversBowled;

		// adding new bowler in locals.
		// var newBowler = bowlingScoreCard.length > 1 ? bowlingScoreCard.filter(bow => bow.playerId._id == this.state.nextBowler) : bowlingScoreCard;

		// console.log(newBowler, 'filtered next bowler')

		// !this.state.bowler && this.state.nextBowler ? '' : this.setState({bowler: newBowler[0]._id});

		this.state.nonStriker && this.state.striker ? '' : this.setState({striker: this.state.currentStriker, nonStriker: nonStriker[0]._id, inningsId: this.props.match.firstInnings._id })


		console.log(nonStriker, 'nonstriker on refresh');
		this.props.balls(this.state.balls.length);
		this.state.currentStriker ? this.state.currentStriker : this.setState({striker: striker[0]._id, nonStriker: striker[1]._id, currentStriker: striker[0]._id, bowler: currentBowler})
	}


	submitNewBowler = (e) => {
		console.log(e.target.value, 'new bowler id');
		this.setState({ isNewBowler: true, nextBowler:  e.target.value})
	}


	postRunsToServer = (run, batsmenId, bowlerId, isOverComplete, inningsId) => {

		var { batsmanScoreCard, bowlingScoreCard } = this.props.match.firstInnings;

		var id = '';

		bowlingScoreCard.length == 1 ? id = bowlingScoreCard[0]._id : '';

		bowlingScoreCard.forEach(bow => {
			if(bow.playerId._id == this.state.nextBowler) {
				id = bow._id;
				console.log('bowler from forEach after post requst', bow)
			} 
		})



		console.log(run , batsmenId, bowlerId, isOverComplete, id, '.................................');


		const data = { run, batsmenId, bowlerId: id, inningsId, isOverComplete };

		axios.post('http://localhost:3000/api/v1/live/add/runs/firstInnings', data)
		.then(res => {
			console.log(res, 'after run update sent');
			this.getMatchData();
		}).catch(err => {
			console.log(err);
		})
	}


	postNewBowler = (e) => {
		e.preventDefault();
		console.log('postNewBowler clicked');
		var data = { bowlerId: this.state.nextBowler, inningsId: this.state.inningsId }

		axios.post('http://localhost:3000/api/v1/live/add/new/bowler/firstInnings', data).then(res => {
				console.log(res, 'server response afet ading new bowler');
				this.getMatchData();

		}).catch(err => {
			console.log(err);
		})
	}


	render() {
		var overs = this.props.match.firstInnings ?  this.props.match.firstInnings.numOversBowled : 0;  

		var bowlers = this.props.match.firstInnings ? this.props.match.firstInnings.bowlingTeamId.players : [];

		localStorage.setItem('newBowler', this.state.nextBowler);

		localStorage.setItem('currentBowler', this.state.bowler);

		localStorage.setItem('currentStriker', this.state.currentStriker);

		localStorage.setItem('ballsBowled', JSON.stringify(this.state.balls));

		const scores = [0, 1, 2, 3, 4, 6];

		return(
			<div>
				<div>
					{
						((this.state.balls.length == 0) && (overs > 0)) ?
						<div>
							<select name='bowler' onChange={this.submitNewBowler} >
							{
								bowlers.map(bowlr => {
									return <option key={bowlr._id} value={bowlr._id}>{bowlr.playerName}</option>
								})
							}
							</select>
							{
								(this.state.isNewBowler) ? 
								<button onClick={this.postNewBowler}>submit</button> : ''
							}
						</div>
						: 
						''
					}
				</div>

				<div className='updatingScore'>
					<h1 className='content is-large'>add runs</h1>
					{
						scores.map((num, index) => {
							return <button onClick={this.updateRuns} value={num} className='button is-outlined' key={index}>{num}</button>
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

export default connect(mapStateToProps)(Runs);



