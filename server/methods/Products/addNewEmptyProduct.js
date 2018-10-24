import {Meteor} from 'meteor/meteor';
import Future from 'fibers/future';
import {Products} from "../../../lib/collections";

Meteor.methods({
   addNewEmptyProduct(name) {
       const future = new Future();
       if(this.userId) {
           const newProduct = {
               name,
               mainPhoto: '',
               photos: [],
               sizes: [],
               featuresIds: [],
               collectionId: '',
               description: '',
               price: 0,
               isNew: false,
               isSale: false,
               isActive: false,
               gender: 'unisex',
               sales: {
                   isActive: false,
                   salePercentage: null
               },
               timestamp: new Date(),
               common: []
           };
           Products.insert(newProduct, err => {
               if(err) {
                   future.throw(new Meteor.Error('productAddFailed'));
               } else {
                   future.return()
               }
           })
       } else {
           future.throw(new Meteor.Error('notPermission'));
       }
       future.wait();
   }
});