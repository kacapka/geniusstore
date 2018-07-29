import {Meteor} from 'meteor/meteor';
import {Products} from '/lib/collections';

export default class SchemaProduct {

    constructor(product) {
        this.product = product;
        this.validationKeys = {
            photo: product.photo,
            title: product.title,
            description: product.description,
            price: product.price,
            isNew: product.new,
            isSale: product.sale,
            gender: product.gender
        }
    }

    insert(callback) {
        Products.insert(this.product, err => {
            if(err) {
                callback('insertProductFailed');
            } else {
                console.log('insset product success');
            }
        });
    }

}