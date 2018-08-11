import {Meteor} from 'meteor/meteor';
import {Collections} from "../../../lib/collections";

Meteor.methods({
   deleteCollection(id) {
       if(this.userId) {
           console.log(id);
           Collections.remove({
               _id: id
           });
       } else {
           throw new Meteor.Error('notPermission');
       }
   }
});