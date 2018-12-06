import {PromoCodes} from "../../lib/collections";
import validateDate from "./validateDate";
import {validateKeys} from "./validation";

const CODE_TYPES = ['PLN', '%'];

export default class SchemaPromoCode {

    constructor(code) {
        this.code = code;
        this.validationKeys = {
            name: this.validateName(code.name),
            type: this.validateType(code.type),
            value: this.validateValue(code.value),
            singleUse: this.validateSingleUse(code.singleUse),
            exp: validateDate(code.exp),
            uses: true
        }
    }

    validateName(name) {
        return typeof name === 'string' && name.length > 2;
    }

    validateType(type) {
        return CODE_TYPES.indexOf(type) !== -1;
    }

    validateValue(value) {
        return typeof value === 'number' && value > 0;
    }

    validateSingleUse(bool) {
        return typeof bool === 'boolean';
    }

    validation() {
        return validateKeys(this.code, this.validationKeys);
    }

    insert(callback) {
        if(this.validation()) {
            PromoCodes.insert(this.code, err => {
                if(!err) {
                    callback(null);
                } else {
                    callback('codeInsertFailed');
                }
            })
        } else {
            callback('codeValidationFailed');
        }
    }


}