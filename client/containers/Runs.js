import React, { Component } from 'react';

class Runs extends Component {
	state = {
		runs: '',
		balls: JSON.parse(localStorage.getItem('ballsBowled')) || [],
	}

	updateRuns = (e) => {

		// if(this.state.balls > 6) {
		// 	this.setState({balls: null});
		// 	localStorage.setItem('ballsBowled', JSON.stringify(this.state.balls));
		// }
		
		console.log(e.target, 'button clicked');
		if(+(e.target.value) % 2 == 0) {

			this.state.balls.push(e.target.value);
			this.setState({balls: this.state.balls});

		}	else {
			console.log('odd numbers');
			this.state.balls.push(e.target.value);
			this.setState({balls: this.state.balls});
		}

	}


	render() {

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

export default Runs;