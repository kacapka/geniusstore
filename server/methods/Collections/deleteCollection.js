import {Meteor} from 'meteor/meteor';
import {Collections, Products} from "../../../lib/collections";
import checkIfAdmin from '../../functions/checkIfAdmin';

Meteor.methods({
   deleteCollection(id) {
       if(checkIfAdmin(this.userId)) {
           const products = Products.find({collectionId: id}).fetch();
           const baseCollectionId = Collections.findOne({isDefault: true})._id;
           for(let i=0; i<products.length; i++) {
                const currentId = products[i]._id;
                Products.update(
                    {_id: currentId},
                    {$set: {collectionId: baseCollectionId}}
                );
           }
           Collections.remove({
               _id: id
           });
       } else {
           throw new Meteor.Error('notPermission');
       }
   }
});