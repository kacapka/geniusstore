import types from '../actions/actionTypes';
import {combineReducers} from "redux";

const products = (state = [], action) => {

    switch(action.type) {
        case types.ADD_TO_CART:
            return [
                ...state,
                action.product
            ];
        case types.DELETE_PRODUCT_FROM_CART:
            return state.filter(item => item.cartId !== action.id);
        case types.UPDATE_PRODUCT_AMOUNT:
            const updateItem = state.find(item => item.cartId === action.id);
            const newItem = {
                ...updateItem,
                amount: action.amount
            };
            return state.map(item => {
                if(item.cartId === action.id) {
                    return newItem;
                } else {
                    return item;
                }
            });
        default:
            return state;
    }

};

const cart = combineReducers({
    products
});


export default cart;