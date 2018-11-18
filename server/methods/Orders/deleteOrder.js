import {Meteor} from 'meteor/meteor';
import {Orders} from "../../../lib/collections";
import Future from 'fibers/future';
import checkIfAdmin from '../../functions/checkIfAdmin';

Meteor.methods({
    deleteOrder(orderId) {
        const future = new Future();
        if(checkIfAdmin(this.userId)) {
            Orders.remove({_id: orderId}, err => {
                if(!err) {
                    future.return();
                } else {
                    future.throw(new Meteor.Error('orderRemoveFailed'))
                }
            });
        } else {
            future.throw(new Meteor.Error('notPermission'));
        }
        future.wait();
    }
});