import React, { Component } from 'react';
import Nav from './Nav';
import {Redirect, Link} from 'react-router-dom';


class Profile extends Component {

	handleLogout= () => {
		console.log('.........handling the log out........')
		localStorage.clear();
		this.props.dispatch({type: "REMOVE_USER"});
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