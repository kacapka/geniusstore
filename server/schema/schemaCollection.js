import {Collections} from "../../lib/collections";
import {validateKeys} from "./validation";

export default class SchemaCollection {

    constructor(collection) {
        this.collection = collection;
        this.validateKeys = {
            name: this.validateName(collection.name),
            isDefault: true
        }
    }

    validateName(name) {
        return typeof name === 'string' && name.length > 2;
    }

    validate() {
        return validateKeys(this.collection, this.validateKeys);
    }

    insert(callback) {
        if(this.validate()) {
            Collections.insert(this.collection, err => {
                if(err) {
                    callback('insertCollectionFailed');
                } else {
                    callback(null);
                }
            })
        } else {
            console.log('validation collection shcem failed');
            callback('validateCollectionFailed')
        }
    }


}