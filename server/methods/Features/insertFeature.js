import {Meteor} from 'meteor/meteor';
import SchemaFeature from '../../schema/schemaFeature';

Meteor.methods({
   insertFeature(feature) {
       // if(this.userId) {
           const newFeature = new SchemaFeature(feature);
           newFeature.insert(err => {
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