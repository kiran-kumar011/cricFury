import React, { Component } from 'react';
const { NavLink, Link } = require('react-router-dom');
import {connect} from 'react-redux';


class Navigation extends Component {

	state = {
		isLoggedOut: false,
	}

	handleLogout = () => {
		console.log('.........handling the log out........');
		localStorage.clear();
		this.props.dispatch({type: "REMOVE_USER"});
		this.setState({ isLoggedOut: true });
	}


	redirectRoute = () => {
		if(this.state.isLoggedOut) {
			return <Redirect to='/' />
		}
	}


	render() {
		return(
			<header>
				{ this.redirectRoute() }
				<div className='headerWrapper'>
					<ul className='navigationheader'>
						<li>
							<NavLink className='basic' exact activeClassName='active' to='/'>
								Home
							</NavLink>
						</li>
						{
							this.props.user.email ?
							<div className='swapingHeader'>
								<li>
									<NavLink className='basic' activeClassName='active' to='/profile'>
										Profile
									</NavLink>
								</li>
								<li onClick={this.handleLogout}>
									<NavLink  className='basic'  activeClassName='active' to='/logout'>
										Logout
									</NavLink>
								</li>
							</div>
							:
							<div className='swapingHeader'>
								<li>
									<NavLink className='basic' activeClassName='active' to='/login'>
										Login
									</NavLink>
								</li>
								<li>
									<NavLink className='basic' activeClassName='active' to='/signup'>
										Signup
									</NavLink>
								</li>
							</div>
						}
					</ul>
				</div>
			</header>
		)
	}

}



function mapStateToProps(state) {
	return {
		user: state.user,
	}
}

export default connect(mapStateToProps)(Navigation);


