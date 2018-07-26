import {Meteor} from 'meteor/meteor';
import {Products} from '/lib/collections';

Meteor.methods({
    'addProduct': function(name) {
        console.log('server hey');
        Products.insert({
            name: name
        });
    }
});