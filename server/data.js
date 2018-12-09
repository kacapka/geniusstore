import {Meteor} from 'meteor/meteor';
import {Products, Messages, Collections, Features, Settings, Orders} from '/lib/collections';

const LOREM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.;'

Meteor.methods({
    'resetData': function() {
        resetUsers(err => {
            if(!err) {
                console.log('users success');
                resetSettings(err => {
                    if(!err) {
                        console.log('settings success');
                    }
                });
            }
        });

        resetMessages(err => {
            if(!err) {
                console.log('messages success');
            }
        });

        resetCollections(err => {
            if(!err) {
                console.log('collections success');
                resetFeatures(err => {
                    if(!err) {
                        console.log('features success');
                        resetProducts(err => {
                            if(!err) {
                                console.log('products success');
                            }
                        });
                    }
                })
            }
        })

        resetOrders();
    }
});

const resetOrders = () => {
    Orders.remove({});
};

const resetUsers = (callback) => {
    Meteor.users.remove({});

    const user = {
        email: 'kasiaka@genius.pl',
        password: 'geniusdot',
        firstName: 'kasiaka',
        lastName: 'erynio'
    };

    Meteor.call('insertUser', user, err => {
        if(!err) {
            callback(null);
        } else {
            callback('error');
        }
    });
};

const resetSettings = callback => {
    Settings.remove({});

    const userId = Meteor.users.findOne({'emails.address': 'kasiaka@genius.pl'});
    const settingsAdmin = {
        label: 'admin',
        userId: userId._id
    };

    const settingsOrderCount = {
        label: 'orderCount',
        value: 100
    };

    Settings.insert(settingsAdmin, err => {
        if(!err) {
            callback(null);
        }
    });
    Settings.insert(settingsOrderCount, err => {
        if(!err) {
            callback(null);
        }
    });
};

const resetMessages = callback => {
    Messages.remove({});

    const messages = [
        {
            name: 'kacapka',
            email: 'kacapka@kon.pl',
            text: LOREM
        },
        {
            name: 'erynio',
            email: 'ercio@hauhau.pl',
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
        if(i === messages.length -1) {
            callback(null);
        }
    }
};
    
const resetCollections = callback => {
    Collections.remove({});

    const collections = [
        {name: 'brak kolekcji', isDefault: true},
        {name: 'genius genuine'},
        {name: 'summer 2018'},
        {name: 'train & chill'}
    ];

    for(let i=0; i<collections.length; i++) {
        Meteor.call('insertCollection', collections[i], err => {
            if(err) {
                callback('err');
            }
        });
        if(i === collections.length -1) {
            callback(null);
        }
    }
};

const resetFeatures = callback => {
    Features.remove({});

    const features = [
        {name: 'Nasz model ma 180 cm wzrostu i nosi rozmiar S'},
        {name: 'calkowita dlugos 65 cm w rozmiarze S'},
        {name: 'Nie suszyć w suszarce bębnowej, pranie w pralce w 30°C, pranie delikatne'},
        {name: 'Materiał: 96% bawełna, 4% elastan'}
    ];

    for(let i=0; i<features.length; i++) {
        Meteor.call('insertFeature', features[i], err => {
            if(err) {
                callback('err');
            }
        });
        if(i === features.length -1) {
            callback(null);
        }
    }
};

const resetProducts = callback => {
    Products.remove({});

    const sizes = [
        {name: 'unisex', value: 2, active: true},
        {name: 'S', value: 0, active: true},
        {name: 'M', value: null, active: false},
        {name: 'L', value: 1, active: true},
        {name: 'XL', value: 5, active: true}
    ];
    const root_link ='https://s3.eu-west-2.amazonaws.com/madeingenius/devProducts/';
    const man1 = ['man1_2.jpg', 'man1_3.jpg'];
    const man2 = ['man2_2.jpg', 'man2_3.jpg', 'man2_4.jpg'];
    const man3 = ['man3_2.jpg', 'man3_3.jpg', 'man3_4.jpg'];
    const man4 = ['man4_2.jpg', 'man4_3.jpg', 'man4_4.jpg'];

    const woman1 = ['woman1_2.jpg', 'woman1_3.jpg'];
    const woman2 = ['woman2_2.jpg', 'woman2_3.jpg', 'woman2_4.jpg'];
    const woman3 = ['woman3_2.jpg', 'woman3_3.jpg', 'woman3_4.jpg'];
    const woman4 = ['woman4_2.jpg', 'woman4_3.jpg', 'woman4_4.jpg'];

    const products = [
        {
            mainPhoto: root_link + 'man1_1.jpg',
            photos: man1.map(p => root_link + p),
            name: 'tank top original',
            description: LOREM,
            price: 59,
            isNew: false,
            isSale: false,
            isActive: true,
            gender: 'man'
        },
        {
            mainPhoto: root_link + 'woman4_1.jpg',
            photos: woman4.map(p => root_link + p),
            name: 'black top',
            description: LOREM,
            price: 59,
            isNew: false,
            isSale: false,
            isActive: true,
            gender: 'woman'
        },
        {
            mainPhoto: root_link + 'man2_1.jpg',
            photos: man2.map(p => root_link + p),
            name: 'genius t-shirt',
            description: LOREM,
            price: 74,
            isNew: false,
            isSale: false,
            isActive: true,
            gender: 'man',
        },
        {
            mainPhoto: root_link + 'man3_1.jpg',
            photos: man3.map(p => root_link + p),
            name: 'summer top',
            description: LOREM,
            price: 99,
            isNew: true,
            isSale: false,
            isActive: true,
            gender: 'man'
        },
        {
            mainPhoto: root_link + 'woman3_1.jpg',
            photos: woman3.map(p => root_link + p),
            name: 'koszulka',
            description: LOREM,
            price: 69,
            isNew: false,
            isSale: false,
            isActive: true,
            gender: 'woman'
        },
        {
            mainPhoto: root_link + 'man4_1.jpg',
            photos: man4.map(p => root_link + p),
            name: 'basic style',
            description: LOREM,
            price: 69,
            isNew: false,
            isSale: false,
            isActive: true,
            gender: 'man'
        },
        {
            mainPhoto: root_link + 'woman1_1.jpg',
            photos: woman1.map(p => root_link + p),
            name: 'woman top',
            description: LOREM,
            price: 45,
            isNew: true,
            isSale: false,
            isActive: true,
            gender: 'woman'
        },
        {
            mainPhoto: root_link + 'woman2_1.jpg',
            photos: woman2.map(p => root_link + p),
            name: 'basic t-shirt',
            description: LOREM,
            price: 119,
            isNew: false,
            isSale: false,
            isActive: true,
            gender: 'woman'
        }
    ];
    const collections = Collections.find({}).fetch();
    const features = Features.find({}).fetch().map(feature => feature._id);

    for(let i=0; i < products.length; i++) {
        products[i].collectionId = collections[0]._id;
        products[i].featuresIds = features;
        products[i].sizes = sizes;
        products[i].common = [];
        products[i].timestamp = new Date();
        products[i].sales = {
            isActive: false,
            salePercentage: null
        };
        Products.insert(products[i], err => {
            if(err) {
                callback('err');
            }
        });

        if(i === products.length -1) {
            callback(null);
        }
    }
};
    




    
