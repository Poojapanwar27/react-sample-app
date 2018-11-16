import cookie from 'react-cookies';

const initialState = {
    response: (typeof cookie.load('token') !== 'undefined' && typeof cookie.load('user') !== 'undefined') ? {'name': cookie.load('user')} : '',
    token: (typeof cookie.load('token') !== 'undefined') ? cookie.load('token') : '',
    error: null,
    planetList: []
};

export default initialState;