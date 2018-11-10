import types from '../actions/actionTypes';
import { combineReducers } from 'redux';
import deliveryTypes from '../../data/delivery';

const initialInputs = {
    name: '',
    surname: '',
    address: '',
    zipCode: '',
    town: '',
    mail: '',
    phone: '',
    delivery: true,
    terms: false,
    rodo: false
};

const inputs = (state = initialInputs, action) => {

    switch(action.type) {
        case types.SET_CHECKOUT_INPUT_VALUE:
            return {
                ...state,
                [action.name]: action.value
            };
        default:
            return state;
    }

};

const initialErrors = {
    nameErr: '',
    surnameErr: '',
    addressErr: '',
    zipCodeErr: '',
    townErr: '',
    mailErr: '',
    phoneErr: '',
    deliveryErr: '',
    termsErr: '',
    rodoErr: ''
};

const errors = (state = initialErrors, action) => {

    switch(action.type) {
        case types.SET_CHECKOUT_INPUT_ERROR:
            return {
                ...state,
                [action.name]: action.value
            };
        default:
            return state;
    }

};

const initialDelivery =  deliveryTypes;

const delivery = (state = initialDelivery, action) => {

    switch(action.type) {
        case types.SELECT_DELIVERY:
            const newState = state.map(type => {
                if(type.name === action.name) {
                    type.selected = true;
                } else {
                    type.selected = false;
                }
                return type;
            });

            return newState;
        default:
            return state;
    }

};

const checkout = combineReducers({
    inputs,
    errors,
    delivery
});


export default checkout;