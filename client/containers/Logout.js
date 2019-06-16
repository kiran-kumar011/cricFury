import React, { Component } from 'react';
import Nav from './Nav';


class Logout extends Component {
	handleLogout= () => {
		console.log('.........handling the log out........')
		localStorage.clear();
		this.props.dispatch({type: "REMOVE_USER"});
	}
	
	render() {
		return(
			<div>
				<Nav logout={this.handleLogout}/>
			</div>
		)
	}
}

export default Logout;