import {Meteor} from 'meteor/meteor';
import Future from 'fibers/future';
import{Products} from "../../../../lib/collections";

Meteor.methods({
    deleteCommonProduct(productId, commonId) {
        const future = new Future();
        if(this.userId) {
            Products.update(
                {_id: productId},
                {$pull: {common: commonId}},
                err => {
                    if(!err) {
                        future.return();
                    } else {
                        future.throw(new Meteor.Error('removeCommonProductFailed'));
                    }
                }
            );
        } else {
            future.throw(new Meteor.Error('notPermission'));
        }
        future.wait();
    }
});