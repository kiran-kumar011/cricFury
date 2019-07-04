import React, { Component } from 'react';
import Nav from './Nav';
import {Link} from 'react-router-dom';


class Profile extends Component {


	render() {
		return(
			<div>
				<Nav />
				<Link to='/create/team'><h1>create new team</h1></Link>
				<Link to='/create/match'><h1>create new match</h1></Link>
				<Link to='/live/update'><h1>ongoing match</h1></Link>
			</div>
		)
	}
}

export default Profile;