import {Meteor} from 'meteor/meteor';
import {Products, Features, Collections} from '/lib/collections';
import {validateKeys} from './validation';

export default class SchemaProduct {

    constructor(product) {
        this.product = product;
        this.validationKeys = {
            photos: this.validatePhotos(product.photos),
            sizes: this.validateSizes(product.sizes),
            featuresIds: this.validateFeatures(product.featuresIds),
            name: this.validateText(product.name),
            collectionId: this.validateCollection(product.collectionId),
            description: this.validateText(product.description),
            price: this.validatePrice(product.price),
            isNew: this.validateBool(product.isNew),
            isSale: this.validateBool(product.isSale),
            isActive: this.validateBool(product.isActive),
            gender: this.validateGender(product.gender),
            sales: true
        }
    }

    validatePhotos(photos) {
        return photos.length > 0;
    }

    validateSizes(sizes) {
        return sizes.length > 0;
    }

    validateFeatures(features) {
        if(features.length === 0) return true;
        return features.map(featureId => {
            return !!Features.findOne({_id: featureId});
        })
    }

    validateCollection(collectionId) {
        console.error(collectionId);
        if(!collectionId) return true;
        return !!Collections.findOne({_id: collectionId});
    }

    validatePrice(price) {
        return price > 0 && typeof price === 'number';
    }

    validateGender(gender) {
        const GENDERS = ['unisex', 'man', 'woman'];
        const type = typeof gender === 'string';
        const valid = !!~GENDERS.indexOf(gender);
        return type && valid;
    }

    validateText(text) {
        return text.length > 2 && typeof text === 'string';
    }

    validateBool(bool) {
        return typeof bool === 'boolean';
    }

    validate() {
        return validateKeys(this.product, this.validationKeys);
    }

    insert(callback) {
        if(this.validate()){
            Products.insert(this.product, err => {
                if(err) {
                    callback('productInsertFailed');
                } else {
                    callback(null);
                }
            });
        } else {
            console.log(this.validationKeys);
            console.log(this.product);
            callback('productValidationFailed');
        }
    }

    update(id, callback) {
        if(this.validate()) {
            Products.update(
                {_id: id},
                {$set: this.product},
                err => {
                    if(err) {
                        callback('productEditFailed');
                    } else {
                        callback(null);
                    }
                }
            )
        } else {
            console.log(this.validationKeys);
            console.log(this.product);
            callback('productEditValidationFailed');
        }
    }

}