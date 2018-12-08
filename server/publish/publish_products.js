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
    const product = Products.findOne({_id: id});
    let collectionId = '';
    let featuresIds = [];
    let common = [];
    if(product) {
        collectionId = product.collectionId;
        featuresIds = product.featuresIds;
        common = product.common;
    }
    let productsIds = [id, ...common];

    return [
        Products.find({_id: {$in: productsIds}}),
        Collections.find({_id: collectionId}),
        Features.find({_id: {$in: featuresIds}})
    ];
});

Meteor.publish('products.cart.public', function(productsIds) {
    const productsC = Products.find({_id: {$in: productsIds}});
    const products = productsC.fetch();
    let collectionsIds = [];
    for(let p of products) {
        if(!~collectionsIds.indexOf(p.collectionId)) {
            collectionsIds.push(p.collectionId);
        }
    }

    return [
        productsC,
        Collections.find({_id: {$in: collectionsIds}})
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

Meteor.publish('products.modal.admin', function() {
    return Products.find({});
});

Meteor.publish('product.admin', function(id) {
    const product = Products.findOne({_id: id});

    const collectionId = product ? product.collectionId : '';
    const featuresIds = product ? product.featuresIds : [];
    const common = product ? product.common : [];
    let productsIds = [];
    for(let c of common) {
        productsIds.push(c);
    }
    productsIds.push(id);

    return [
        Products.find({_id: {$in: productsIds}}),
        Collections.find({_id: collectionId}),
        Features.find({_id: {$in: featuresIds}})
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