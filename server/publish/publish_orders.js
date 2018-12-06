import {Meteor} from 'meteor/meteor';
import {Orders, Products} from "../../lib/collections";
import checkIfAdmin from '../functions/checkIfAdmin';

Meteor.publish('orders.admin', function() {
   if(checkIfAdmin(this.userId)) {
       const orders = Orders.find({}).fetch();
       let productsIds = [];
       for(let order of orders) {
           for(let product of order.products) {
               if(!~productsIds.indexOf(product.productId)) {
                   productsIds.push(product.productId);
               }
           }
       }

       return [
           Orders.find({}),
           Products.find({_id: {$in: productsIds}})
       ]
   } else {
       return [];
   }

});

Meteor.publish('order.admin', function(orderId) {
    if(checkIfAdmin(this.userId)) {
        const order = Orders.findOne({_id: orderId});
        let productsIds = [];
        if(order) {
            for(let product of order.products) {
                if(!~productsIds.indexOf(product.productId)) {
                    productsIds.push(product.productId);
                }
            }
        }

        return [
            Orders.find({_id: orderId}),
            Products.find({_id: {$in: productsIds}})
        ]
    } else {
        return [];
    }


});