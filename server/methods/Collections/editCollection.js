import {Meteor} from 'meteor/meteor';
import {Collections} from "../../../lib/collections";
import checkIfAdmin from '../../functions/checkIfAdmin';
import Future from 'fibers/future';

Meteor.methods({
   editCollection(name, id) {
       const future = new Future();
       if(checkIfAdmin(this.userId)) {
           Collections.update(
               {_id: id},
               {$set: {name: name}},
               err => {
                   if(!err) {
                       future.return();
                   } else {
                       future.throw(new Meteor.Error('updateCollectionFailed'));
                   }
               }
           )
       } else {
           future.throw(new Meteor.Error('notPermission'));
       }
       future.wait();
   }
});