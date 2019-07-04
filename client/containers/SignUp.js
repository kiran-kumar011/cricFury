import React, { Component } from 'react';
import Nav from './Nav';
import axios from 'axios';
const { NavLink, Link } = require('react-router-dom');
import {connect} from 'react-redux';

import { postNewUser } from '../actions';



class SignUp extends Component {
	state = {
		username: '',
		email: '',
		password: '',
		isSignedUp: false,
		message: '',
	}

	handleChange = (e) => {
		this.setState({[e.target.name] : e.target.value});
	}

	submitHandler = (e) => {
		e.preventDefault();
		const data = {...this.state};
		console.log(this.state);
		if(this.state.password.length < 6) {
			this.setState({message: '*password is weak'});
			return;
		}


		this.props.dispatch(postNewUser(data)).then(res => {
			console.log(res, 'after signing up user');
			if(res.success) {
				setTimeout(() => this.props.history.push('/login'), 1000);
				this.setState({ 
					username: '', 
					email:'', 
					password:'', 
					message: res.message, 
					isSignedUp: true 
				});
			} else {
				this.setState({ message: res.message })
			}
		});
	}

	render() {
		return (
			<div>
				<Nav />
				<div className='sign-up-wrapper'>
					<h1 className='sign-up-header'>Sign Up</h1>
					<p className='sign-up-content'>Have an account?</p>
					<form onSubmit={this.submitHandler}>
						<div className='signIn'>
							<input className='input' 
							type='text' name='username' 
							value={this.state.username} 
							onChange={this.handleChange} 
							placeholder='Username'/>

							<input className='input' type='email' 
							name='email' onChange={this.handleChange} 
							value={this.state.email} placeholder='Email'/>

							<input className='input' type='password' 
							name='password' onChange={this.handleChange} 
							value={this.state.password}  placeholder='Password'/>
							{
								this.state.message ? 
								<h1 className={this.state.isSignedUp ? 'green' : 'red'}>{this.state.message}</h1> 
								: 
								''
							}
							<div>
								<button className='sign-up-button' type='submit'>Sign Up</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return state;
}

export default connect(mapStateToProps)(SignUp);



