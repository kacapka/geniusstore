import {PromoCodes} from "../../../lib/collections";
import {Meteor} from 'meteor/meteor';
import Future from 'fibers/future';

Meteor.methods({
   addUsePromoCode(promoCodeId, userEmail, orderNumber) {
       const future = new Future();
       PromoCodes.update(
           {_id: promoCodeId},
           {$push: {uses: {user: userEmail, orderNumber, timestamp: new Date()}}},
           err => {
               if(!err) {
                   future.return();
               } else {
                   future.throw(new Meteor.Error('updatePromoCodeUseFailed'));
               }
           }
       );
       future.wait();
   }
});