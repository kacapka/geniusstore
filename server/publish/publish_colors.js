import {Meteor} from 'meteor/meteor';
import  {Colors} from "../../lib/collections";

Meteor.publish('colors.admin', function() {
   return Colors.find({});
});