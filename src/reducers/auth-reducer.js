import initialState from './initialstate';

const authReducer = (state = initialState, {type, payload }) => {
  switch (type) {
    case 'AUTH_SUCCESS': {
      return { ...state, response: payload, token: payload.token, error: payload.message };
    }
    case 'AUTH_FAILURE': {
      return { ...state, error: payload }
    }
    default:
      return state;
  }
};

export default authReducer;