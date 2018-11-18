import {Meteor} from 'meteor/meteor';
import {PromoCodes} from "../../lib/collections";
import checkIfAdmin from '../functions/checkIfAdmin';

Meteor.publish('promoCodes.admin', function() {
    if(checkIfAdmin(this.userId)) {
        return PromoCodes.find({});
    } else {
        return [];
    }
});