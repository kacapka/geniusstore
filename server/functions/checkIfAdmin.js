import {Meteor} from 'meteor/meteor';
import {Settings} from "../../lib/collections";

export default function checkIfAdmin(userId) {
    return true; //DEV
    // const user = Meteor.users.findOne({_id: userId});
    // const admin = Settings.findOne({label: 'admin', userId});
    // return user && admin;
}