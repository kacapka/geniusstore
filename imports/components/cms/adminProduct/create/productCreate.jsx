import React, {Component} from 'react';
import './productCreate.scss';
import {FlowRouter} from 'meteor/kadira:flow-router';
import SwitchInput from '/imports/common/switchInput/switchInput';
import SelectInput from "../../../../common/selectInput/selectInput";
import {withTracker} from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';
import {Collections, Features} from "../../../../../lib/collections";

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
            isSale: false,
            unisex: {value: null, active: false},
            S: {value: null, active: false},
            M: {value: null, active: false},
            L: {value: null, active: false},
            XL: {value: null, active: false},
            photos: {
                0: '',
                1: '',
                2: '',
                3: ''
            },
            description: '',
            featureSelects: [],
            features: []
        };
        this.onSwitchChange = this.onSwitchChange.bind(this);
        this.onCollectionSelect = this.onCollectionSelect.bind(this);
        this.onGenderSelect = this.onGenderSelect.bind(this);
        this.onSizeClick = this.onSizeClick.bind(this);
        this.onPhotoInputChange = this.onPhotoInputChange.bind(this);
        this.onTextAreaChange = this.onTextAreaChange.bind(this);
        this.onAddNewFeatureSelectClick = this.onAddNewFeatureSelectClick.bind(this);
        this.onFeatureSelect = this.onFeatureSelect.bind(this);
        this.onRemoveFeatureClick = this.onRemoveFeatureClick.bind(this);
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

    onSizeInputChange(e, name) {
        this.setState({...this.state[name], value: e.target.value, active: true});
    }

    onSizeClick(name) {
        this.setState({[name]: {active: !this.state[name].active}});
    }

    onPhotoInputChange(e,i) {
        this.setState({photos: {...this.state.photos, [i]: e.target.value}});
    }

    onTextAreaChange(e) {
        this.setState({description: e.target.value});
    }

    renderPhotoInputs() {
        let inputs = [];
        for(let i=0; i<4; i++) {
            inputs.push(
                <input className='input-text input-photo'
                       key={i}
                       value={this.state.photos[i]}
                       onChange={(e) => this.onPhotoInputChange(e,i)}
                       placeholder='wklej adres url'
                />
            )
        }
        return inputs;
    }

    onFeatureSelect(opt) {
        if(~this.state.features.indexOf(opt._id)) return;
        this.setState({features: [...this.state.features, opt._id]});
    }

    onRemoveFeatureClick(key) {
        const newSelects = this.state.featureSelects.filter(select => select.key !== key);
        this.setState({featureSelects: newSelects});
    }

    onAddNewFeatureSelectClick() {
        const featureId = `feature${this.state.featureSelects.length}`;
        const newFeatureSelect = (
            <div className='feature-wrapper' key={featureId}>
                <SelectInput defaultValue='wybierz szczegoly produkty'
                             options={this.props.features}
                             selectValue={this.onFeatureSelect}
                             className='feature-select'
                />
                <div className='feature-remove' onClick={() => this.onRemoveFeatureClick(featureId)}>
                    <ion-icon name="remove-circle-outline" />
                </div>
            </div>
        );

        this.setState({featureSelects: [...this.state.featureSelects, newFeatureSelect]});
    }

    renderSizes() {
        return SIZES.map(size => {
            const sizeClassName = this.state[size.name].active ? 'size-name green' : 'size-name';
            return (
                <div className='size-wrapper' key={size.id}>
                    <div className={sizeClassName} onClick={() => this.onSizeClick(size.name)}>
                        {size.name}
                    </div>
                    {this.state[size.name].active &&
                        <input type='number'
                               value={this.state[size.name].value}
                               onChange={(e) => this.onSizeInputChange(e, size.name)}
                        />
                    }
                </div>
            )
        })
    }

    render() {
        console.log(this.props);
        console.log(this.state);
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
                            <label>promocja</label>
                            <SwitchInput selectValue={this.onSwitchChange}
                                         isActive={this.state.isSale}
                                         className='switch-status'
                                         name='isSale'
                            />
                        </div>
                        <div className='input-wrapper'>
                            <label>rozmiary</label>
                            <div id='sizesWrapper'>
                                {this.renderSizes()}
                            </div>
                        </div>
                    </div>
                    <div className='create-inputs-box'>
                        <div className='input-wrapper'>
                            <label>zdjecia</label>
                            {this.renderPhotoInputs()}
                        </div>
                        <div className='input-wrapper'>
                            <label>opis</label>
                            <textarea className='input-number input-textarea'
                                    value={this.state.description}
                                      onChange={this.onTextAreaChange}
                            />
                        </div>
                        <div className='input-wrapper'>
                            <label>szczegoly</label>
                            {this.state.featureSelects}
                            <div className='add-btn' onClick={this.onAddNewFeatureSelectClick}>
                                <ion-icon name="add" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default withTracker(() => {
    let collections = [];
    let features = [];
    const handle = Meteor.subscribe('createProduct.admin');
    const handleReady = handle.ready();
    if(handleReady) {
        collections = Collections.find({}).fetch();
        features = Features.find({}).fetch();
    }

    return {
        handleReady,
        collections,
        features
    }
})(ProductCreate);