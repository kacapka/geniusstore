import {Meteor} from 'meteor/meteor';
import {Products} from '/lib/collections';

Meteor.publish('products.public', function() {
    return Products.find({});
});