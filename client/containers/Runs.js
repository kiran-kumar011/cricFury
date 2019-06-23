import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class Runs extends Component {
	state = {
		runs: '',
		balls: JSON.parse(localStorage.getItem('ballsBowled')) || [],
		striker: '',
		nonStriker: '',
		currentStriker: localStorage.getItem('currentStriker') || '',
		bowler: localStorage.getItem('currentBowler') || '',
	}

	updateRuns = (e) => {
		var run = +(e.target.value);

 		if(run % 2 == 0) {
 			console.log('event numbers');
 			this.state.balls.push(run);
 			this.setState({balls: this.state.balls});
 			if(this.state.balls.length == 6) {
 				this.state.balls.length = 0;
 				this.setState({balls: this.state.balls, striker: this.state.nonStriker, nonStriker: this.state.striker, currentStriker: this.state.nonStriker });
 			}
 			
 			this.postRunsToServer(run, localStorage.getItem('currentStriker'), localStorage.getItem('currentBowler'));

 		} else {
 			console.log('odd numbers');
 			this.state.balls.push(run);
 			console.log(this.state.balls.length, 'before setstate');

 			if(this.state.balls.length != 6) {
 				this.setState({balls: this.state.balls, striker: this.state.nonStriker, nonStriker: this.state.striker, currentStriker: this.state.nonStriker });
 				console.log(this.state.balls.length, 'after setstate');
 			}
 			if(this.state.balls.length == 6) {
 				this.state.balls.length = 0;
 				this.setState({balls: this.state.balls});
 			}
 			this.postRunsToServer(run, localStorage.getItem('currentStriker'), localStorage.getItem('currentBowler'));
 		}
	}


	getMatchData = () => {
		axios.get('http://localhost:3000/api/v1/live/start/match/firstInnings')
		.then(res => {
			console.log(res);
			this.props.dispatch({type: 'ADD_MATCH', data: res.data.match});
			this.setState({ isUpdated: true })
		}).catch(err => console.log(err))
	}


	componentDidUpdate() {
		console.log('componentDidUpdate')
		var { batsmanScoreCard, bowlingScoreCard } = this.props.match.firstInnings;

		var currentBowler = bowlingScoreCard[0]._id;

		var batsmenPlaying = batsmanScoreCard.filter(player => (!player.isOut && player.isBatted)).map(playr => ({...playr, isOnStrike: false }));

		var striker = batsmenPlaying ? batsmenPlaying : [];

		this.state.currentStriker ? this.state.currentStriker : this.setState({striker: striker[0]._id, nonStriker: striker[1]._id, currentStriker: striker[0]._id, bowler: currentBowler})
	}

	// componentDidMount() {
	// 	console.log('componentDidMount')
	// }

	postRunsToServer = (run, batsmenId, bowlerId) => {
		console.log(run , batsmenId, bowlerId);
		const data = {run, batsmenId, bowlerId }

		axios.post('http://localhost:3000/api/v1/live/add/runs/firstInnings', data)
		.then(res => {
			console.log(res, 'after run update sent');
			this.getMatchData();
		}).catch(err => {
			console.log(err);
		})
	}

	render() {

		localStorage.setItem('currentBowler', this.state.bowler);

		localStorage.setItem('currentStriker', this.state.currentStriker);

		localStorage.setItem('ballsBowled', JSON.stringify(this.state.balls));

		const scores = [0, 1, 2, 3, 4, 6];

		return(
			<div className='updatingScore'>
				<h1 className='content is-large'>add runs</h1>
				{
					scores.map((num, index) => {
						return <button onClick={this.updateRuns} value={num} className='button is-outlined' key={index}>{num}</button>
					})
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

export default connect(mapStateToProps)(Runs);



