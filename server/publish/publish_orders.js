import {Meteor} from 'meteor/meteor';
import {Orders, Products} from "../../lib/collections";

Meteor.publish('orders.admin', function() {
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
});

Meteor.publish('order.admin', function(orderId) {
   const order = Orders.findOne({_id: orderId});
   let productsIds = [];
    for(let product of order.products) {
        if(!~productsIds.indexOf(product.productId)) {
            productsIds.push(product.productId);
        }
    }

    return [
        Orders.find({_id: orderId}),
        Products.find({_id: {$in: productsIds}})
    ]

});