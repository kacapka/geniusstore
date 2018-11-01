import {Meteor} from 'meteor/meteor';
import Future from 'fibers/future';
import{Products} from "../../../../lib/collections";

Meteor.methods({
    addCommonProduct(productId, commonId) {
        const future = new Future();
        if(this.userId) {
            Products.update(
                {_id: productId},
                {$push: {common: commonId}},
                err => {
                    if(!err) {
                        future.return();
                    } else {
                        future.throw(new Meteor.Error('addCommonProductFailed'));
                    }
                }
            );
        } else {
            future.throw(new Meteor.Error('notPermission'));
        }
        future.wait();
    }
});