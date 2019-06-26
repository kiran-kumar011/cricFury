import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Wickets from './Wickets';
import Extras from './Extras';

class Runs extends Component {
	state = {
		balls: JSON.parse(localStorage.getItem('ballsBowled')) || [],
		striker: '',
		nonStriker: localStorage.getItem('nonStriker') || '',
		currentStriker: localStorage.getItem('currentStriker') || '',
		bowler: localStorage.getItem('currentBowler') || '',
		inningsId: '',
		nextBowler: localStorage.getItem('newBowler') || '',
		isNewBowler: false,
		isWicket: false,
	}

	updateRuns = (e) => {
		var run = +(e.target.value);

 		if(run % 2 == 0) {
 			// even runs scored 
 			this.state.balls.push(run);

 			if(this.state.balls.length == 6) {
 				this.state.balls.length = 0;
 				this.setState({balls: this.state.balls, striker: this.state.nonStriker, nonStriker: this.state.striker, currentStriker: this.state.nonStriker, bowler: ''});
 			} else {
 				this.setState({balls: this.state.balls });
 			}
 			

 			this.postRunsToServer(run, localStorage.getItem('currentStriker'), localStorage.getItem('currentBowler'), (this.state.balls.length == 0 ? true: false));

 		} else {

 			// odd run handling state.

 			this.state.balls.push(run);

 			if(this.state.balls.length != 6) {
 				this.setState({balls: this.state.balls, striker: this.state.nonStriker, nonStriker: this.state.striker, currentStriker: this.state.nonStriker });
 			}
 			if(this.state.balls.length == 6) {
 				this.state.balls.length = 0;
 				this.setState({balls: this.state.balls, bowler: ''});
 			}
 			this.postRunsToServer(run, localStorage.getItem('currentStriker'), localStorage.getItem('currentBowler'), (this.state.balls.length == 0 ? true: false));
 		}
	}


	getMatchData = () => {
		axios.get('http://localhost:3000/api/v1/live/start/match/firstInnings')
		.then(res => {
			console.log(res);
			this.props.dispatch({type: 'ADD_MATCH', data: res.data.match});

			this.setState({ isUpdated: true });
		}).catch(err => console.log(err))
	}


	componentDidUpdate() {
		console.log('componentDidUpdate')
		var { batsmanScoreCard, bowlingScoreCard } = this.props.match.firstInnings;

		var currentBowler = bowlingScoreCard[0]._id;

		var batsmenPlaying = batsmanScoreCard.filter(player => (!player.isOut && player.isBatted)).map(playr => ({...playr, isOnStrike: false }));

		console.log(batsmenPlaying, 'playing batsmen arr');

		var striker = batsmenPlaying ? batsmenPlaying : [];

		var nonStriker = batsmanScoreCard.filter(player => player._id != this.state.currentStriker)


		// on refresh updating the ids of current playing batsmen.
		// if(batsmenPlaying.length > 1) {
		// 	this.state.nonStriker && this.state.striker ? '' : this.setState({striker: this.state.currentStriker, nonStriker: nonStriker[0]._id, inningsId: this.props.match.firstInnings._id });
		// }

		 this.state.striker ? '' : this.setState({ striker: this.state.currentStriker });

		this.props.balls(this.state.balls.length);


		this.state.currentStriker  ? this.state.currentStriker : this.setState({striker: striker[0]._id, nonStriker: striker[1]._id, currentStriker: striker[0]._id, bowler: currentBowler});
	}


	submitNewBowler = (e) => {
		this.setState({ isNewBowler: true, nextBowler: e.target.value})
	}


	postRunsToServer = (run, batsmenId, bowlerId, isOverComplete) => {

		var { batsmanScoreCard, bowlingScoreCard } = this.props.match.firstInnings;

		var id = '';

		bowlingScoreCard.length == 1 ? id = bowlingScoreCard[0]._id : '';

		bowlingScoreCard.forEach(bow => {
			if(bow.playerId._id == this.state.nextBowler) {
				id = bow._id;
				console.log('bowler from forEach after post requst', bow)
			} 
		})

		var inningsId = this.props.match.firstInnings._id;

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
		var data = { bowlerId: this.state.nextBowler, inningsId: this.props.match.firstInnings._id }

		axios.post('http://localhost:3000/api/v1/live/add/new/bowler/firstInnings', data).then(res => {
				console.log(res, 'server response afet ading new bowler');
				this.getMatchData();

		}).catch(err => {
			console.log(err);
		})
	}


	addingWicketsToBallsBowledArr = (type) => {
		console.log(type,'..............................daafdafsd............');

		var batsmenPlaying = this.props.match.firstInnings.batsmanScoreCard.filter(player => (!player.isOut && player.isBatted));

		var striker = batsmenPlaying.filter(bats => bats._id != this.state.nonStriker);

		console.log(batsmenPlaying, 'after wicket updation checking the players added', this.state.nonStriker)

		var id = striker.length == 1 ? striker[0]._id : '';

		console.log(id, '...............newId for striker to assign............');

		// this.state.balls.push(type);
		// if(this.state.balls.length == 6) {
		// 	console.log(type,'..............................daafdafsd check1............')
		// 	this.state.balls.length = 0;
		
		// 	this.setState({balls: this.state.balls, currentStriker: this.state.nonStriker, striker: this.state.nonStriker, nonStriker: id });
		// 	console.log('after setting the setState currentStriker', this.state.currentStriker, this.state.nonStriker,  );
		// } else {
		// 	console.log(type,'..............................daafdafsd check2............')
		// 	this.setState({ balls: this.state.balls, currentStriker: id, striker: id });
		// }

	}


	render() {
		var overs = this.props.match.firstInnings ?  this.props.match.firstInnings.numOversBowled : 0;  

		var bowlers = this.props.match.firstInnings ? this.props.match.firstInnings.bowlingTeamId.players : [];

		localStorage.setItem('newBowler', this.state.nextBowler);

		localStorage.setItem('currentBowler', this.state.bowler);

		localStorage.setItem('currentStriker', this.state.currentStriker);

		localStorage.setItem('ballsBowled', JSON.stringify(this.state.balls));

		localStorage.setItem('nonStriker', this.state.nonStriker);

		const scores = [0, 1, 2, 3, 4, 6];

		return(
			<div >
				<div>
					{
						((this.state.balls.length == 0) && (overs > 0)) ?
						<div>
							<select className="select " name='bowler' onChange={this.submitNewBowler} >
							{
								bowlers.map(bowlr => {
									return <option className='content is-large' key={bowlr._id} value={bowlr._id}>{bowlr.playerName}</option>
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

				<div className="updatingScoreWrapper">
					<div className='updatingScore'>
						<h1 className='content is-large'>add runs</h1>
						{
							scores.map((num, index) => {
								return <button onClick={this.updateRuns} value={num} className='button is-outlined' key={index}>{num}</button>
							})
						}
					</div>
					<div>
						<Wickets ballsArr={this.state.balls} getMatchData={this.getMatchData} wicket={this.addingWicketsToBallsBowledArr}/>
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

export default connect(mapStateToProps)(Runs);



