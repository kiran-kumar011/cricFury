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
	}

	handleChange = (e) => {
		this.setState({[e.target.name] : e.target.value});
	}

	submitHandler = (e) => {
		e.preventDefault();
		const data = {...this.state};
		console.log(this.state);

		this.props.dispatch(postNewUser(data));
		// axios.post('http://localhost:3000/api/v1/users/signup', data).then(response => {
		// 	if(response) {
		// 		console.log(response);
		// 		this.setState({ isSignedUp: true })
		// 	}
		// }).catch(error => {
		// 	console.log(error);
		// })

		this.setState({ username: '', email:'', password:'' });
	}

	render() {
		return (
			<div>
				<Nav />
				<div className='sign-up-wrapper'>
					<h1 style={{fontSize: '40px', paddingBottom: '20px'}}>Sign Up</h1>
					<p style={{color: '#5cb85c', fontWeight: '700', marginBottom: "10px"}}>Have an account?</p>
					<form onSubmit={this.submitHandler}>
						<div className='input'>
							<input className='default' type='text' name='username' value={this.state.username} onChange={this.handleChange} placeholder='Username'/>
						</div>
						<div className='input'>
							<input className='default' type='email' name='email' onChange={this.handleChange} value={this.state.email} placeholder='Email'/>
						</div>
						<div className='input'>
							<input className='default' type='password' name='password' onChange={this.handleChange} value={this.state.password}  placeholder='Password'/>
						</div>
						<div>
							<button type='submit' style={{fontSize: '20px', padding: '10px 20px', borderRadius: '5px', backgroundColor:'#5cb85c', color: 'white',  marginTop:'15px', float: 'right'}}>Sign Up</button>
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



