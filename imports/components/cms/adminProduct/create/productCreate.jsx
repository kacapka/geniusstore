import React, {Component} from 'react';
import './productCreate.scss';
import {FlowRouter} from 'meteor/kadira:flow-router';
import SwitchInput from '/imports/common/switchInput/switchInput';
import SelectInput from "../../../../common/selectInput/selectInput";
import {withTracker} from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';
import {Collections} from "../../../../../lib/collections";

const GENDER_SELECT = [
    {name: 'unisex', systemName: 'unisex'},
    {name: 'mezczyzna', systemName: 'man'},
    {name: 'kobieta', systemName: 'woman'}
];

const SIZES = [
    {id: 0, name: 'unisex'},
    {id: 1, name: 'S'},
    {id: 2, name: 'M'},
    {id: 3, name: 'L'},
    {id: 4, name: 'XL'}
];

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

class ProductCreate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            productStatus: false,
            name: '',
            collectionId: null,
            gender: '',
            isNew: false,
            sizes: {
                unisex: null,
                S: null,
                M: null,
                L: null,
                XL: null
            }
        };
        this.onSwitchChange = this.onSwitchChange.bind(this);
        this.onCollectionSelect = this.onCollectionSelect.bind(this);
        this.onGenderSelect = this.onGenderSelect.bind(this);
        this.onSizeSelect = this.onSizeSelect.bind(this);
    }

    onSwitchChange(bool, name) {
        this.setState({[name]: bool});
    }

    onCollectionSelect(option) {
        this.setState({collectionId: option._id});
    }

    onGenderSelect(option) {
        this.setState({gender: option.systemName});
    }

    onSizeSelect(option) {

    }

    render() {
        console.log(this.props);
        return(
            <div id='productCreate'>
                <div id='createBar'>
                    <div id='barTitle'>dodaj nowy produkt</div>
                    <div id='barButtons'>
                        <div>produkt {this.state.productStatus ? 'aktywny' : 'nieaktywny'}</div>
                        <SwitchInput selectValue={this.onSwitchChange}
                                     isActive={this.state.productStatus}
                                     className='switch-status'
                                     name='productStatus'
                        />
                        <div id='addProductBtn'>dodaj</div>
                    </div>
                </div>
                <div id='createInputs'>
                    <div className='create-inputs-box'>
                        <div className='input-wrapper'>
                            <label>nazwa</label>
                            <input className='input-text'
                                value={this.state.name}
                            />
                        </div>
                        <div className='input-wrapper'>
                            <label>cena</label>
                            <input className='input-number'
                                   type='number'
                                   value={this.state.price}
                            />
                        </div>
                        <div className='input-wrapper'>
                            <label>kolekcja</label>
                            {this.props.handleReady &&
                                <SelectInput defaultValue='wybierz kolekcje'
                                            options={this.props.collections}
                                             selectValue={this.onCollectionSelect}
                                             className='collection-select'
                                />
                            }
                        </div>
                        <div className='input-wrapper'>
                            <label>plec</label>
                            <SelectInput defaultValue='wybierz plec'
                                         options={GENDER_SELECT}
                                         selectValue={this.onGenderSelect}
                                         className='collection-select'
                            />
                        </div>
                        <div className='input-wrapper'>
                            <label>nowosc</label>
                            <SwitchInput selectValue={this.onSwitchChange}
                                         isActive={this.state.isNew}
                                         className='switch-status'
                                         name='isNew'
                            />
                        </div>
                        <div className='input-wrapper'>
                            <label>rozmiary</label>
                            <SelectInput defaultValue='wybierz rozmiar'
                                         options={SIZES}
                                         selectValue={this.onSizeSelect}
                                         className=''
                            />
                        </div>
                    </div>
                    <div className='create-inputs-box'>
                        <div className='input-wrapper'>
                            <label>nazwa</label>
                            <input className='input-text'
                                   value={this.state.name}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default withTracker(() => {
    let collections = [];
    const handle = Meteor.subscribe('createProduct.admin');
    const handleReady = handle.ready();
    if(handleReady) {
        collections = Collections.find({}).fetch();
    }

    return {
        handleReady,
        collections
    }
})(ProductCreate);