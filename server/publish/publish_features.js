import {Meteor} from 'meteor/meteor';
import {Features} from "/lib/collections";

Meteor.publish('features.admin', function() {
    return Features.find({});
});