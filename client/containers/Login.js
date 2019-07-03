import React, { Component } from 'react';
import Nav from './Nav';
import axios from 'axios';
import { connect } from 'react-redux';
import Logout from './Logout';
import {Redirect} from 'react-router-dom';


import { verifyLoggedInUser } from '../actions';



class Login extends Component {
	state = {
		email: '',
		password: '',
		isLoggedIn: false,
		message: ''
	}


	handleChange = (e) => {
		this.setState({[e.target.name]: e.target.value });
	}


	submitHandler = (e) => {
		e.preventDefault();
		var data = {...this.state};

		this.props.dispatch(verifyLoggedInUser(data)).then(res => {
			console.log(res, 'after login promise returned from action creator');
			if(res.success) {
				this.setState({
					isLoggedIn: true, 
					email: '', 
					password: '', 
					message: res.message 
				});
				setTimeout(() => this.props.history.push('/'), 1000);
			} else {
				this.setState({ message: res.message })
			} 
		})

	}


	render() {

		return(
			<div>
				<Nav />
				<div className='log-in-wrapper'>
					<h1 className='sign-up-header'>Log In</h1>
					<p className='sign-up-content'>Need an account?</p>
					<form onSubmit={this.submitHandler}>
						<div className='signIn'>
							<div className='input'>
								<input className='default' type='text' name='email' value={this.state.email} onChange={this.handleChange} placeholder='Email'/>
							</div>
							<div className='input'>
								<input className='default' type='password' name='password' value={this.state.password} onChange={this.handleChange} placeholder='Password'/>
							</div>
							{
								this.state.message ? <h1 className={this.state.isLoggedIn ? 'green': 'red'}>{this.state.message}</h1> : ''
							}
							<div>
								<button className='sign-up-button'>Log In</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		user: state.user,
	}
}

export default connect(mapStateToProps)(Login);





