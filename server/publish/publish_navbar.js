import {Meteor} from 'meteor/meteor';
import {Products} from "../../lib/collections";

Meteor.publish('nav.public', function() {
   console.log(Products.find({isActive: true, isNew: true}, {fields: {_id: 1}}).fetch());
   return Products.find({}, {fields: {_id: 1, isActive: 1, isSale: 1, isNew: 1, sales: 1}});
});