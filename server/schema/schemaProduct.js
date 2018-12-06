import {Meteor} from 'meteor/meteor';
import {Products, Features, Collections} from '/lib/collections';
import {validateKeys} from './validation';

const SIZES = ['unisex', 'S', 'M', 'L', 'XL'];

export default class SchemaProduct {

    constructor(product) {
        this.product = product;
        this.validationKeys = {
            mainPhoto: this.validateMainPhoto(product.mainPhoto),
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
            sales: true,
            timestamp: true,
            common: true
        }
    }

    validateMainPhoto(photo) {
        return typeof photo === 'string';
    }

    validatePhotos(photos) {
        return !photos.length || photos.some(p => typeof p === 'string');
    }

    validateSizes(sizes) {
        const validSize = sizes.every(size => {
            const validName = SIZES.indexOf(size.name) !== -1;
            const validValue = typeof size.value === 'number' || size.value === null;
            const validActive = typeof size.active === 'boolean';
            return validName && validValue && validActive;
        });

        return !sizes.length || validSize;
    }

    validateFeatures(features) {
        const validFeatures = features.every(f => !!Features.findOne({_id: f}))
        return !features.length || validFeatures;
    }

    validateCollection(collectionId) {
        return !!Collections.findOne({_id: collectionId});
    }

    validatePrice(price) {
        return typeof price === 'number';
    }

    validateGender(gender) {
        const GENDERS = ['unisex', 'man', 'woman'];
        const type = typeof gender === 'string';
        const valid = !!~GENDERS.indexOf(gender);
        return type && valid;
    }

    validateText(text) {
        return typeof text === 'string';
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