import {Meteor} from 'meteor/meteor';
import Future from 'fibers/future';
import SchemaPromoCode from "../../schema/schemaPromoCode";

Meteor.methods({
   insertPromoCode(code) {
       const future = new Future();
       if(this.userId) {
           const newPromoCode = new SchemaPromoCode(code);
           newPromoCode.insert(err => {
            if(!err) {
                future.return();
            } else {
                future.throw(new Meteor.Error(err));
            }
           });
       } else {
           future.throw(new Meteor.Error('notPermission'));
       }
       future.wait();
   }
});