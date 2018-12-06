import {Meteor} from 'meteor/meteor';
import { Email } from 'meteor/email';
import deliveryTypes from "../../data/delivery";
import sendEmail from './sendEmail';
import {Orders} from '/lib/collections';

Meteor.methods({
    sendOrderEmail(orderId) {
        const order = Orders.findOne({_id: orderId});
        if(order) {
            const pC = order.promoCode;
            const emailData = {
                address: order.address,
                user: order.user.name + ' ' + order.user.surname,
                price: order.price,
                products: order.products,
                orderNumber: order.orderNumber,
                delivery: order.deliveryType === 'personal' ? 'odbiór osobisty' : order.deliveryType,
                deliveryPrice: deliveryTypes.find(del => del.name === order.deliveryType).price,
                promoCode: pC || `${pC.name} (${pC.value} ${pC.type})`
            };
            for(let p of emailData.products) {
                const product = Products.findOne({_id: p.productId});
                if(product) {
                    p.img = product.mainPhoto;
                } else {
                    p.img = ''; //todo nophoto
                }
            }

            SSR.compileTemplate('emailOrderConfirmation', Assets.getText('orderEmailTemp.html'));
            const {user, address, orderNumber, price, products, delivery, deliveryPrice, promoCode} = emailData;
            const html = SSR.render('emailOrderConfirmation', {user, address, orderNumber, price, products, delivery, deliveryPrice, promoCode});
            emailData.email = 'wojciech.urbansk@gmail.com';
            sendEmail(emailData.email, 'no-reply@genius.pl', 'potwierdzenie zamówienia', html);

        } else {
            console.log('email send error, not order found');
        }
    }
});