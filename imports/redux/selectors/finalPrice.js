import { createSelector } from 'reselect';

import {getDeliveryPrice} from './deliveryPrice';
const getProducts = (state, props) => props.cartProducts;
const getPromoCode = state => state.checkout.promoCode;

export const getFinalPrice = createSelector(
    [getDeliveryPrice, getProducts, getPromoCode],
    (delivery, products, promoCode) => {

        const deliveryPrice = delivery ? delivery.price : 0;
        let totalPrice = 0;
        for(let cartItem of products ) {
            if(cartItem._product) {
                if(cartItem._product.sales.isActive) {
                    totalPrice += cartItem._product.sales.salePrice * cartItem.amount;
                } else {
                    totalPrice += cartItem._product.price * cartItem.amount;
                }
            }
        }

        if(promoCode) {
            if(promoCode.type === 'PLN') {
                totalPrice -= promoCode.value;
            } else if(promoCode.type === '%') {
                totalPrice = totalPrice - (totalPrice * promoCode.value / 100);
            }
        }

        if(totalPrice < 0) {
            totalPrice = 0;
        }

        return Math.round((totalPrice + deliveryPrice) * 100) / 100;

    }

);