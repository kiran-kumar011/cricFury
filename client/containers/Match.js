import React, { Component } from 'react';
import Nav from './Nav';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Match extends Component {
	
	state = {
		team1: '',
		team2: '',
		ground: '',
		isMatchCreated: false,
		redirect: false,
	}

	selectTeam = (e) => {
		console.dir(e.target);
		this.setState({[e.target.name]: e.target.value})
	}

	componentDidMount = () => {
		axios.get('http://localhost:3000/api/v1/cricket/create/match').then(response => {
				console.log(response);
				this.props.dispatch({type: "ADDED_NEW_TEAM", data: response.data});
			}).catch(error => {
				console.log(error);
			})
	}


	submitTeams = (e) => {
		e.preventDefault();
		const data = {...this.state}
		this.setState({team1:'', team2: '', ground: ''});
		axios.post('http://localhost:3000/api/v1/cricket/create/match', data)
		.then(res => {
			console.log(res);
			localStorage.setItem('matchId', res.data._id);
			this.setState({redirect: true, isMatchCreated: true});
		}).catch(err => console.log(err));
	}


	setRedirectToScoring = () =>  {
		if(this.state.redirect && this.state.isMatchCreated) {
			return <Redirect to='/live/update' />
		}
	}


	render() {
		const filterteam1 = (this.props.teams.length ? this.props.teams : [] ).filter((team, index) => this.state.team2 != team._id);
		const filterTeam2 =  (this.props.teams.length ? this.props.teams : [] ).filter((team, index) => this.state.team1 != team._id);
		console.log(filterteam1, filterTeam2);

		return(
			<div className='control selectContailer container is-fluid'>
			{this.setRedirectToScoring()}
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
					<input className='input' type='text' onChange={this.selectTeam} name='ground' placeholder='enter the ground name' value={this.state.ground}></input>
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


