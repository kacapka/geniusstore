import {Meteor} from 'meteor/meteor';
import {Products} from '/lib/collections';

Meteor.methods({
    addProduct(product) {
        const sizes = [
            //{id: 0, name: 'unisex', value: 10},
            {id: 1, name: 'S', value: 0},
            {id: 2, name: 'M', value: 10},
            {id: 3, name: 'L', value: 1},
            {id: 4, name: 'XL', value: 5}
        ];
        product.sizes = sizes;
        product.isActive = true;
        Products.insert(product);
    }
});