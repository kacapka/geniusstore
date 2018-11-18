import {Messages} from "../../lib/collections";
import {Meteor} from 'meteor/meteor';
import emailValidation from '/imports/functions/emailValidation';
import {validateKeys} from './validation';

export default class SchemaMessage {

    constructor(message) {
        this.message = message;
        this.validationKeys = {
            name: this.validateName(message.name),
            email: this.validateEmail(message.email),
            text: this.validateText(message.text),
            date: this.validateDate(message.date),
            isOpen: this.validateStatus(message.isOpen)
        }
    }

    validateName(name) {
        return name.length > 2 && typeof name === 'string';
    }

    validateEmail(email) {
        return emailValidation(email);
    }

    validateText(text) {
        return text.length > 9 && typeof text === 'string';
    }

    validateDate(date) {
        return date instanceof Date;
    }

    validateStatus(status) {
        return typeof status === 'boolean' && status === false;
    }

    validation() {
        return validateKeys(this.message, this.validationKeys);
    }

    insert(callback) {
        if(this.validation()) {
            Messages.insert(this.message, err => {
               if(err) {
                   callback('messageInsertFailed');
               } else {
                   callback(null);
               }
            });
        } else {
            callback('messageValidationFailed');
            console.log('message validation failed');
        }
    }


}