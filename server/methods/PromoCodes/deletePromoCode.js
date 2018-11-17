import {Meteor} from 'meteor/meteor';
import {PromoCodes} from "../../../lib/collections";
import Future from 'fibers/future';
import checkIfAdmin from '../../functions/checkIfAdmin';

Meteor.methods({
    deletePromoCode(id) {
        const future = new Future();
        if(checkIfAdmin(this.userId)) {
            PromoCodes.remove(
                {_id: id},
                err => {
                    if(!err) {
                        future.return();
                    } else {
                        future.throw(new Meteor.Error('promoCodeDeleteFailed'));
                    }
                }
            );
        } else {
            future.throw(new Meteor.Error('notPermission'));
        }
        future.wait();
    }
});