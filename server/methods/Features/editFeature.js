import {Meteor} from 'meteor/meteor';
import {Features} from "../../../lib/collections";

Meteor.methods({
   editFeature(name, id) {
       if(this.userId) {
           Features.update(
               {
                   _id: id
               },
               {
                   $set: {name: name}
               }
           )
       } else {
           throw new Meteor.Error('notPermission');
       }
   }
});