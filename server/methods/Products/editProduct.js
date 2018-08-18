import {Meteor} from 'meteor/meteor';
import {Products} from "../../../lib/collections";
import SchemaProduct from '../../schema/schemaProduct';

Meteor.methods({
   editProduct(id, product) {
       if(this.userId) {
           const productToEdit = Products.findOne({_id: id});
           const productToEditId = productToEdit._id;
           delete productToEdit['_id'];
           const newProduct = new SchemaProduct(productToEdit);
           newProduct.update(productToEditId, err => {
                if(err) {
                    if(err === 'productEditFailed') {
                        throw new Meteor.Error('editFailed');
                    } else if (err === 'productEditValidationFailed') {
                        throw new Meteor.Error('validationFailed');
                    }
                }
           });
       } else {
           throw new Meteor.Error('notPermission');
       }
   }
});