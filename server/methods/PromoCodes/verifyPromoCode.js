import {Meteor} from 'meteor/meteor';
import {PromoCodes} from "../../../lib/collections";

Meteor.methods({
    verifyPromoCode(code) {
       return checkPromoCode(code);
   }
});

const checkPromoCode = code => {
    const promoCode = PromoCodes.findOne({name: code});
    if(promoCode) {

    } else {
        throw new Meteor.Error('invalidPromoCode');
    }
};