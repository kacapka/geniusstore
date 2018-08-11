import React, {Component} from 'react';
import './createProduct.scss';
import {FlowRouter} from 'meteor/kadira:flow-router';
import SwitchInput from '/imports/common/switchInput/switchInput';

// {
//     photo: '/man1.jpg',
//         title: 'tank top original',
//     description: LOREM,
//     price: 69,
//     isNew: false,
//     isSale: false,
//     gender: 'man'
// const features = [
//     'Nasz model ma 180 cm wzrostu i nosi rozmiar S',
//     'calkowita dlugos 65 cm w rozmiarze S',
//     'Nie suszyć w suszarce bębnowej, pranie w pralce w 30°C, pranie delikatne',
//     'Materiał: 96% bawełna, 4% elastan'
// ];
// const sizes = [
//     //{id: 0, name: 'unisex', value: 10},
//     {id: 1, name: 'S', value: 0},
//     {id: 2, name: 'M', value: 10},
//     {id: 3, name: 'L', value: 1},
//     {id: 4, name: 'XL', value: 5}
// ];
// product.features = features;
// product.sizes = sizes;
// product.isActive = true;
// }

class CreateProduct extends Component {

    render() {
        return(
            <div id='createProduct'>
                <div id='createBar'>
                    <div id='barTitle'>dodaj nowy produkt</div>
                    <div id='barButtons'>
                        <SwitchInput />
                        <div id='addProductBtn'>dodaj</div>
                    </div>
                </div>
            </div>
        )
    }

}

export default CreateProduct;