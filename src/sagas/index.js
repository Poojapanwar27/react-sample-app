import { call, put, takeLatest } from 'redux-saga/effects';
import cookie from 'react-cookies';

/**
  * fecth API method
  */
const fetchJSON = (url, options = {}) =>
  new Promise((resolve, reject) => {
    return fetch(url, options)
      .then(response => (response.status !== 200 ? reject(response) : response))
      .then(response => response.json())
      .then(response => resolve(response))
      .catch(error => reject(error));
});

/**
  * Effect to handle login state
  */

function* authorize({ payload: { username, password } }) {  
    try {
      if (username && password) {
        let response = yield call(fetchJSON, 'https://swapi.co/api/people/?format=json'),
            filteredResponse = response.results.filter(res => res.name === username)[0];
                
        if (filteredResponse && filteredResponse.name === username && filteredResponse.birth_year === password) {
            cookie.save('token', 'loggedIn=true', { path: '/' });
            cookie.save('user', filteredResponse.name, { path: '/' });
            filteredResponse.token = cookie.load('token');
            yield put({ type: 'AUTH_SUCCESS', payload: filteredResponse });
        } else {
            yield put({ type: 'AUTH_FAILURE', payload: 'Invalid credentials' });
        }
      }         
    } catch (error) {
      let message;
      switch (error.status) {
        case 500: message = 'Internal Server Error'; break;
        case 401: message = 'Invalid credentials'; break;
        default: message = 'Something went wrong';
      }
      yield put({ type: 'AUTH_FAILURE', payload: message });
      if (typeof cookie.load('token') !== 'undefined') {
        cookie.remove('token').remove('user');
      }
    }
}
  
/**
  * Effect to handle logging out
  */
function* logout () {    
    yield put({ type: 'AUTH_SUCCESS', payload: '' });
    if (typeof cookie.load('token') !== 'undefined') {
        cookie.remove('token').remove('user');
    }
}

/**
  * get planet
  */
function* getPlanet () {    
    try {
      let response = yield call(fetchJSON, 'https://swapi.co/api/planets/?format=json');
      yield put({ type: 'PLANET_SUCCESS', payload: response.results });
    } catch (error) {
      console.log(error);
    }
}

function* Saga() {
    yield takeLatest('AUTH_REQUEST', authorize);
    yield takeLatest('LOGOUT', logout);
    yield takeLatest('GET_PLANET', getPlanet);
}

export default Saga;