import {Meteor} from 'meteor/meteor';
import {Collections} from "../../lib/collections";

Meteor.publish('collections.admin', function() {
   return Collections.find({});
});

Meteor.publish('collection.public', function(collectionId) {
    return Collections.find({_id: collectionId});
});