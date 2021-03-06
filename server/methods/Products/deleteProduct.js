import {Meteor} from 'meteor/meteor';
import {Products} from "../../../lib/collections";
import Future from 'fibers/future';
import checkIfAdmin from '../../functions/checkIfAdmin';

Meteor.methods({
    deleteProduct(productId) {
        const future = new Future();
        if(checkIfAdmin(this.userId)) {
            Products.remove({_id: productId}, err => {
                if(!err) {
                    future.return();
                } else {
                    future.throw(new Meteor.Error('deleteProductFailed'));
                }
            });
        } else {
            future.throw(new Meteor.Error('notPermission'));
        }
        future.wait();
    }
});