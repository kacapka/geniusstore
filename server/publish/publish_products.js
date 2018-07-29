import {Meteor} from 'meteor/meteor';
import {Products} from '/lib/collections';

Meteor.publish('products.public', function() {
    return Products.find({});
});

Meteor.publish('product.public', function(id) {
    return Products.find({_id: id});
});