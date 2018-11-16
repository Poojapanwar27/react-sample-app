import { combineReducers } from 'redux';
import authReducer from './auth-reducer';
import searchReducer from './search-reducer';

const reducer = combineReducers({
    authReducer,
    searchReducer
});
  
export default reducer;