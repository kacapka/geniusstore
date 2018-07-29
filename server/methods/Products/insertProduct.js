import {Meteor} from 'meteor/meteor';
import {Products} from '/lib/collections';

Meteor.methods({
    addProduct(product) {
        product.collection = 'summer chill';
        Products.insert(product);
    }
});