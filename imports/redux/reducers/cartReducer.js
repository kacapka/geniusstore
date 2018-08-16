import types from '../actions/actionTypes';

const cart = (state = [], action) => {

    switch(action.type) {
        case types.ADD_TO_CART:
            return [
                ...state,
                action.product
            ];
        case types.DELETE_PRODUCT_FROM_CART:
            const newState = state.filter(item => item.cartId !== action.id);
            return newState;
        default:
            return state;
    }

};

export default cart;