import {Meteor} from 'meteor/meteor';
import SchemaProduct from '../../schema/schemaProduct';

Meteor.methods({
    addProduct(product) {
        product.sales = {
            isActive: false,
            salePercentage: null
        };
        product.timestamp = new Date();
        const newProduct = new SchemaProduct(product);
        newProduct.insert(err => {
            if(err) {

            }
        });
    }
});