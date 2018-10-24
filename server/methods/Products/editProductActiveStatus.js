import {Meteor} from 'meteor/meteor';
import Future from 'fibers/future';
import{Products} from "../../../lib/collections";

Meteor.methods({
    editProductActiveStatus(productId, bool) {
        const future = new Future();
        if(this.userId) {
            Products.update(
                {_id: productId},
                {$set: {isActive: bool}},
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