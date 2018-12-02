import {Meteor} from 'meteor/meteor';
import {PromoCodes} from "../../../lib/collections";

Meteor.methods({
    verifyPromoCode(code) {
       return checkPromoCode(code);
   }
});

const checkPromoCode = code => {
    const promoCode = PromoCodes.findOne({name: code.toUpperCase()});
    if(promoCode) {
        const now = new Date();
        if(promoCode.exp < now) {
            throw new Meteor.Error('expiredPromoCode');
        } else if(promoCode.singleUse && promoCode.uses.length > 0) {
            throw new Meteor.Error('usedPromoCode');
        } else {
            return promoCode;
        }
    } else {
        throw new Meteor.Error('invalidPromoCode');
    }
};