import React, { Component } from 'react';
import Nav from './Nav';
import {Redirect} from 'react-router-dom';


class Profile extends Component {

	state = {
		isTeamClicked: false,
		redirect: false,
		isMatchClicked: false,
	}


	isTeamClicked = () => {
		this.setState({isTeamClicked: true, redirect: true});
	}

	handleLogout= () => {
		console.log('.........handling the log out........')
		localStorage.clear();
		this.props.dispatch({type: "REMOVE_USER"});
	}

	renderRedirect = () => {
		if(this.state.redirect && this.state.isTeamClicked) {
			return <Redirect to='/create/team' />
		} else if(this.state.redirect && this.state.isMatchClicked) {
			return <Redirect to='/create/match' />
		}
	}


	render() {
		return(
			<div>
				{this.renderRedirect()}
				<Nav logout={this.handleLogout}/>
				<h1 onClick={this.isTeamClicked} >create new team</h1>
				<h1 onClick={() => this.setState({isMatchClicked: true, redirect: true})} >create new match</h1>
				<h1 to='/update/score'>ongoing match</h1>
			</div>
		)
	}
}

export default Profile;