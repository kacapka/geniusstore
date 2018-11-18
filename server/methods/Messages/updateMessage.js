import {Meteor} from 'meteor/meteor';
import {Messages} from "../../../lib/collections";
import checkIfAdmin from '../../functions/checkIfAdmin';
import Future from 'fibers/future';

Meteor.methods({
   setMessageAsRead(id) {
       const future = new Future();
       if(checkIfAdmin(this.userId)) {
           Messages.update(
               {_id: id},
               {$set: {isOpen: true}},
               err => {
                   if(!err) {
                       future.return();
                   } else {
                       future.throw(new Meteor.Error('updateMessageFailed'));
                   }
               }
           )
       } else {
           future.throw(new Meteor.Error('notPermission'));
       }
        future.wait();
   }
});