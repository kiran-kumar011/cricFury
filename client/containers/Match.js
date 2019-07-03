import React, { Component } from 'react';
import Nav from './Nav';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { createNewMatch, getAllTeam, getMatchDetails } from '../actions';
 
class Match extends Component {
	
	state = {
		team1: '',
		team2: '',
		ground: '',
	}

	selectTeam = (e) => {
		this.setState({[e.target.name]: e.target.value})
	}

	componentDidMount = () => {
		this.props.dispatch(getAllTeam());
	}


	submitTeams = (e) => {
		e.preventDefault();
		const data = {...this.state}

		this.props.dispatch(createNewMatch(data)).then(res => {
			console.log(res, 'after action creator is returning promise');
			
			if(res.success) {
				this.props.dispatch(getMatchDetails()).then(res => {
					console.log(res, '..........matchdetails before redirecting to scoring');

					localStorage.setItem('matchId', res.data._id)
					this.setState({team1:'', team2: '', ground: ''});
					this.props.history.push('/live/update');
				})
			}
		});

	}


	render() {
		let filterteam1 = (this.props.teams.length ? this.props.teams : [] )
		.filter((team, index) => this.state.team2 != team._id);
		let filterTeam2 =  (this.props.teams.length ? this.props.teams : [] )
		.filter((team, index) => this.state.team1 != team._id);

		return(
			<div className='control selectContailer container is-fluid'>
				<Nav />
				<form className="select is-multiple" onSubmit={this.submitTeams}>
					<select onChange={this.selectTeam} name="team1">
						<option>select team1</option>
						{
							(filterteam1.length ? filterteam1 : [])
							.map((team, index) => {
								return	<option key={index} value={team._id}>{team.teamName}</option>
							})
						}
					</select>
					<select onChange={this.selectTeam} name="team2">
						<option>select team2</option>
						{
							(filterTeam2.length ? filterTeam2 : [])
							.map((team, index) => {
								return <option key={index} value={team._id}>{team.teamName}</option>
							})
						}
					</select>
					<input className='input' type='text' onChange={this.selectTeam} name='ground' 
					placeholder='enter the ground name' value={this.state.ground}></input>
					<button type='submit'>submit</button>
				</form>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		teams: state.teams
	}
}

export default connect(mapStateToProps)(Match);


