import axios from 'axios';

const rootUrl = 'http://localhost:3000/api/v1';


const setTokenToAxios = (token) => {
  const newToken = token || localStorage.getItem('authToken') || '';
  axios.defaults.headers.Authorization = newToken;
}


export function verifyAuthToken(token) {
  return dispatch => new Promise((resolve, reject) => {
    axios.get(`${rootUrl}/users/me`, 
    {headers: { 'Authorization': `bearer ${token}`}}
    ).then(res => {
      dispatch({
        type: "ADD_CURRENT_USER",
        data: res.data.user
      })
      resolve(res)
    }).catch(error => {
      console.log(error);
    })
  })
}

export function postNewUser(data) {
  return dispatch => new Promise ((resolve, reject) => {
    axios.post(`${rootUrl}/users/signup`, data)
    .then(res => {
      console.log(res, 'after signing up action creator');
      resolve(res.data);
    }).catch(err => {
      console.log(err);
    })
  })
}


export function verifyLoggedInUser(data) {
  return (dispatch, getState) => new Promise((resolve, reject) => {
    axios.post(`${rootUrl}/users/login`, data)
    .then(res => {
      if(res.data.success) {
        localStorage.setItem('authToken', res.data.token);
      }
      dispatch({
        type: "ADD_CURRENT_USER",
        data: res.data.user
      })
      resolve(res.data);
    }).catch(error => {
      console.log(error);
    })
  })
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


export function createNewMatch(data) {
  return dispatch => new Promise((resolve, reject) => {
    axios.post(`${rootUrl}/cricket/create/match`, data)
    .then(res => {
      console.log(res, 'after postin new match data to the server')
      localStorage.setItem('matchId', res.data._id);
      resolve(res.data)
    }).catch(error => {
      console.log(error);
    })
  })
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



export function getMatchDetails() {
  return dispatch => new Promise ((resolve, reject) => {
    axios.get(`${rootUrl}/cricket/matches/innings/update`)
    .then(res => {

      dispatch({
        type: 'ADD_MATCH',
        data: res.data
      })

      resolve(res);
    }).catch(err => {
      console.log(err);
    })
  })
}



export function getUpdatedInnings() {
  return dispatch => new Promise((resolve, reject) => {
    axios.get(`${rootUrl}/live/match/update/firstInnings`)
    .then(res => {

      dispatch({
        type: 'ADD_MATCH',
        data: res.data.match
      })
      resolve(res.data)
    }).catch(err => {
      console.log(err);
    })
  })
}



export function updateOversandToss(data) {
  return dispatch => new Promise ((resolve, reject) => {
    axios.post(`${rootUrl}/cricket/matches/update/toss/bat/bowl`, data)
    .then(res => {
      console.log(res, 'response from action creator to updatae toss');
      resolve(res.data)
    }).catch(err => {
      console.log(err);
    })
  })
}


export function postOpenersData(data) {
  return dispatch => new Promise((resolve, reject) => {
    axios.post(`${rootUrl}/live/start/match/firstInnings`, data)
    .then(res => {
      console.log(res, 'posting openers data to the backend')

      resolve(res.data)
    }).catch(err => {
      console.log(err);
    })
  })
}


export function addRunsToServer(data) {
  return dispatch => new Promise((resolve, reject) => {
    axios.post(`${rootUrl}/live/add/runs/firstInnings`, data)
    .then(res => {
      console.log(res.data, 'from run posting action creator');

      resolve(res.data);

    }).catch(err => {
      console.log(err);
    })
  })
}


export function getLiveScoreUpdate() {
  return dispatch => new Promise((resolve, reject) => {
    axios.get(`${rootUrl}/live/start/match/firstInnings`)
    .then(res => {
      console.log(res, 'posting openers data to the backend')

      dispatch({
        type: 'ADD_MATCH',
        data: res.data.match
      })

      resolve(res.data);
    }).catch(err => {
      console.log(err);
    })
  })
}



export function addNewBowlerToScoreCard(data) {
  return dispatch => new Promise((resolve, reject) => {
    axios.post(`${rootUrl}/live/add/new/bowler/firstInnings`, data)
    .then(res => {
      console.log(res, 'from adding new bowler to the backened');

      resolve(res.data)
    }).catch(err => {
      console.log(err);
    })
  })
}


export function updateWickets(data) {
  return dispatch => new Promise((resolve, reject) => {
    axios.post(`${rootUrl}/live/add/wickets/firstInnings`, data)
    .then(res => {
      console.log(res, 'action creator..............updating wickets......');

      resolve(res.data)
    }).catch(err => {
      console.log(err)
    })
  })
}


export function addNewBatsmen(data) {
  return dispatch => new Promise((resolve, reject) => {
    axios.post(`${rootUrl}/live/add/new/batsmen`, data)
    .then(res => {
      console.log(res);

      resolve(res.data);
    }).catch(err => {
      console.log(err);
    })
  })
}



















