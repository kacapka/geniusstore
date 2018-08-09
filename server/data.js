import {Meteor} from 'meteor/meteor';
import {Products, Messages, Collections} from '/lib/collections';

const LOREM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.;'

Meteor.methods({
    
    resetDb() {
        Meteor.call('resetUsers');
        Meteor.call('resetMessages');
        Meteor.call('resetCollections');
        Meteor.call('resetProducts');
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
                gender: 'woman',
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
        const collections = Collections.find({}).fetch();

        for(let i=0; i < products.length; i++) {
            let random = Math.floor(Math.random() * 3);
            products[i].collectionId = collections[random]._id;
            Meteor.call('addProduct', products[i]);
        }
    },

    resetMessages() {
        Messages.remove({});

        const messages = [
            {
                name: 'kacapka',
                email: 'kacapka@kon.pl',
                text: LOREM
            },
            {
                name: 'erynio',
                email: 'ercion@hauhau.pl',
                text: LOREM
            },
            {
                name: 'mutant',
                email: 'mutant1987@gmail.pl',
                text: LOREM
            }
        ];

        for(let i=0; i<messages.length; i++) {
            Meteor.call('insertMessage', messages[i]);
        }
    },

    resetCollections() {
        Collections.remove({});

        const collections = [
            {name: 'genius genuine'},
            {name: 'summer 2018'},
            {name: 'train & chi;;'}
        ];

        for(let i=0; i<collections.length; i++) {
            Meteor.call('insertCollection', collections[i]);
        }
    }
    
});