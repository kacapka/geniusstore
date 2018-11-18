import types from '../actions/actionTypes';
import { combineReducers } from 'redux';

const inputs = (state = {}, action) => {

    switch(action.type) {
        case types.ON_INPUT_CHANGE:
            return {
                ...state,
                [action.name]: action.value
            };
        default:
            return state;
    }

};

const product = combineReducers({
    inputs
});


export default product;