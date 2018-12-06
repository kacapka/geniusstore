import {Meteor} from 'meteor/meteor';
import {Products} from "../../../lib/collections";
import Future from 'fibers/future';
import checkIfAdmin from '../../functions/checkIfAdmin';
import SchemaProduct from "../../schema/schemaProduct";

Meteor.methods({
    copyProduct(productId) {
        const future = new Future();
        if(checkIfAdmin(this.userId)) {
            const product = Products.findOne({_id: productId});
            if(product) {
                delete product['_id'];
                product.name = `${product.name} (KOPIA)`;
                product.isActive = false;
                product.isSale = false;
                product.isNew = false;
                product.timestamp = new Date();
                const newProduct = new SchemaProduct(product);
                newProduct.insert(err => {
                   if(!err) {
                       future.return();
                   } else {
                       future.throw(new Meteor.Error(err));
                   }
                });
            } else {
                future.throw(new Meteor.Error('productNotFound'));
            }
        } else {
            future.throw(new Meteor.Error('notPermission'));
        }
        future.wait();
    }
});