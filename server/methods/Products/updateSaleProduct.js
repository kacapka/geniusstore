import {Meteor} from 'meteor/meteor';
import {Products} from "../../../lib/collections";
import SchemaProduct from '../../schema/schemaProduct';

Meteor.methods({
   updateSaleProduct(id, sales) {
       if(this.userId) {
          const productToUpdate = Products.findOne({_id: id});
          productToUpdate.sales = sales;
          delete productToUpdate['_id'];
          const newProduct = new SchemaProduct(productToUpdate);
          newProduct.update(id, err => {
            if(err){
                if(err === 'productEditFailed') {
                    throw new Meteor.Error('editFailed');
                } else if (err === 'productEditValidationFailed') {
                    throw new Meteor.Error('validationFailed');
                }
            }
          });
       } else {
           throw new Meteor.Error('notpermission');
       }
   }
});