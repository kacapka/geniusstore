import { createSelector } from 'reselect';

const getDelivery = state => state.checkout.delivery;

export const getDeliveryPrice = createSelector(
    getDelivery,
    (delivery) => {
        const activeDelivery = delivery.find(del => del.selected === true);
        return activeDelivery ? {price: activeDelivery.price, type: activeDelivery.name} : null;
    }
);