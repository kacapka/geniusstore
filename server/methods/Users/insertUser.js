import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';

Meteor.methods({
    insertUser(user) {
        console.log('hey hye');
        const userId = Accounts.createUser({
            email: user.email,
            password: user.password
        });

    }
});