import {Meteor} from 'meteor/meteor';
import SchemaCollection from '../../schema/schemaCollection';
import checkIfAdmin from '../../functions/checkIfAdmin';
import Future from 'fibers/future';

Meteor.methods({
   insertCollection(collection) {
       const future = new Future();
       if(checkIfAdmin(this.userId)) {
           const newCollection = new SchemaCollection(collection);
           newCollection.insert(err => {
               if(!err) {
                   future.return();
               } else {
                   future.throw(new Meteor.Error('insertCollectionFailed'));
               }
           });
       } else {
           future.throw(new Meteor.Error('notPermission'));
       }
       future.wait();
   }
});