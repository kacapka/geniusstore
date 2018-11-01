import {Meteor} from 'meteor/meteor';
import {Features} from "../../../lib/collections";
import Future from 'fibers/future';

Meteor.methods({
   deleteFeature(id) {
       const future = new Future();
       if(this.userId) {
           Features.remove({_id: id}, err => {
               if(!err) {
                   future.return();
               } else {
                   future.throw(new Meteor.Error('featureRemoveFailed'))
               }
           });
       } else {
           future.throw(new Meteor.Error('notPermission'));
       }
       future.wait();
   }
});