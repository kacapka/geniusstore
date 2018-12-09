import types from '../actions/actionTypes';
import { combineReducers } from 'redux';
import deliveryTypes from '../../data/delivery';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const inputsPersistConfig = {
    storage,
    key: 'inputs',
    blacklist: ['notes']
};

const initialInputs = {
    name: '',
    surname: '',
    address: '',
    zipCode: '',
    town: '',
    mail: '',
    phone: '',
    notes: ''
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
    deliveryErr: ''
};

const errors = (state = initialErrors, action) => {

    switch(action.type) {
        case types.SET_CHECKOUT_INPUT_ERROR:
            return {
                ...state,
                [action.name]: action.value
            };
        case types.RESET_DELIVERY:
            return {
                ...state,
                deliveryErr: ''
            };
        default:
            return state;
    }

};

const initialDelivery = deliveryTypes;

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

const promoCode = (state = null, action) => {

    switch(action.type) {
        case types.SET_PROMO_CODE:
            return action.promoCode;
        default:
            return state;
    }

};

const isCheckout = (state = false, action) => {

    switch(action.type) {
        case types.TOGGLE_CHECKOUT:
            return action.isCheckout;
        default:
            return state;
    }

};

const checkout = combineReducers({
    inputs: persistReducer(inputsPersistConfig, inputs),
    errors,
    delivery,
    promoCode,
    isCheckout
});


export default checkout;