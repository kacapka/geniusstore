import {Meteor} from 'meteor/meteor';
import SchemaProduct from '../../schema/schemaProduct';

Meteor.methods({
    addProduct(product) {
        const newProduct = new SchemaProduct(product);
        newProduct.insert(err => {
            if(err) {
                if(err === 'productInsertFailed') {
                    console.error('insert');
                    throw new Meteor.Error('insertFailed');
                } else if(err === 'productValidationFailed') {
                    console.error('validation');
                    throw new Meteor.Error('validationFailed');
                }
            }
        });
    }
});