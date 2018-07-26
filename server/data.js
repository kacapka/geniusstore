import {Meteor} from 'meteor/meteor';
import {Products} from '/lib/collections';

Meteor.methods({
    
    resetDb() {
        Meteor.call('resetProducts');
    },
    
    
    resetProducts() {
        Products.remove({});
        
        const products = [
            'kacapka',
            'wojtaka',
            'prezesdie'
        ];
        
        for(let i=0; i < products.length; i++) {
            Products.insert({name: products[i]});
        }
    }
    
});