import {Meteor} from 'meteor/meteor';
import {Products} from "../../lib/collections";

Meteor.publish('nav.public', function() {
   return Products.find({$or: [{isActive: true, isNew: true}, {isActive: true, isSale: true, 'sales.isActive': true}]}, {fields: {_id: 1}});
});