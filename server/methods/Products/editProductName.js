import {Meteor} from 'meteor/meteor';
import Future from 'fibers/future';
import{Products} from "../../../lib/collections";
import checkIfAdmin from '../../functions/checkIfAdmin';

Meteor.methods({
   editProductName(productId, name) {
       const future = new Future();
       if(checkIfAdmin(this.userId)) {
            Products.update(
                {_id: productId},
                {$set: {name: name}},
                err => {
                    if(!err) {
                        future.return();
                    } else {
                        future.throw(new Meteor.Error('updateProductFailed'));
                    }
                }
            );
       } else {
           future.throw(new Meteor.Error('notPermission'));
       }
       future.wait();
   }
});