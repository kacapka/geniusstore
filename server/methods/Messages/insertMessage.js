import {Meteor} from 'meteor/meteor';
import SchemaMessage from '../../schema/schemaMessage';

Meteor.methods({
   insertMessage(message) {
       message.date = new Date();
       message.isOpen = false;
       const newMessage = new SchemaMessage(message);
       newMessage.insert(err => {
          if(err) {
              if(err === 'messageInserFailed') {
                  throw new Meteor.Error('insert');
              } else if(err === 'messageValidationFailed') {
                  throw new Meteor.Error('validation');
              }
          } else {
              console.log('message aded');
          }
       });
   }
});
