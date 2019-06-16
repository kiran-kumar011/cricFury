import React from 'react';
const { NavLink, Link } = require('react-router-dom');
import {connect} from 'react-redux';

function Navigation(props) {
	console.log(props,'.............props handling');
	return(
		<header>
			<div className='headerWrapper'>
				<ul className='navigationheader'>
					<li>
						<NavLink className='basic' exact activeClassName='active' to='/'>
							Home
						</NavLink>
					</li>
					{
						props.user.email ?
						<div className='swapingHeader'>
							<li>
								<NavLink className='basic' activeClassName='active' to='/profile'>
									Profile
								</NavLink>
							</li>
							<li>
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



function mapStateToProps(state) {
	return {
		user: state.user,
	}
}

export default connect(mapStateToProps)(Navigation);


