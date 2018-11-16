import initialState from './initialstate';

const searchReducer = (state = initialState, {type, payload}) => {
    switch(type) {
        case 'PLANET_SUCCESS': {
            return {
                ...state, 
                planetList: payload
            };
        }
        default:
            return state;
    }
}

export default searchReducer;