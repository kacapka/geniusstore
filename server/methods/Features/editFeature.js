import {Meteor} from 'meteor/meteor';
import {Features} from "../../../lib/collections";
import checkIfAdmin from '../../functions/checkIfAdmin';
import Future from 'fibers/future';

Meteor.methods({
   editFeature(name, id) {
       const future = new Future();
       if(checkIfAdmin(this.userId)) {
           Features.update(
               {_id: id},
               {$set: {name: name}},
               err => {
                   if(!err) {
                       future.return();
                   } else {
                       future.throw(new Meteor.Error('updateFeatureFailed'));
                   }
               }
           )
       } else {
           future.throw(new Meteor.Error('notPermission'));
       }
       future.wait();
   }
});