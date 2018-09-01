import React, {Component, Fragment} from 'react';
import './productForm.scss';
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

class ProductForm extends Component {

    constructor(props) {
        super(props);
        const initialState = {
            isActive: false,
            name: '',
            collectionId: null,
            gender: null,
            isNew: false,
            isSale: false,
            sizes: {
                unisex: {name: 'unisex', value: null, active: false},
                S: {name: 'S', value: null, active: false},
                M: {name: 'M', value: null, active: false},
                L: {name: 'L', value: null, active: false},
                XL: {name: 'XL', value: null, active: false}
            },
            photos: {},
            description: '',
            featureSelects: [],
            price: ''
        };
        if(props.action === 'edit' && props.product) {
            const product = props.product;
            initialState.isActive = product.isActive;
            initialState.name = product.name;
            initialState.collectionId = product.collectionId ? product.collectionId : this.props.collections[0]._id;
            initialState.gender = product.gender;
            initialState.isNew = product.isNew;
            initialState.isSale = product.isSale;
            initialState.photos = product.photos;
            initialState.description = product.description;
            initialState.price = product.price;
            initialState.sizes = this.getInitialSizes(product.sizes);
            initialState.featureSelects = this.getInitialFeatures(product.features);
        }
        this.state = initialState;
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
        this.onEditProductClick = this.onEditProductClick.bind(this);
        this.onDeleteProductClick = this.onDeleteProductClick.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }

    getInitialSizes(sizes) {
        const initSizes = {};
        for(let i=0; i<sizes.length; i++) {
            initSizes[sizes[i].name] = {
                name: sizes[i].name,
                value: sizes[i].value,
                active: sizes[i].active
            }
        }
        return initSizes;
    }

    getInitialFeatures(features) {
        return features.map(feature => {
            const selectId = uniqid();
            return {
                selectId,
                _id: feature._id
            }
        })
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
        this.setState({sizes: {...this.state.sizes, [name]: {name: name, value: e.target.value, active: true}}});
    }

    onSizeClick(name) {
        this.setState({sizes: {...this.state.sizes, [name]: {...this.state.sizes[name], active: !this.state.sizes[name].active}}});
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
                       placeholder='wklej nazwe zdjecia'
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
        this.setState({featureSelects: [...this.state.featureSelects, {selectId, _id: null}]});
    }

    renderFeaturesSelects() {
        return this.state.featureSelects.map(feature => {
            let selectedValue;
            if(this.props.action === 'edit') {
                selectedValue = this.props.product.features.find(item => item._id === feature._id).name;
            }
            return (
               <div className='feature-wrapper' key={feature.selectId}>
                   <SelectInput defaultValue='wybierz szczegoly produkty'
                                options={this.props.features}
                                selectValue={this.onFeatureSelect}
                                className='feature-select'
                                selectName={feature.selectId}
                                selectedValue={selectedValue}
                                noOptionsText='brak dodanych szczegolow'
                   />
                   <div className='feature-remove' onClick={() => this.onRemoveFeatureClick(feature.selectId)}>
                       <ion-icon name="remove-circle-outline" />
                   </div>
               </div>
            );
        });
    }

    validateForm() {
        const validation = validateProduct(this.state);
        if(validation) {
            const {isActive, isNew, isSale, featureSelects} = this.state;
            const features = [];
            for(let i=0; i<featureSelects.length; i++) {
                if(!~features.indexOf(featureSelects[i]._id)) {
                    features.push(featureSelects[i]._id);
                }
            }
            return  {
                isActive,
                isSale,
                isNew,
                featuresIds: features,
                ...validation
            };
        }
    }

    onAddProductClick() {
        const product = this.validateForm();
        if(product) {
            Meteor.call('addProduct', product, err => {
                if(!err) {
                    console.log('product add success');
                    FlowRouter.go('/admin/product/list');
                } else {
                    if(err.error === 'insertFailed') {
                        alert('blad podczas dodawania produktu');
                    } else if (err.error === 'validationFailed') {
                        alert('blad podczas walidacji produktu');
                    }
                }
            });
        }
    }

    onEditProductClick() {
        const product = this.validateForm();
        const id = this.props.product._id;
        if(product) {
            Meteor.call('editProduct', id, product, err => {
                if(!err) {
                    console.log('product edit success');
                    FlowRouter.go('/admin/product/list');
                } else {
                    if(err.error === 'editFailed') {
                        alert('blad podczas dodawania produktu');
                    } else if (err.error === 'validationFailed') {
                        alert('blad podczas walidacji produktu');
                    }
                }
            });
        }
    }

    onDeleteProductClick() {
        const id = this.props.product._id;
        if(window.confirm('czy na pewno chcesz usunac ten produkt?')) {
            Meteor.call('deleteProduct', id, err => {
                if(!err) {
                    console.log('product deleted success');
                    FlowRouter.go('/admin/product/list');
                } else {
                    alert('blad podczas usuwania produktu');
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
        const collectionSelectedValue = (this.props.action === 'edit' && this.props.product.collection) ? this.props.product.collection.name : false;
        const genderSelectedValue = this.props.action === 'edit' && GENDER_SELECT.find(gender => gender.systemName === this.props.product.gender).name;
        return(
            <div id='productForm'>
                <div id='formBar'>
                    <div id='barTitle'>dodaj nowy produkt</div>
                    <div id='barButtons'>
                        <div>produkt {this.state.isActive ? 'aktywny' : 'nieaktywny'}</div>
                        <SwitchInput selectValue={this.onSwitchChange}
                                     isActive={this.state.isActive}
                                     className='switch-status'
                                     name='isActive'
                        />
                        {(() => {
                            if(this.props.action === 'edit') {
                                return (
                                    <Fragment>
                                        <div id='submitProductBtn'
                                             onClick={this.onEditProductClick}
                                        >
                                            zapisz
                                        </div>
                                        <div id='deleteProductBtn'
                                             onClick={this.onDeleteProductClick}
                                        >
                                            usun
                                        </div>
                                    </Fragment>
                                );
                            } else {
                                return (
                                    <div id='submitProductBtn'
                                         onClick={this.onAddProductClick}
                                    >
                                        dodaj
                                    </div>
                                );
                            }
                        })()}
                    </div>
                </div>
                <div id='formInputs'>
                    <div className='form-inputs-box'>
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
                                         selectedValue={collectionSelectedValue}
                            />
                            }
                        </div>
                        <div className='input-wrapper'>
                            <label>plec</label>
                            <SelectInput defaultValue='wybierz plec'
                                         options={GENDER_SELECT}
                                         selectValue={this.onGenderSelect}
                                         className='collection-select'
                                         selectedValue={genderSelectedValue}
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
                    <div className='form-inputs-box'>
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
                            {this.state.featureSelects ? this.renderFeaturesSelects() : 'brak przypisanych szczegolow'}
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
    const handle = Meteor.subscribe('formProduct.admin');
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

})(ProductForm);

