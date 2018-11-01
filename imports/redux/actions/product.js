import types from './actionTypes';

export const  onInputChange = (name, value) => {

    return {
        name,
        value,
        type: types.ON_INPUT_CHANGE
    }

};
