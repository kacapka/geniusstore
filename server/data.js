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
                photos: ['https://www.dropbox.com/s/lvgcvt3ebd607hb/man1.jpg?raw=1', 'https://www.dropbox.com/s/bzubac5hv9azts6/man2.jpeg?raw=1', 'https://www.dropbox.com/s/k3j2ifuav8z9s9v/man3.jpg?raw=1'],
                name: 'tank top original',
                description: LOREM,
                price: 69,
                isNew: false,
                isSale: false,
                isActive: true,
                gender: 'man'
            },
            {
                photos: ['https://www.dropbox.com/s/q6u2pb3ozrzb4vn/woman8.jpg?raw=1', 'https://www.dropbox.com/s/szx6dwuh9yu16h1/woman6.jpg?raw=1', 'https://www.dropbox.com/s/amzx1ktrxxokojb/woman7.jpeg?raw=1'],
                name: 'tank top original',
                description: LOREM,
                price: 69,
                isNew: false,
                isSale: false,
                isActive: true,
                gender: 'woman',
            },
            {
                photos: ['https://www.dropbox.com/s/bzubac5hv9azts6/man2.jpeg?raw=1', 'https://www.dropbox.com/s/lvgcvt3ebd607hb/man1.jpg?raw=1', 'https://www.dropbox.com/s/awiptnt2ni5br2u/man6.jpeg?raw=1'],
                name: 'tank top original',
                description: LOREM,
                price: 69,
                isNew: false,
                isSale: false,
                isActive: true,
                gender: 'man'
            },
            {
                photos: ['https://www.dropbox.com/s/k3j2ifuav8z9s9v/man3.jpg?raw=1', 'https://www.dropbox.com/s/awiptnt2ni5br2u/man6.jpeg?raw=1', 'https://www.dropbox.com/s/lvgcvt3ebd607hb/man1.jpg?raw=1'],
                name: 'tank top original',
                description: LOREM,
                price: 69,
                isNew: false,
                isSale: false,
                isActive: true,
                gender: 'man'
            },
            {
                photos: ['https://www.dropbox.com/s/bzubac5hv9azts6/man2.jpeg?raw=1', 'https://www.dropbox.com/s/7wp0nh5og4xi4ng/man4.jpg?raw=1', 'https://www.dropbox.com/s/awiptnt2ni5br2u/man6.jpeg?raw=1'],
                name: 'tank top original',
                description: LOREM,
                price: 69,
                isNew: false,
                isSale: false,
                isActive: true,
                gender: 'man'
            },
            {
                photos: ['https://www.dropbox.com/s/jv2rboqfyn0rvmj/woman3.jpeg?raw=1', 'https://www.dropbox.com/s/amzx1ktrxxokojb/woman7.jpeg?raw=1', 'https://www.dropbox.com/s/kmxf1mb6olwwgnp/woman1.jpeg?raw=1'],
                name: 'tank top original',
                description: LOREM,
                price: 69,
                isNew: false,
                isSale: false,
                isActive: true,
                gender: 'woman'
            },
            {
                photos: ['https://www.dropbox.com/s/kmxf1mb6olwwgnp/woman1.jpeg?raw=1', 'https://www.dropbox.com/s/jv2rboqfyn0rvmj/woman3.jpeg?raw=1', 'https://www.dropbox.com/s/amzx1ktrxxokojb/woman7.jpeg?raw=1'],
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
            //let random = Math.floor(Math.random() * 3);
            products[i].collectionId = collections[0]._id;
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
            {name: 'brak kolekcji', isDefault: true},
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