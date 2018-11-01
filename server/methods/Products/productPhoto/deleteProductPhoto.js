import {Meteor} from 'meteor/meteor';
import Future from 'fibers/future';
import{Products} from "../../../../lib/collections";

Meteor.methods({
    deleteProductPhoto(productId, photo) {
        const future = new Future();
        if(this.userId) {
            Products.update(
                {_id: productId},
                {$pull: {photos: photo}},
                err => {
                    if(!err) {
                        future.return();
                    } else {
                        future.throw();
                        throw new Meteor.Error('removeProductPhotoFailed');
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