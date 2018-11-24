import types from './actionTypes';

export const addProductToCart = product => {

    return {
        product,
        type: types.ADD_TO_CART
    }

};

export const deleteProductFromCart = id => {

    return {
        id,
        type: types.DELETE_PRODUCT_FROM_CART
    }

};

export const resetCart = () => {

    return {
        type: types.RESET_CART
    }

};


export const updateProductAmount = (amount, id) => {

    return {
        id,
        amount,
        type: types.UPDATE_PRODUCT_AMOUNT
    }

};

export const setInputValue = (name, value) => {

    return {
        name,
        value,
        type: types.SET_CHECKOUT_INPUT_VALUE
    }

};

export const setInputError = (name, value) => {

    return {
        name,
        value,
        type: types.SET_CHECKOUT_INPUT_ERROR
    }

};