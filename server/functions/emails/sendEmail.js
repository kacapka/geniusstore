import {Meteor} from 'meteor/meteor';
import { Email } from 'meteor/email';

Meteor.methods({
    sendDeliveryEmail(emailData) {
        SSR.compileTemplate('emailDeliveryConfirmation', Assets.getText('deliveryEmailTemp.html'));
        const html = SSR.render('emailDeliveryConfirmation', {userName: emailData.name, orderNr: emailData.orderNumber});
        emailData.email = 'wojciech.urbansk@gmail.com';
        sendEmail(emailData.email, 'no-reply@genius.pl', 'potwierdzenie wysyłki', html);
   }
});

Meteor.methods({
    sendOrderEmail(emailData) {
        SSR.compileTemplate('emailOrderConfirmation', Assets.getText('orderEmailTemp.html'));
        const {user, address, orderNumber, price, products, delivery, deliveryPrice, promoCode} = emailData;
        const html = SSR.render('emailOrderConfirmation', {user, address, orderNumber, price, products, delivery, deliveryPrice, promoCode});
        emailData.email = 'wojciech.urbansk@gmail.com';
        sendEmail(emailData.email, 'no-reply@genius.pl', 'potwierdzenie zamówienia', html);
    }
});

function sendEmail(to, from, subject, html) {
    Email.send({to, from, subject, html});
}
