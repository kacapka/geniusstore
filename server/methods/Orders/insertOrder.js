import {Meteor} from 'meteor/meteor';
import SchemaOrder from '../../schema/schemaOrder'
import Future from 'fibers/future';

Meteor.methods({
   insertOrder(order) {
       const future = new Future();
       order.timestamp = new Date();
       const newOrder = new SchemaOrder(order);
       newOrder.insert(err => {
           if(!err) {
               future.return();
           } else {
               future.throw(new Meteor.Error(err));
           }
       });
       future.wait();
   }
});