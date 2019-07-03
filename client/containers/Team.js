import React, {Component} from 'react';
import Nav from './Nav';
import axios from 'axios';
import {connect} from 'react-redux';

import { addNewTeam } from '../actions';


class Team extends Component {

	state = {
		teamName: '',
		players: [],
		currentPlayer: '', 
	}

	addNewPlayer = (e) => {
		e.preventDefault();
		const element = document.getElementById('player-name-input');
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
		const data = {...this.state } 

		this.props.dispatch(addNewTeam(data));
		
		this.setState({players: [], teamName: '', currentPlayer:''});
	}

	render() {

		return(
			<div>
				<Nav/>
				<h1>hello</h1>
				<form  onSubmit={this.submitHandler}>
					<input className='input' type='text' name='teamName' 
					onChange={this.addNewTeam} value={this.state.teamName} 
					placeholder='enter team name'></input>
					{
						this.state.players.length === 11 ?  '' :
						<input className='input' type='text' onKeyDown={this.handleKeyDown} 
						name='players' id="player-name-input" placeholder='enter the player name'/>
					}

					{
						this.state.players.length === 11 ? 
						<button className='button'>Submit team</button> 
						: 
						<button className='button' onClick={this.addNewPlayer}>Add</button>
					}
				</form>	
				<div>
					<h1 className='content is-large'>added players</h1>
					{this.state.players.map((player, i) => {
						return <span className='content is-large playerName' key={i}>{player} {(i == 10) ? '.' : ',' }</span>
					})}
				</div>
			</div>
		)
	}
}



export default connect()(Team);



