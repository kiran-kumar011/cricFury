import React, {Component} from 'react';
import Nav from './Nav';
import axios from 'axios';
import {connect} from 'react-redux';


class Team extends Component {

	state = {
		teamName: '',
		players: [],
		currentPlayer: '', 
	}

	addNewPlayer = (e) => {
		e.preventDefault();
		const element = document.getElementById('player-name-input');
		if(this.state.players.length == 11) {
			return alert('Maximum only 11 players can be added. Already added 11.');
		}
		if(element.value) {
			this.state.players.push(element.value);
			this.setState({ players: this.state.players, currentPlayer: '' });
			element.value = '';
		}	
	}

	handleKeyDown = (e) => {
		const element = document.getElementById('player-name-input');
		if(e.key === 'Enter' && e.target.value) {
			this.state.players.push(element.value);
			this.setState({ players: this.state.players });
			element.value = '';
		}
	}

	addNewTeam = (e) => {
		this.setState({ teamName: e.target.value });
	}

	submitHandler = (e) => {
		e.preventDefault();
		console.log(this.state);
		const data = {...this.state } 
		this.setState({players: [], teamName: '', currentPlayer:''});
		console.log(this.state);
		axios.post('http://localhost:3000/api/v1/cricket/new/team', data).then(response => {
			if(response) {
				console.log(response);
				this.props.dispatch({type: 'ADD_NEW_TEAM', data: response.data});
			}

		}).catch(error => {
			console.log(error);
		})
	}

	render() {

		return(
			<div>
				<Nav/>
				<h1>hello</h1>
				<form onSubmit={this.submitHandler}>
					<input  type='text' name='teamName' onChange={this.addNewTeam} value={this.state.teamName} placeholder='enter team name'></input>

					{
						this.state.players.length === 11 ?  '' :
						<input type='text' onKeyDown={this.handleKeyDown} name='players' id="player-name-input" placeholder='enter the player name'/>
						
					}

					{
						this.state.players.length === 11 ? <button>Submit team</button> : <button onClick={this.addNewPlayer}>Add</button>
					}
				</form>	
				<div>
					{this.state.players.map((player, i) => {
						return <p key={i}>{player}</p>
					})}
				</div>
			</div>
		)
	}
}

// function mapStateToProps(state) {
// 	return {
// 		state,
// 	}
// }

export default connect()(Team);



