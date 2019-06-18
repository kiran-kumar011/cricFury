import React, { Component } from 'react';
import Nav from './Nav';
import {Redirect, Link} from 'react-router-dom';


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
		} else if(this.state.redirect && this.state.isUpdatingClicked) {
			return <Redirect to='/score/update' />
		}
	}


	render() {
		return(
			<div>
				<Nav logout={this.handleLogout}/>
				<Link to='/create/team'><h1>create new team</h1></Link>
				<Link to='/create/match'><h1>create new match</h1></Link>
				<Link to='/live/update'><h1>ongoing match</h1></Link>
			</div>
		)
	}
}

export default Profile;