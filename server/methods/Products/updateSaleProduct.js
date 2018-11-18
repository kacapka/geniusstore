import {Meteor} from 'meteor/meteor';
import {Products} from "../../../lib/collections";
import SchemaProduct from '../../schema/schemaProduct';
import checkIfAdmin from '../../functions/checkIfAdmin';
import Future from 'fibers/future';

Meteor.methods({
   updateSaleProduct(id, sales) {
       const future = new Future();
       if(checkIfAdmin(this.userId)) {
          const productToUpdate = Products.findOne({_id: id});
          productToUpdate.sales = sales;
          delete productToUpdate['_id'];
          const newProduct = new SchemaProduct(productToUpdate);
          newProduct.update(id, err => {
            if(!err){
               future.return();
            } else {
                future.throw(new Meteor.Error('updateSaleFailed'));
            }
          });
       } else {
           future.throw(new Meteor.Error('notPermission'));
       }
       future.wait();
   }
});