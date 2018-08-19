import {Meteor} from 'meteor/meteor';
import {Products} from "../../../lib/collections";

Meteor.methods({
    deleteProduct(id) {
        if(this.userId) {
            Products.remove({_id: id});
        } else {
            throw new Meteor.Error('notPermission');
        }
    }
});