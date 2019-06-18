import React, { Component } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { getCurrentUser } from '../actions';
import { withRouter, BrowserRouter as Router, Route } from 'react-router-dom';

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