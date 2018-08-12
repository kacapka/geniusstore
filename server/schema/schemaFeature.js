import {Features} from "../../lib/collections";
import {validateKeys} from "./validation";

export default class SchemaFeature {

    constructor(feature) {
        this.feature = feature;
        this.validateKeys = {
            name: this.validateName(feature.name)
        }
    }

    validateName(name) {
        return typeof name === 'string' && name.length > 2;
    }

    validate() {
        return validateKeys(this.feature, this.validateKeys);
    }

    insert(callback) {
        if(this.validate()) {
            Features.insert(this.feature, err => {
                if(err) {
                    callback('insertFeatureFailed');
                    console.log('insertFailed');
                } else {
                    callback(null);
                }
            })
        } else {
            console.log('validation failed');
            callback('validateFeatureFailed')
        }
    }


}