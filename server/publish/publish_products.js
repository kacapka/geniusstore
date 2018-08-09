import {Meteor} from 'meteor/meteor';
import {Products, Collections} from '/lib/collections';

Meteor.publish('products.public', function() {
    return Products.find({});
});

Meteor.publish('product.public', function(id) {
    return Products.find({_id: id});
});

Meteor.publish('products.admin', function() {
    const productsCursor = Products.find({});
    const products = productsCursor.fetch();
    let collectionsIds = [];
    for(let i=0; i<products.length; i++) {
        const product = products[i];
        if(!~collectionsIds.indexOf(product.collectionId)) {
            collectionsIds.push(product.collectionId);
        }
    };

    console.log(collectionsIds);

    const collections = Collections.find({_id: {$in: collectionsIds}});

    return [
        productsCursor,
        collections
    ];
});

Meteor.publish('product.admin', function(id) {
    return Products.find({_id: id});
});