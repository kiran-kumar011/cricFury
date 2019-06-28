import React, { Component } from 'react';
import Nav from './Nav';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Login from './Login';
import Logout from './Logout';

class Home extends Component {

	handleLogout= () => {
		console.log('.........handling the log out........')
		localStorage.clear();
		this.props.dispatch({type: "REMOVE_USER"});
	}

	componentDidMount() {
		var token = localStorage.getItem('authToken'); 
		if(token && !this.props.user.email) {
			axios.get('http://localhost:3000/api/v1/users/me',
				{headers: {
					'Authorization': `bearer ${localStorage.getItem('authToken')}` 
				}}).then(response => {
					console.log(response);
					this.props.dispatch({type: "ADD_CURRENT_USER", data: response.data})
				}).catch(error => {
					console.log(error);
				})
		}
	}

	render() {
		return(
			<div>
				<Nav logout={this.handleLogout} />
				{
					this.props.user.email ?
						<Dashboard />
					: 
						<div>Homepage, before login.</div>
				}
			</div>	
		)
	}
}


function Dashboard () {
	return (
		<div>
			<Link to="/create/team">Create New Team</Link> <br/>
			<Link to="/create/match">Create New Match</Link> <br/>
			<Link to="/live/update">Ongoing Match</Link> <br/>
		</div>
	)
}

function mapStateToProps(state) {
	return {
		user: state.user,
	}
}

export default connect(mapStateToProps)(Home);




