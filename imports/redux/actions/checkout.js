import TYPES from './actionTypes';

export const selectDeliveryType = (name, value) => {
    return {
        name,
        value,
        type: TYPES.SELECT_DELIVERY
    }
};

export const setPromoCode = (promoCode) => {
    return {
        promoCode,
        type: TYPES.SET_PROMO_CODE
    }
};

export const toggleCheckout = (bool) => {
    return {
        isCheckout: bool,
        type: TYPES.TOGGLE_CHECKOUT
    }
};


