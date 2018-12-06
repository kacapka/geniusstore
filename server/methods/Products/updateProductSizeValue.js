import {Products} from "../../../lib/collections";
import {Meteor} from 'meteor/meteor';
import Future from 'fibers/future';

Meteor.methods({
    updateSizeValue(products) {
        const future = new Future();
        updateProductSizeValue(products, err => {
            if(!err) {
                future.return();
            } else {
                future.throw(err);
            }
        });
        future.wait();
    }
});

const updateProductSizeValue = (products, callback) => {
    for(let i=0; i<products.length; i++) {
        const {productId, amount, size} = products[i];
        const product = Products.findOne({_id: productId}, {fields: {sizes: 1}});
        const newSizes = product.sizes.map(s => {
           if(s.name === size) {
               const value = s.value - amount;
               s.value = value < 0 ? 0 : value;
           }
           return s;
        });
        Products.update(
            {_id: productId},
            {$set: {sizes: newSizes}},
            err => {
                if(!err) {

                } else {
                    console.error('update single porduct size value failed');
                    callback('updateSizeValueFailed');
                }
            }
        );

        if(i === products.length - 1) {
            callback(null);
        }
    }
};