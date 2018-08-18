import React, {Component} from 'react';
import './productCreate.scss';
import {FlowRouter} from 'meteor/kadira:flow-router';
import SwitchInput from '/imports/common/switchInput/switchInput';
import SelectInput from "../../../../common/selectInput/selectInput";
import {withTracker} from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';
import {Collections, Features} from "../../../../../lib/collections";
import uniqid from 'uniqid';
import {validateProduct} from './validateProduct';

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

class ProductCreate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isActive: false,
            name: '',
            collectionId: null,
            gender: null,
            isNew: false,
            isSale: false,
            sizes: {
                unisex: {value: null, active: false},
                S: {value: null, active: false},
                M: {value: null, active: false},
                L: {value: null, active: false},
                XL: {value: null, active: false},
            },
            photos: {},
            description: '',
            featureSelects: [],
            price: ''
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
        this.onAddProductClick = this.onAddProductClick.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }

    onInputChange(e) {
        const value = e.target.name === 'price' ? Number(e.target.value) : e.target.value;
        this.setState({[e.target.name]: value});
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
        this.setState({sizes: {...this.state.sizes, [name]: {value: e.target.value, active: true}}});
    }

    onSizeClick(name) {
        this.setState({sizes: {...this.state.sizes, [name]: {active: !this.state.sizes[name].active}}});
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

    onFeatureSelect(opt, name) {
        const newSelects = this.state.featureSelects.map(select => {
           if(select.selectId === name) {
               select._id = opt._id;
               return select;
           } else {
               return select;
           }
        });
        this.setState({
            featureSelects: newSelects
        });
    }

    onRemoveFeatureClick(selectId) {
        const newSelects = this.state.featureSelects.filter(select => select.selectId !== selectId);
        this.setState({featureSelects: newSelects});
    }

    onAddNewFeatureSelectClick() {
        const selectId = uniqid();
        const newFeatureSelect = (
            <div className='feature-wrapper' key={selectId}>
                <SelectInput defaultValue='wybierz szczegoly produkty'
                             options={this.props.features}
                             selectValue={this.onFeatureSelect}
                             className='feature-select'
                             selectName={selectId}
                />
                <div className='feature-remove' onClick={() => this.onRemoveFeatureClick(selectId)}>
                    <ion-icon name="remove-circle-outline" />
                </div>
            </div>
        );

        this.setState({featureSelects: [...this.state.featureSelects, {select: newFeatureSelect, selectId, _id: null}]});
    }

    onAddProductClick() {
        const validation = validateProduct(this.state);
        if(validation) {
            const {isActive, isNew, isSale, featureSelects} = this.state;
            const features = [];
            for(let i=0; i<featureSelects.length; i++) {
                if(!~features.indexOf(featureSelects[i]._id)) {
                    features.push(featureSelects[i]._id);
                }
            }
            const product = {
                isActive,
                isSale,
                isNew,
                featuresIds: features,
                ...validation
            };

            console.log(product);

            Meteor.call('addProduct', product, err => {
                if(!err) {
                    console.log('product add success');
                } else {
                    console.error(err);
                }
            });
        }
    }

    renderSizes() {
        return SIZES.map(size => {
            const sizeClassName = this.state.sizes[size.name].active ? 'size-name green' : 'size-name';
            return (
                <div className='size-wrapper' key={size.id}>
                    <div className={sizeClassName} onClick={() => this.onSizeClick(size.name)}>
                        {size.name}
                    </div>
                    {this.state.sizes[size.name].active &&
                        <input type='number'
                               value={this.state.sizes[size.name].value}
                               onChange={(e) => this.onSizeInputChange(e, size.name)}
                        />
                    }
                </div>
            )
        })
    }

    render() {
        return(
            <div id='productCreate'>
                <div id='createBar'>
                    <div id='barTitle'>dodaj nowy produkt</div>
                    <div id='barButtons'>
                        <div>produkt {this.state.isActive ? 'aktywny' : 'nieaktywny'}</div>
                        <SwitchInput selectValue={this.onSwitchChange}
                                     isActive={this.state.isActive}
                                     className='switch-status'
                                     name='isActive'
                        />
                        <div id='addProductBtn'
                             onClick={this.onAddProductClick}
                        >
                            dodaj
                        </div>
                    </div>
                </div>
                <div id='createInputs'>
                    <div className='create-inputs-box'>
                        <div className='input-wrapper'>
                            <label>nazwa</label>
                            <input className='input-text'
                                    value={this.state.name}
                                   name='name'
                                   onChange={this.onInputChange}
                            />
                        </div>
                        <div className='input-wrapper'>
                            <label>cena</label>
                            <input className='input-number'
                                   type='number'
                                   value={this.state.price}
                                   name='price'
                                   onChange={this.onInputChange}
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
                            {this.state.featureSelects.map(select => select.select)}
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

