import {Meteor} from 'meteor/meteor';
import {Messages} from "../../lib/collections";
import checkIfAdmin from '../functions/checkIfAdmin';

Meteor.publish('messages.admin', function() {
    if(checkIfAdmin(this.userId)) {
        return Messages.find({});
    } else {
        return [];
    }
});

Meteor.publish('messageCount.admin', function() {
    if(checkIfAdmin(this.userId)) {
        return Messages.find({isOpen: false}, {fields: {isOpen: 1,_id: 1}});
    } else {
        return [];
    }
});