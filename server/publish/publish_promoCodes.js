import {Meteor} from 'meteor/meteor';
import {PromoCodes} from "../../lib/collections";

Meteor.publish('promoCodes.admin', function() {
   return PromoCodes.find({});
});