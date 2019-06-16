import axios from 'axios';
const rootUrl = 'http://localhost:3000/api/v1';

const setTokenToAxios = (token) => {
  const newToken = token || localStorage.getItem('authToken') || '';
  axios.defaults.headers.Authorization = newToken;
}

export const getCurrentUser = () => async dispatch => {
  try {
    const res = await axios.get(`${rootUrl}/users/me`);
    dispatch({
      type: 'USER_LOGIN_SUCCESS',
      data: res.data
    })
  }
  catch(err) {
    console.log(err);
  }
}