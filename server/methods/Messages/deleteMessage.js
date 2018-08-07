import {Meteor} from 'meteor/meteor';
import {Messages} from "../../../lib/collections";

Meteor.methods({
   deleteMessage(id) {
       if(this.userId) {
           Messages.remove({
               _id: id
           })
       } else {
           throw new Meteor.Error('notPermission');
       }
   }
});