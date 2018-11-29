import {Meteor} from 'meteor/meteor';
import { Email } from 'meteor/email';

export default function sendEmail(to, from, subject, html) {
    Email.send({to, from, subject, html});
}
