import {Meteor} from 'meteor/meteor';
import SchemaFeature from '../../schema/schemaFeature';
import checkIfAdmin from '../../functions/checkIfAdmin';
import Future from 'fibers/future';

Meteor.methods({
   insertFeature(feature) {
       const future = new Future();
       if(checkIfAdmin(this.userId)) {
           const newFeature = new SchemaFeature(feature);
           newFeature.insert(err => {
               if(!err) {
                   future.return();
               } else {
                   future.throw(new Meteor.Error('insertFailed'));
               }
           });
       } else {
           future.throw(new Meteor.Error('notPermission'));
       }
       future.wait();
   }
});