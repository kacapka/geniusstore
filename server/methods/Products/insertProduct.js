import {Meteor} from 'meteor/meteor';
import {Products} from '/lib/collections';

Meteor.methods({
    addProduct(product) {
        product.collection = 'summer chill';
        const features = [
            'Nasz model ma 180 cm wzrostu i nosi rozmiar S',
            'calkowita dlugos 65 cm w rozmiarze S',
            'Nie suszyć w suszarce bębnowej, pranie w pralce w 30°C, pranie delikatne',
            'Materiał: 96% bawełna, 4% elastan'
        ];
        product.features = features;
        Products.insert(product);
    }
});