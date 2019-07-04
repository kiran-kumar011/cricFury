import React, { Component } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import axios from 'axios';
import { withRouter, BrowserRouter as Router, Route } from 'react-router-dom';

import { verifyAuthToken } from '../actions';

//  importing components.
import Home from './Home';
import LogIn from './Login';
import SignUp from './SignUp';
// import Profile from './Profile';
import LogOut from './Logout';
import Team from './Team';
import Match from './Match';
import ScoringBoard from './Scoring';
import Spinner from './Spinner';


class App extends Component {

  state = {
    isLoading: false
  }

  componentDidMount() {
    this.setState({ isLoading: true })
    var token = localStorage.getItem('authToken'); 
    if(token && !this.props.user.email) {
      this.props.dispatch(verifyAuthToken(token)).then(res => {
        this.setState({isLoading: false});
      });
    } else {
      this.setState({isLoading: false});
    }
    // TODO: handle case when there is no token
  }

  render() {
    return (
      <Router>
        <Route exact path="/" component={Home} />
        <Route path='/logout' component={LogOut} />
        <Route path='/create/team' component={Team} />
        <Route path='/create/match' component={Match} />  
        <Route path='/login' component={LogIn} />
        <Route path='/signup' component={SignUp} />
        <Route path='/live/update' component={ScoringBoard} />
        <div> 
          {
            this.state.isLoading ? <Spinner /> : ''
          }
        </div>
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



