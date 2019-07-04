import React, { Component } from 'react';
import Nav from './Nav';
import axios from 'axios';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

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
			<div>
				<Nav />
				<section className='macthWrapper'>
					<NavLink className='live' activeClassName='active' to='/live/update'>
						Ongoing match
					</NavLink>
					<form className='matchForm' onSubmit={this.submitTeams}>
						<div className="field select">
						  <div className="control">
						    <div className="select is-info" >
						      <select onChange={this.selectTeam} name="team1">
						        <option>select team1</option>
						        {
						        	(filterteam1.length ? filterteam1 : [])
						        	.map((team, index) => {
						        		return	<option key={index} value={team._id}>{team.teamName}</option>
						        	})
						        }
						      </select>
						    </div>
						  </div>
						</div>
						<div className="field">
						  <div className="control">
						    <div className="select is-info" >
						      <select onChange={this.selectTeam} name="team2">
						        <option>select team2</option>
						        {
						        	(filterTeam2.length ? filterTeam2 : [])
						        	.map((team, index) => {
						        		return <option key={index} value={team._id}>{team.teamName}</option>
						        	})
						        }
						      </select>
						    </div>
						  </div>
						</div>
						<input className='input' type='text' onChange={this.selectTeam} name='ground' 
						placeholder='enter the ground name' value={this.state.ground}></input>
						<button className='button' type='submit'>Submit</button>
					</form>
				</section>
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


