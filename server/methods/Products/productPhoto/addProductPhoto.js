import {Meteor} from 'meteor/meteor';
import Future from 'fibers/future';
import{Products} from "../../../../lib/collections";

Meteor.methods({
    addProductPhoto(productId, photo) {
        const future = new Future();
        if(this.userId) {
            Products.update(
                {_id: productId},
                {$push: {photos: photo}},
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