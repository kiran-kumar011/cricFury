import React, { Component } from 'react';
import Nav from './Nav';
import axios from 'axios';
import Runs from './Runs';
import Extras from './Extras';
import Wickets from './Wickets';

class Scoring extends Component {
	state = {
		matchData: null,
		tossWonBy: '',
		optedTo: '',
		isTossWonteam1: false,
		isTossWonteam2: false,
		isOptedToBat: false,
		isOptedToBowl: false,
		start: false,
	}


	submitMatchData = (e) => {
		e.preventDefault();
		const data = {tossWonBy: this.state.tossWonBy, optedTo: this.state.optedTo }
		axios.post('http://localhost:3000/api/v1/cricket/matches/update/toss/bat/bowl', data).then(res => {
			console.log(res)
			this.setState({matchData: res.data.match})
		}).catch(err => console.log(err));
	}


	componentDidMount = () => {
		console.log('..........mounted scoring......')
		axios.get('http://localhost:3000/api/v1/cricket/matches/innings/update').then(res => {
			console.log(res);
			this.setState({matchData: res.data})
		}).catch(err => console.log(err));
	}


	render() {
		const scores = [0, 1, 2, 3, 4, 6];
		const match = this.state.matchData ? this.state.matchData : {}
		return(
			<div>
				<Nav />
				<h1>create scoring page</h1>
				<section onSubmit={this.submitMatchData}>
					{
						match.tossWonBy ? 
						''
						: 
						(<div>
							<h1>toss won by</h1>
							<button className={this.state.isTossWonteam1 ? 'activeButton': 'inactiveButton'} onClick={() => this.setState({tossWonBy: this.state.matchData.team1._id, isTossWonteam1: true, isTossWonteam2: false})}>{this.state.matchData? this.state.matchData.team1.teamName : 'team1'}</button>
							<button className={this.state.isTossWonteam2 ? 'activeButton': 'inactiveButton'} onClick={() => this.setState({tossWonBy: this.state.matchData.team2._id, isTossWonteam2: true, isTossWonteam1: false})}>{this.state.matchData ? this.state.matchData.team2.teamName : 'team2'}</button>
						</div>)
					}

					{
						match.optedTo ? 
						''
						: 
						(
							<div>
								<h1>elected to bat or bowl</h1>
								<button className={this.state.isOptedToBat ? 'activeButton': 'inactiveButton'} onClick={() => this.setState({isOptedToBat: true, isOptedToBowl: false, optedTo: 'bat'})}>bat</button>
								<button className={this.state.isOptedToBowl ? 'activeButton': 'inactiveButton'} onClick={() => this.setState({isOptedToBat: false, isOptedToBowl: true, optedTo: 'bowl'})}>bowl</button>
							</div>
						)
					}
					{
						match.optedTo ? '' : <button onClick={this.submitMatchData}>submit</button>
					}
				</section>
				{
					this.state.start && match.optedTo ? 
					(
						<section>
							<Runs />
							<Extras />
							<Wickets />
						</section>
						
					)
					: <button onClick={() => this.setState({start: true})}>Start the Game</button>
				}
			</div>
		)
	}
}



export default Scoring;
