import {Meteor} from 'meteor/meteor';
import {Settings, Products} from "../../../lib/collections";
import SchemaOrder from '../../schema/schemaOrder'
import Future from 'fibers/future';


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

       newOrder.insert((err, orderId) => {
           if(!err) {
                Meteor.call('updateSizeValue', order.products, err => {
                    if(!err) {
                        Settings.update(
                            {label: 'orderCount'},
                            {$set: {value: orderNumber}},
                            err => {
                                if(!err) {
                                    if(order.promoCode) {
                                        Meteor.call('addUsePromoCode', order.promoCode._id, order.user.email, order.orderNumber, err => {
                                            if(!err) {
                                                future.return();
                                            } else {
                                                console.error('update prodmo code use failed');
                                                future.throw(err);
                                            }
                                        } )
                                    } else {
                                        future.return();
                                    }
                                } else {
                                    console.error('update order number failed');
                                    future.throw(new Meteor.Error('updateCounterFailed'));
                                }
                            }
                        );
                    } else {
                        console.error('update products size value failed');
                        future.throw(err);
                    }
                });
                // Meteor.call('sendOrderEmail', orderId);
           } else {
               console.error('insert order failed');
               future.throw(new Meteor.Error(err));
           }
       });
       future.wait();
   }
});