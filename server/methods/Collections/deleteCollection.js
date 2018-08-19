import {Meteor} from 'meteor/meteor';
import {Collections, Products} from "../../../lib/collections";

Meteor.methods({
   deleteCollection(id) {
       if(this.userId) {
           Collections.remove({
               _id: id
           });
       } else {
           throw new Meteor.Error('notPermission');
       }
   }
});