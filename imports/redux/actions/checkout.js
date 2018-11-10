import TYPES from './actionTypes';

export const selectDeliveryType = (name, value) => {
    return {
        name,
        value,
        type: TYPES.SELECT_DELIVERY
    }
};