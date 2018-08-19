import {Meteor} from 'meteor/meteor';
import {Products, Messages, Collections, Features} from '/lib/collections';

const LOREM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.;'

Meteor.methods({
    
    resetDb() {
        Meteor.call('resetUsers');
        Meteor.call('resetMessages');
        Meteor.call('resetCollections');
        Meteor.call('resetFeatures');
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

        const sizes = [
            {name: 'unisex', value: 2, active: true},
            {name: 'S', value: 0, active: true},
            {name: 'M', value: null, active: false},
            {name: 'L', value: 1, active: true},
            {name: 'XL', value: 5, active: true}
        ];
        
        const products = [
            {
                photos: ['/man1.jpg', '/man2.jpeg', '/man3.jpg'],
                name: 'tank top original',
                description: LOREM,
                price: 69,
                isNew: false,
                isSale: false,
                isActive: true,
                gender: 'man'
            },
            {
                photos: ['/woman1.jpeg', '/woman2.jpg', '/woman3.jpeg'],
                name: 'tank top original',
                description: LOREM,
                price: 69,
                isNew: false,
                isSale: false,
                isActive: true,
                gender: 'woman',
            },
            {
                photos: ['/man2.jpeg', '/man3.jpg', '/man4.jpg'],
                name: 'tank top original',
                description: LOREM,
                price: 69,
                isNew: false,
                isSale: false,
                isActive: true,
                gender: 'man'
            },
            {
                photos: ['/man3.jpg', '/man4.jpg', '/man5.jpeg'],
                name: 'tank top original',
                description: LOREM,
                price: 69,
                isNew: false,
                isSale: false,
                isActive: true,
                gender: 'man'
            },
            {
                photos: ['/man6.jpeg', '/man7.jpg', '/man8.jpg'],
                name: 'tank top original',
                description: LOREM,
                price: 69,
                isNew: false,
                isSale: false,
                isActive: true,
                gender: 'man'
            },
            {
                photos: ['/woman4.jpeg', '/woman5.jpeg', '/woman6.jpg'],
                name: 'tank top original',
                description: LOREM,
                price: 69,
                isNew: false,
                isSale: false,
                isActive: true,
                gender: 'woman'
            },
            {
                photos: ['/woman7.jpeg', '/woman8.jpg', '/woman8.jpeg'],
                name: 'tank top original',
                description: LOREM,
                price: 69,
                isNew: false,
                isSale: false,
                isActive: true,
                gender: 'woman'
            }
        ];
        const collections = Collections.find({}).fetch();
        const features = Features.find({}).fetch().map(feature => feature._id);

        for(let i=0; i < products.length; i++) {
            let random = Math.floor(Math.random() * 3);
            products[i].collectionId = collections[random]._id;
            products[i].featuresIds = features;
            products[i].sizes = sizes;
            Meteor.call('addProduct', products[i], err => {
                if(err) {
                    console.error('error insert fake product');
                }
            });
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
            {name: 'train & chill'}
        ];

        for(let i=0; i<collections.length; i++) {
            Meteor.call('insertCollection', collections[i]);
        }
    },

    resetFeatures() {
        Features.remove({});

        const features = [
            {name: 'Nasz model ma 180 cm wzrostu i nosi rozmiar S'},
            {name: 'calkowita dlugos 65 cm w rozmiarze S'},
            {name: 'Nie suszyć w suszarce bębnowej, pranie w pralce w 30°C, pranie delikatne'},
            {name: 'Materiał: 96% bawełna, 4% elastan'}
        ];

        for(let i=0; i<features.length; i++) {
            Meteor.call('insertFeature', features[i]);
        }
    }
    
});