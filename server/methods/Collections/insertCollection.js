import {Meteor} from 'meteor/meteor';
import SchemaCollection from '../../schema/schemaCollection';

Meteor.methods({
   insertCollection(collection) {
       // if(this.userId) {
           const newCollection = new SchemaCollection(collection);
           newCollection.insert(err => {
               if(err) {
                    throw new Meteor.Error('insertFailed');
               }
           });
       // } else {
       //     console.log('nie ma usera')
       //     throw new Meteor.Error('notPermission');
       // }
   }
});