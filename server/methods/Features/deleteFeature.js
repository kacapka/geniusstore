import {Meteor} from 'meteor/meteor';
import {Features} from "../../../lib/collections";

Meteor.methods({
   deleteFeature(id) {
       if(this.userId) {
           console.log(id);
           Features.remove({
               _id: id
           });
       } else {
           throw new Meteor.Error('notPermission');
       }
   }
});