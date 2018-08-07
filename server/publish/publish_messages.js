import {Meteor} from 'meteor/meteor';
import {Messages} from "../../lib/collections";

Meteor.publish('messages.admin', function() {
    return Messages.find({});
});