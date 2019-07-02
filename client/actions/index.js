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



export function getUpdatedInnings(stateUpdate) {
  return dispatch => {
    axios.get(`${rootUrl}/live/match/update/firstInnings`)
    .then(res => {

      dispatch({
        type: 'ADD_MATCH',
        data: res.data.match
      })
      stateUpdate();
    }).catch(err => {
      console.log(err);
    })
  }
}



export function updateOversandToss(data, getRequestForMatchDetails) {
  return dispatch => {
    axios.post(`${rootUrl}/cricket/matches/update/toss/bat/bowl`, data)
    .then(res => {
      console.log(res, 'response from actioncreator to updatae toss');

      getRequestForMatchDetails();
    }).catch(err => {
      console.log(err);
    })
  }
}


export function postOpenersData(data, fetchMatchData) {
  return dispatch => {
    axios.post(`${rootUrl}/live/start/match/firstInnings`, data)
    .then(res => {
      console.log(res, 'posting openers data to the backend')

      fetchMatchData();
    }).catch(err => {
      console.log(err);
    })
  }
}


export function addRunsToServer(data, fetchMatchData) {
  return dispatch => {
    axios.post(`${rootUrl}/live/add/runs/firstInnings`, data)
    .then(res => {
      console.log(res, 'from run posting action creator');

      fetchMatchData();

    }).catch(err => {
      console.log(err);
    })
  }
}


export function getLiveScoreUpdate() {
  return dispatch => {
    axios.get(`${rootUrl}/live/start/match/firstInnings`)
    .then(res => {
      console.log(res, 'posting openers data to the backend')

      dispatch({
        type: 'ADD_MATCH',
        data: res.data.match
      })
    }).catch(err => {
      console.log(err);
    })
  }
}



export function addNewBowlerToScoreCard(data, getMatchData) {
  return dispatch => {
    axios.post(`${rootUrl}/live/add/new/bowler/firstInnings`, data)
    .then(res => {
      console.log(res, 'from adding new bowler to the backened');

      getMatchData();
    }).catch(err => {
      console.log(err);
    })
  }
}


export function updateWickets(data, getMatchData) {
  return dispatch => {
    axios.post(`${rootUrl}/live/add/wickets/firstInnings`, data)
    .then(res => {
      console.log(res, '..............updating wickets......')

      getMatchData();
    }).catch(err => {
      console.log(err)
    })
  }
}



















