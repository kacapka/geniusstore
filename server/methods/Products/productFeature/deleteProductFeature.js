import {Meteor} from 'meteor/meteor';
import Future from 'fibers/future';
import{Products} from "../../../../lib/collections";
import checkIfAdmin from '../../../functions/checkIfAdmin';

Meteor.methods({
    deleteProductFeature(productId, featureId) {
        const future = new Future();
        if(checkIfAdmin(this.userId)) {
            Products.update(
                {_id: productId},
                {$pull: {featuresIds: featureId}},
                err => {
                    if(!err) {
                        future.return();
                    } else {
                        future.throw(new Meteor.Error('removeProductFeatureFailed'));
                    }
                }
            );
        } else {
            future.throw(new Meteor.Error('notPermission'));
        }
        future.wait();
    }
});