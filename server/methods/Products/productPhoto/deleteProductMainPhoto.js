import {Meteor} from 'meteor/meteor';
import Future from 'fibers/future';
import{Products} from "../../../../lib/collections";
import checkIfAdmin from '../../../functions/checkIfAdmin';

Meteor.methods({
    deleteProductMainPhoto(productId) {
        const future = new Future();
        if(checkIfAdmin(this.userId)) {
            Products.update(
                {_id: productId},
                {$set: {mainPhoto: ''}},
                err => {
                    if(!err) {
                        future.return();
                    } else {
                        future.throw(new Meteor.Error('removeProductMainPhotoFailed'));
                    }
                }
            );
        } else {
            future.throw(new Meteor.Error('notPermission'));
        }
        future.wait();
    }
});