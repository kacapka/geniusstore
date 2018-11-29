import {Meteor} from 'meteor/meteor';
import sendEmail from "./sendEmail";
import {Orders} from '/lib/collections';
import Future from 'fibers/future';

Meteor.methods({
    sendDeliveryEmail(orderId) {
        const future = new Future();
        const order = Orders.findOne({_id: orderId});
        if(order) {
            const {orderNumber, user: {name, email}} = order;
            const emailData = {
                orderNumber,
                name,
                email
            };

            SSR.compileTemplate('emailDeliveryConfirmation', Assets.getText('deliveryEmailTemp.html'));
            const html = SSR.render('emailDeliveryConfirmation', {userName: emailData.name, orderNr: emailData.orderNumber});
            emailData.email = 'wojciech.urbansk@gmail.com';
            sendEmail(emailData.email, 'no-reply@genius.pl', 'potwierdzenie wysyłki', html);

            Orders.update(
                {_id: orderId},
                {$set: {deliveryStatus: 'completed'}},
                err => {
                    if(!err) {
                        future.return();
                    } else {
                        future.throw(new Meteor.Error('updateDeliveryStatusFailed'));
                    }
                }
            )

        } else {
            future.throw(new Meteor.Error('orderNotFound'));
        }
        future.wait();
    }
});