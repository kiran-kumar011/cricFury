import axios from 'axios';

const rootUrl = 'http://localhost:3000/api/v1';

const setTokenToAxios = (token) => {
  const newToken = token || localStorage.getItem('authToken') || '';
  axios.defaults.headers.Authorization = newToken;
}

export function verifyAuthToken(token) {
return dispatch => {
    axios.get(`${rootUrl}/users/me`, 
    {headers: { 'Authorization': `bearer ${token}`}}
    ).then(res => {
      dispatch({
        type: "ADD_CURRENT_USER",
        data: res.data.user
      })
    }).catch(error => {
      console.log(error);
    })
  }
}


export function verifyLoggedInUser(data, sendResponse) {
  return dispatch => {
    axios.post(`${rootUrl}/users/login`, data)
    .then(res => {
      if(res.data.success) {
        localStorage.setItem('authToken', res.data.token);

        sendResponse(res);
      }
      dispatch({
        type: "ADD_CURRENT_USER",
        data: res.data.user
      })
    }).catch(error => {
      console.log(error);
    })
  }
}



export function addNewTeam(data) {
  return dispatch => {
    axios.post(`${rootUrl}/cricket/new/team`, data)
    .then(res => {
      dispatch({
        type: 'ADD_NEW_TEAM',
        data: res.data
      })
    }).catch(err => {
      console.log(err);
    })
  }
}



export function postNewUser(data) {
  return dispatch => {
    axios.post(`${rootUrl}/users/signup`, data)
    .then(res => {
      console.log(res, 'from action creator at posting new user');
    }).catch(err => {
      console.log(err);
    })
  }
}


export function createNewMatch(data , sendResponse) {
  return dispatch => {
    axios.post(`${rootUrl}/cricket/create/match`, data)
    .then(res => {

      localStorage.setItem('matchId', res.data._id);

      sendResponse(res.data);
    }).catch(error => {
      console.log(error);
    })
  }
}


export function getAllTeam() {
  return dispatch => {
    axios.get(`${rootUrl}/cricket/create/match`)
    .then(res => {
      dispatch({
        type: 'ADDED_NEW_TEAM',
        data: res.data,
      })
    }).catch(err => {
      console.log(err);
    })
  }
}



export function getMatchDetailsBeforeToss(stateUpdate) {
  return dispatch => {
    axios.get(`${rootUrl}/cricket/matches/innings/update`)
    .then(res => {

      dispatch({
        type: 'ADD_MATCH',
        data: res.data
      })

      stateUpdate(res.data);

    }).catch(err => {
      console.log(err);
    })
  }
}


export function updateOversandToss(data) {
  return dispatch => {
    axios.post(`${rootUrl}/cricket/matches/update/toss/bat/bowl`, data)
    .then(res => {
      console.log(res, 'response from actioncreator to updatae toss')
    }).catch(err => {
      console.log(err);
    })
  }
}


export function getUpdatedInnings() {
  return dispatch => {
    axios.get(`${rootUrl}/live/match/update/firstInnings`)
    .then(res => {
      console.log(res, 'getUpdatedInnings action creator');

      dispatch({
        type: 'ADD_MATCH',
        data: res.data.match
      })
    })
  }
}











