import React, {Component} from 'react';
import './productDetails.scss';
import {Meteor} from 'meteor/meteor';
import {Products, Collections, Features} from "../../../../../../lib/collections";
import {withTracker} from 'meteor/react-meteor-data';
import SwitchInput from "../../../../../common/switchInput/switchInput";
import Modal from "../../../../../common/modal/modal";
import EditName from "./editName/editName";
import EditCollection from "./editCollection/editCollection";
import EditPrice from "./editPrice/editPrice";
import EditGender from "./editGender/editGender";

class ProductDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isModal: false,
            action: ''
        };
        this.openModal = this.openModal.bind(this);
        this.onDeleteProductClcik = this.onDeleteProductClcik.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.selectValue = this.selectValue.bind(this);
    }

    closeModal() {
        this.setState({isModal: false, action: ''});
    }

    openModal(action) {
        this.setState({isModal: true, action});
    }

    selectValue(val, name) {
        const productId = this.props.product._id;
        if(name === 'promo') {
            let confirmMessage = '';
            if(val) {
                confirmMessage = 'czy chcesz dodac produkt do promocji?';
            } else {
                confirmMessage = 'czy cchesz usunac produkt z promocji?';
            }
            if(window.confirm(confirmMessage)) {
                Meteor.call('editProductPromoStatus', productId, val, err => {
                    if(!err) {
                        console.log('zmienienow status promocji produktu'); //todo toast
                    } else {
                        console.error(err);
                        window.alert(err.error);
                    }
                });

            }
        } else if(name === 'new') {
            let confirmMessage = '';
            if(val) {
                confirmMessage = 'czy chcesz dodac produkt do nowosci?';
            } else {
                confirmMessage = 'czy cchesz usunac produkt z nowosci?';
            }
            if(window.confirm(confirmMessage)) {
                Meteor.call('editProductNewStatus', productId, val, err => {
                    if(!err) {
                        console.log('zmienienow status nowosci produktu'); //todo toast
                    } else {
                        console.error(err);
                        window.alert(err.error);
                    }
                });

            }
        }
    }

    onDeleteProductClcik() {
        console.log('remove');
    }

    renderModalContent() {
        switch(this.state.action) {
            case 'name':
                return <EditName closeModal={this.closeModal} product={this.props.product} />;
            case 'collection':
                return <EditCollection closeModal={this.closeModal} collection={this.props.product.collection} productId={this.props.product._id} />;
            case 'price':
                return <EditPrice closeModal={this.closeModal} productId={this.props.product._id} price={this.props.product.price} />;
            case 'gender':
                return <EditGender closeModal={this.closeModal} productId={this.props.product._id} gender={this.props.product.gender} />;
            default:
                return window.alert('niepoprawny typ edycji produktu');
        }
    }

    render() {
        if(!this.props.handleReady) return <div>...loading</div>;
        const product = this.props.product;
        const collectionName = product.collection ? product.collection.name : 'brak przypisanych kolekcji';

        console.log(product);

        return (
            <div id='productDetails'>
                <div id='details'>
                    <div id='productDetailsBar'>
                        <div id='barTitle' className='feature-edit-wrap'>
                            {product.name}
                            <ion-icon name="create" className='edit-icon'
                                      onClick={() => this.openModal('name')}
                            />
                        </div>
                        <div id='barWrapper'>
                            <div className='feature-edit-wrap'>
                                {product.isActive ? <span className='active'>aktywny</span> : <span className='no-active'>nieaktywny</span>}
                                <ion-icon name="create" className='edit-icon'
                                          onClick={() => this.openModal('acive')}
                                />
                            </div>
                            <div id='barEditBtn'
                                 onClick={this.onDeleteProductClcik}
                            >
                                usun
                            </div>
                        </div>
                    </div>
                    <div id='productDetailsContent'>
                        <div className='content-column'>
                            <div className='content-box content-info'>
                                <div className='feature-edit-wrap'>
                                    <div className='label'>kolekcja</div>
                                    <ion-icon name="create" className='edit-icon'
                                              onClick={() => this.openModal('collection')}
                                    />
                                </div>
                                <div className='value'>{collectionName}</div>
                            </div>
                            <div className='content-box content-info'>
                                <div className='feature-edit-wrap'>
                                    <div className='label'>cena</div>
                                    <ion-icon name="create" className='edit-icon'
                                              onClick={() => this.openModal('price')}
                                    />
                                </div>
                                <div className='value'>{product.price}</div>
                            </div>
                            <div className='content-box content-info'>
                                <div className='feature-edit-wrap'>
                                    <div className='label'>plec</div>
                                    <ion-icon name="create" className='edit-icon'
                                              onClick={() => this.openModal('gender')}
                                    />
                                </div>
                                <div className='value'>{product.gender}</div>
                            </div>
                            <div className='content-box'>
                                <div className='switch-wrap'>
                                    <div className='label'>promocja: <span className='value'>{product.isSale ? 'TAK' : 'NIE'}</span></div>
                                    <SwitchInput selectValue={this.selectValue}
                                                 name='promo'
                                                 className='product-switch'
                                                 isActive={product.isSale}
                                    />
                                </div>
                                <div className='switch-wrap'>
                                    <div className='label'>nowosc: <span className='value'>{product.isNew ? 'TAK' : 'NIE'}</span></div>
                                    <SwitchInput selectValue={this.selectValue}
                                                 name='new'
                                                 className='product-switch'
                                                 isActive={product.isNew}
                                    />
                                </div>
                            </div>
                            <div className='content-box content-sizes'>
                                <div className='label'>rozmiary</div>
                                {product.sizes.map(size => {
                                    const color = size.value == 0 ? 'value-err' : size.value == 1 ? 'value-warn' : 'value-ok';
                                    const active = size.active ? 'content-size active' : 'content-size no-active';
                                    return (
                                        <div key={size.name} className={active}>
                                            <div className='label'>{size.name}</div>
                                            <div className={`value ${color}`}>{size.active ? size.value : 'nieaktywny'}</div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className='content-column'>
                            <div className='content-box content-photos'>
                                {product.photos.map(photo => {
                                    return (
                                        <div key={photo} className='details-photo'>
                                            <img src={photo} />
                                        </div>
                                    );
                                })}
                            </div>
                            <div className='content-box'>
                                <div className='label'>opis</div>
                                <div className='value'>{product.description}</div>
                            </div>
                            <div className='content-box'>
                                <div className='label'>szczegoly</div>
                                {product.features.map(feature => {
                                    return (
                                        <div className='value feature-item' key={feature._id}>{feature.name}</div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.isModal &&
                    <Modal>
                        {this.renderModalContent()}
                    </Modal>
                }
            </div>
        );
    }

}

export default withTracker((props) => {
    let product;
    const handle = Meteor.subscribe('product.admin', props.productId);
    const handleReady = handle.ready();
    if(handleReady) {
        product = Products.findOne({_id: props.productId});
        product.collection = Collections.findOne({_id: product.collectionId});
        product.features = Features.find({_id: {$in: product.featuresIds}}).fetch();
    }

    return {
        handleReady,
        product
    }

})(ProductDetails);