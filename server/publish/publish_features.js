import {Meteor} from 'meteor/meteor';
import {Features} from "../../lib/collections";

Meteor.publish('features.admin', function() {
    console.log('pubish features');
    return Features.find({});
});