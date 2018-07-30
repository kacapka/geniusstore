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

}