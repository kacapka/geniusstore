import {Meteor} from 'meteor/meteor';
import Future from 'fibers/future';
import{Products} from "../../../lib/collections";

Meteor.methods({
    editProductDescription(productId, desc) {
        const future = new Future();
        if(this.userId) {
            Products.update(
                {_id: productId},
                {$set: {description: desc}},
                err => {
                    if(!err) {
                        future.return();
                    } else {
                        future.throw();
                        throw new Meteor.Error('updateProductFailed');
                    }
                }
            );
        } else {
            future.throw();
            throw new Meteor.Error('notPermission');
        }
        future.wait();
    }
});