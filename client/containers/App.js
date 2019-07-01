import React, { Component } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import axios from 'axios';
import { withRouter, BrowserRouter as Router, Route } from 'react-router-dom';

import { getCurrentUser } from '../actions';

//  importing components.
import Home from './Home';
import LogIn from './Login';
import SignUp from './SignUp';
import Profile from './Profile';
import LogOut from './Logout';
import Team from './Team';
import Match from './Match';
import ScoringBoard from './Scoring';


class App extends Component {

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
    return (
      <Router>
        <Route exact path="/" component={Home} />  
        <Route path='/logout' component={LogOut} />
        <Route path='/profile' component={Profile} /> 
        <Route path='/create/team' component={Team} />
        <Route path='/create/match' component={Match} />  
        <Route path='/login' component={LogIn} />
        <Route path='/signup' component={SignUp} />
        <Route path='/live/update' component={ScoringBoard} />
      </Router>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps)(App);