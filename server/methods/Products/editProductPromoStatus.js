import {Meteor} from 'meteor/meteor';
import Future from 'fibers/future';
import{Products} from "../../../lib/collections";

Meteor.methods({
    editProductPromoStatus(productId, val) {
        const future = new Future();
        if(this.userId) {
            Products.update(
                {_id: productId},
                {$set: {isSale: val}},
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