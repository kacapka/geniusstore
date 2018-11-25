import {Meteor} from 'meteor/meteor';
import {Settings, Products} from "../../../lib/collections";
import SchemaOrder from '../../schema/schemaOrder'
import Future from 'fibers/future';
import deliveryTypes from "../../data/delivery";

Meteor.methods({
   insertOrder(order) {
       const future = new Future();
       const orderCount = Settings.findOne({label: 'orderCount'}).value;
       const now = new Date();
       const orderDateString = now.getUTCDate() + '' + (now.getUTCMonth()+1) + '' + now.getUTCFullYear();
       const orderNumber = orderCount + 1;
       order.orderNumber = orderDateString + '-' + orderNumber;
       order.timestamp = new Date();
       const newOrder = new SchemaOrder(order);
       newOrder.insert(err => {
           if(!err) {
               Settings.update(
                   {label: 'orderCount'},
                   {$set: {value: orderNumber}},
                   err => {
                       if(!err) {
                           const emailData = {
                               address: order.address,
                               user: order.user.name + ' ' + order.user.surname,
                               price: order.price,
                               products: order.products,
                               orderNumber: order.orderNumber,
                               delivery: order.deliveryType === 'personal' ? 'odbiór osobisty' : order.deliveryType,
                               deliveryPrice: deliveryTypes.find(del => del.name === order.deliveryType).price,
                               promoCode: order.promoCode
                           };
                           for(let p of emailData.products) {
                               const product = Products.findOne({_id: p.productId});
                               if(product) {
                                   p.img = product.mainPhoto;
                               } else {
                                   p.img = ''; //todo nophoto
                               }
                           }
                           Meteor.call('sendOrderEmail', emailData, err => {
                               if(!err) {
                                   future.return();
                               } else {
                                   console.error(err);
                                   future.throw(new Meteor.Error('emailOrderSendFailed'));
                               }
                           });
                       } else {
                           future.throw(new Meteor.Error('updateCounterFailed'));
                       }
                   }
               );
           } else {
               future.throw(new Meteor.Error(err));
           }
       });
       future.wait();
   }
});