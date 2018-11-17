import {Meteor} from 'meteor/meteor';
import {Messages} from "../../../lib/collections";
import checkIfAdmin from '../../functions/checkIfAdmin';
import Future from 'fibers/future';

Meteor.methods({
   deleteMessage(id) {
       const future = new Future();
       if(checkIfAdmin(this.userId)) {
           Messages.remove(
               {_id: id},
               err => {
                   if(!err) {
                       future.return();
                   } else {
                       future.throw(new Meteor.Error('deleteMessageFailed'));
                   }
               }
           );
       } else {
           future.throw(new Meteor.Error('notPermission'));
       }
       future.wait();
   }
});