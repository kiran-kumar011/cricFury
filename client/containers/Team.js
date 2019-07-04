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
		message: ''
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


	removePlayer = (e) => {
		console.log(e.target.id)
		this.state.players.splice(e.target.id, 1);
		this.setState({players: this.state.players});
	}

	addNewTeam = (e) => {
		this.setState({ teamName: e.target.value, message: '' });
	}

	submitHandler = (e) => {
		e.preventDefault();
		if(!this.state.teamName) {
			this.setState({message: 'please fill in the teamName'})
			return;
		}
		const data = {...this.state } 

		this.props.dispatch(addNewTeam(data));
		
		this.setState({players: [], teamName: '', currentPlayer:'', message: ''});
	}

	render() {

		return(
			<div>
				<Nav/>
				<section className='componentWrapper'>
					<form className='addingTeam' onSubmit={this.submitHandler}>
						<input className='input' type='text' name='teamName' 
						onChange={this.addNewTeam} value={this.state.teamName} 
						placeholder='enter team name'></input>
						{
							this.state.message ? <p className='red'>{this.state.message}</p> : ''
						}
						{
							this.state.players.length === 11 ?  '' :
							<input className='input' type='text' onKeyDown={this.handleKeyDown} 
							name='players' id="player-name-input" placeholder='enter the player name'/>
						}

						{
							this.state.players.length === 11 ? 
							<button className='button sign-up-button'>Submit team</button> 
							: 
							<button className='button sign-up-button' onClick={this.addNewPlayer}>Add</button>
						}
					</form>	
					<div className='playersWrapper'>
						{this.state.players.map((player, i) => {
							return (<div className='player' key={i}>
												<i className="far fa-user" />
												<i onClick={this.removePlayer} id={i} className="fas fa-trash-alt"></i>
												<span>{player}</span>
											</div>)
						})}
					</div>
				</section>
			</div>
		)
	}
}



export default connect()(Team);



