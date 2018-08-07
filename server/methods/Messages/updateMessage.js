import {Meteor} from 'meteor/meteor';
import {Messages} from "../../../lib/collections";

Meteor.methods({
   setMessageAsRead(id) {
       console.log(this.userId);
       if(this.userId) {
           Messages.update(
               {
                    _id: id
               },
               {
                   $set: {isOpen: true}
               }
           )
       } else {
           throw new Meteor.Error('notPermission');
       }

   }
});