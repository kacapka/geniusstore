import {Meteor} from 'meteor/meteor';
import {Products} from '/lib/collections';

const LOREM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.;'

Meteor.methods({
    
    resetDb() {
        Meteor.call('resetProducts');
        Meteor.call('resetUsers');
    },

    resetUsers() {
        Meteor.users.remove({});

        const user = {
            email: 'kasiaka@genius.pl',
            password: 'geniusdot',
            firstName: 'kasiaka',
            lastName: 'erynio'
        };

        Meteor.call('insertUser', user, err => {
           if(!err) {
               console.log('users insert ok');
           } else {
               console.log(err);
           }
        });
    },

    
    
    resetProducts() {
        Products.remove({});
        
        const products = [
            {
                photo: '/man1.jpg',
                title: 'tank top original',
                description: LOREM,
                price: 69,
                isNew: false,
                isSale: false,
                gender: 'man'
            },
            {
                photo: '/woman8.jpg',
                title: 'tank top original',
                description: LOREM,
                price: 69,
                isNew: false,
                isSale: false,
                gender: 'woman'
            },
            {
                photo: '/man2.jpeg',
                title: 'tank top original',
                description: LOREM,
                price: 69,
                isNew: false,
                isSale: false,
                gender: 'man'
            },
            {
                photo: '/man3.jpg',
                title: 'tank top original',
                description: LOREM,
                price: 69,
                isNew: false,
                isSale: false,
                gender: 'man'
            },
            {
                photo: '/man4.jpg',
                title: 'tank top original',
                description: LOREM,
                price: 69,
                isNew: false,
                isSale: false,
                gender: 'man'
            },
            {
                photo: '/woman1.jpeg',
                title: 'tank top original',
                description: LOREM,
                price: 69,
                isNew: false,
                isSale: false,
                gender: 'woman'
            },
            {
                photo: '/woman2.jpg',
                title: 'tank top original',
                description: LOREM,
                price: 69,
                isNew: false,
                isSale: false,
                gender: 'woman'
            },
            {
                photo: '/man5.jpeg',
                title: 'tank top original',
                description: LOREM,
                price: 69,
                isNew: false,
                isSale: false,
                gender: 'man'
            },
            {
                photo: '/woman3.jpeg',
                title: 'tank top original',
                description: LOREM,
                price: 69,
                isNew: false,
                isSale: false,
                gender: 'woman'
            },
            {
                photo: '/woman4.jpeg',
                title: 'tank top original',
                description: LOREM,
                price: 69,
                isNew: false,
                isSale: false,
                gender: 'woman'
            },
            {
                photo: '/man6.jpeg',
                title: 'tank top original',
                description: LOREM,
                price: 69,
                isNew: false,
                isSale: false,
                gender: 'man'
            },
            {
                photo: '/woman5.jpeg',
                title: 'tank top original',
                description: LOREM,
                price: 69,
                isNew: false,
                isSale: false,
                gender: 'woman'
            },
            {
                photo: '/woman6.jpg',
                title: 'tank top original',
                description: LOREM,
                price: 69,
                isNew: false,
                isSale: false,
                gender: 'woman'
            },
            {
                photo: '/man7.jpg',
                title: 'tank top original',
                description: LOREM,
                price: 69,
                isNew: false,
                isSale: false,
                gender: 'man'
            },
            {
                photo: '/woman7.jpeg',
                title: 'tank top original',
                description: LOREM,
                price: 69,
                isNew: false,
                isSale: false,
                gender: 'woman'
            },
            {
                photo: '/man8.jpg',
                title: 'tank top original',
                description: LOREM,
                price: 69,
                isNew: false,
                isSale: false,
                gender: 'man'
            }
        ];
        
        for(let i=0; i < products.length; i++) {
            Meteor.call('addProduct', products[i]);
            //Products.insert(products[i]);
        }
    }
    
});