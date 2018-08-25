import {Meteor} from 'meteor/meteor';
import {Products, Collections, Features} from '/lib/collections';

Meteor.publish('products.public', function() {
    const productsCursor = Products.find({isActive: true});
    const collectionsCursor = Collections.find({});

    return [
        productsCursor,
        collectionsCursor
    ]
});

Meteor.publish('product.public', function(id) {
    const productsCursor =  Products.find({_id: id});
    const collectionsCursor = Collections.find({});
    const featuresCursor = Features.find({});

    return [
        productsCursor,
        collectionsCursor,
        featuresCursor
    ];
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
    const productCursor = Products.find({_id: id});
    const product = Products.findOne({_id: id});
    const collectionCursor = Collections.find({_id: product.collectionId});
    const featuresCursor = Features.find({_id: {$in: product.featuresIds}});

    return [
        productCursor,
        collectionCursor,
        featuresCursor
    ]
});

Meteor.publish('products.sales.admin', function() {
    return Products.find({isSale: true});
});

Meteor.publish('formProduct.admin', function() {
   const collectionsCursor = Collections.find({});
   const featuresCursor = Features.find({});

   return [
       collectionsCursor,
       featuresCursor
   ];
});