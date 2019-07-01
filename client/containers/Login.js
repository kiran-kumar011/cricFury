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
		redirect: false,
		isLoggedIn: false,
	}


	handleChange = (e) => {
		this.setState({[e.target.name]: e.target.value });
	}


	submitHandler = (e) => {
		e.preventDefault();
		var data = {...this.state};

		this.props.dispatch(verifyLoggedInUser(data, this.getResponse));
		this.setState({email: '', password: ''});

	}

	getResponse = (data) => {
		if(data.data.user.id) {
			this.props.history.push('/');
		}
	}


	render() {

		return(
			<div>
				<Nav />
				<div className='log-in-wrapper'>
					<h1 style={{fontSize: '40px', paddingBottom: '20px'}}>Log In</h1>
					<p style={{color: '#5cb85c', fontWeight: '700', marginBottom: "10px"}}>Need an account?</p>
					<form onSubmit={this.submitHandler}>
						<div className='signIn'>
							<div className='input'>
								<input className='default' type='text' name='email' value={this.state.email} onChange={this.handleChange} placeholder='Email'/>
							</div>
							<div className='input'>
								<input className='default' type='password' name='password' value={this.state.password} onChange={this.handleChange} placeholder='Password'/>
							</div>
							<div>
								<button style={{fontSize: '20px', padding: '10px 20px', borderRadius: '5px', backgroundColor:'#5cb85c', color: 'white',  marginTop:'15px', float: 'right'}}>Log In</button>
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





