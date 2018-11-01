import {Meteor} from 'meteor/meteor';
import {Collections} from "../../../lib/collections";

Meteor.methods({
   editCollection(name, id) {
       if(this.userId) {
           Collections.update(
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