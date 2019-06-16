import React, { Component } from 'react';
import Nav from './Nav';
import axios from 'axios';
import { connect } from 'react-redux';
import Logout from './Logout';
import {Redirect} from 'react-router-dom';

class Login extends Component {
	state = {
		email: '',
		password: '',
		redirect: false,
		isLoggedIn: false,
	}

	setRedirect = () => {
		this.setState({redirect: true});
	}

	renderRedirect = () => {
		if(this.state.redirect) {
			return <Redirect to='/' />
		}
	}

	handleChange = (e) => {
		this.setState({[e.target.name]: e.target.value });
	}


	submitHandler = (e) => {
		e.preventDefault();
		var data = {...this.state};
		this.setState({email: '', password: ''});
		axios.post('http://localhost:3000/api/v1/users/login', data)
		.then(response => {
			if(response) {
				console.log(response);
				localStorage.setItem('authToken', response.data.token);

				var data = localStorage.getItem('authToken');
				console.log(data, '................hello');
				this.props.dispatch({type: 'ADD_CURRENT_USER', data: response.data.user});
				this.setState({redirect: true, isLoggedIn: true});
			}
		}).catch(error => {
			console.log(error);
		})
	}

	render() {
		return(
			<div>
				{this.renderRedirect()}
				<Nav isLoggedIn={this.state.isLoggedIn}/>
				<div className='log-in-wrapper'>
					<h1 style={{fontSize: '40px', paddingBottom: '20px'}}>Log In</h1>
					<p style={{color: '#5cb85c', fontWeight: '700', marginBottom: "10px"}}>Need an account?</p>
					<form onSubmit={this.submitHandler}>
						<div className='signIn'>
							<div className='input'>
								<input type='text' name='email' value={this.state.email} onChange={this.handleChange} placeholder='Email'/>
							</div>
							<div className='input'>
								<input type='password' name='password' value={this.state.password} onChange={this.handleChange} placeholder='Password'/>
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
		user: state,
	}
}

export default connect(mapStateToProps)(Login);





