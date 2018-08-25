import {Meteor} from 'meteor/meteor';
import SchemaProduct from '../../schema/schemaProduct';

Meteor.methods({
    addProduct(product) {
        product.sales = {
            isActive: false,
            salePercentage: null
        };
        const newProduct = new SchemaProduct(product);
        newProduct.insert(err => {
            if(err) {
                if(err === 'productInsertFailed') {
                    throw new Meteor.Error('insertFailed');
                } else if(err === 'productValidationFailed') {
                    throw new Meteor.Error('validationFailed');
                }
            }
        });
    }
});