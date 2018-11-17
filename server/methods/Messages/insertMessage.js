import {Meteor} from 'meteor/meteor';
import SchemaMessage from '../../schema/schemaMessage';
import Future from 'fibers/future';

Meteor.methods({
   insertMessage(message) {
       const future = new Future();
       message.date = new Date();
       message.isOpen = false;
       const newMessage = new SchemaMessage(message);
       newMessage.insert(err => {
          if(err) {
              future.throw(new Meteor.Error(err));
          } else {
              future.return();
          }
       });
       future.wait();
   }
});
