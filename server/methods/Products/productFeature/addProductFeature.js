import {Meteor} from 'meteor/meteor';
import Future from 'fibers/future';
import{Products} from "../../../../lib/collections";

Meteor.methods({
    addProductFeature(productId, featureId) {
        const future = new Future();
        if(this.userId) {
            Products.update(
                {_id: productId},
                {$push: {featuresIds: featureId}},
                err => {
                    if(!err) {
                        future.return();
                    } else {
                        future.throw(new Meteor.Error('addProductFeatureFailed'));
                    }
                }
            );
        } else {
            future.throw(new Meteor.Error('notPermission'));
        }
        future.wait();
    }
});