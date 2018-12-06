import {Meteor} from 'meteor/meteor';
import {Collections, Products} from "../../../lib/collections";
import checkIfAdmin from '../../functions/checkIfAdmin';
import Future from 'fibers/future';

Meteor.methods({
   deleteCollection(id) {
       const future = new Future();
       if(checkIfAdmin(this.userId)) {
           const products = Products.find({collectionId: id}).fetch();
           Collections.remove(
               {_id: id},
               err => {
                   if(!err) {
                       removeCollectionFromProducts(products, err => {
                           if(!err) {
                               future.return();
                           } else {
                               future.throw(err);
                           }
                       });
                   } else {
                       future.throw(new Meteor.Error('removeCollectionFailed'));
                   }
               }
           );
       } else {
           future.throw(new Meteor.Error('notPermission'));
       }
       future.wait();
   }
});

const removeCollectionFromProducts = (products, callback) => {
    const baseCollectionId = Collections.findOne({isDefault: true})._id;

    if(products.length === 0) {
        callback(null);
        return;
    }
    for(let i=0; i<products.length; i++) {
        const currentId = products[i]._id;
        Products.update(
            {_id: currentId},
            {$set: {collectionId: baseCollectionId}},
            err => {
                if(err) {
                    callback('deleteCollectionFromProductFailed');
                }
            }
        );
    }

    if(i === products.length - 1) {
        callback(null);
    }

};