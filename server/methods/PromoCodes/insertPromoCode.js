import {Meteor} from 'meteor/meteor';
import Future from 'fibers/future';
import SchemaPromoCode from "../../schema/schemaPromoCode";
import {PromoCodes} from "../../../lib/collections";
import checkIfAdmin from '../../functions/checkIfAdmin';

Meteor.methods({
   insertPromoCode(code) {
       const future = new Future();
       if(checkIfAdmin(this.userId)) {
           const newPromoCode = new SchemaPromoCode(code);
           const nameExists = PromoCodes.findOne({name: code.name});
           if(nameExists) {
               future.throw(new Meteor.Error('codeNameExists'));
           } else {
               newPromoCode.insert(err => {
                   if(!err) {
                       future.return();
                   } else {
                       future.throw(new Meteor.Error(err));
                   }
               });
           }
       } else {
           future.throw(new Meteor.Error('notPermission'));
       }
       future.wait();
   }
});