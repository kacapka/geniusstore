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
import EditSizes from "./editSizes/editSizes";
import EditPhoto from "./editPhotos/editPhotos";
import EditDescription from "./editDescription/editDescription";
import AddFeature from "./addFeature/addFeature"
import {FlowRouter} from 'meteor/kadira:flow-router';
import AddCommon from "./addCommon/addCommon";
import ActiveProduct from "./active/activeProduct";
import createPrompt from "../../../../../functions/createPrompt";
import GeniusSpinner from "../../../../../common/spinner/spinner";

class ProductDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isModal: false,
            action: '',
            options: {}
        };
        this.openModal = this.openModal.bind(this);
        this.onDeleteProductClick = this.onDeleteProductClick.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.selectValue = this.selectValue.bind(this);
        this.onCopyProductClick = this.onCopyProductClick.bind(this);
    }

    closeModal() {
        this.setState({isModal: false, action: '', options: {}});
    }

    openModal(action, options) {
        this.setState({isModal: true, action, options});
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
                        createPrompt('success', 'zmieniono');
                    } else {
                        console.error(err);
                        switch(err.error) {
                            case 'notPermission':
                                return createPrompt('error', 'brak uprawnień');
                            case 'updateProductFailed':
                                return createPrompt('error', 'problem z edycją');
                            default:
                                return createPrompt('error', 'ups... wystąpił problem');
                        }
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
                        createPrompt('success', 'zmieniono');
                    } else {
                        console.error(err);
                        switch(err.error) {
                            case 'notPermission':
                                return createPrompt('error', 'brak uprawnień');
                            case 'updateProductFailed':
                                return createPrompt('error', 'problem z edycją');
                            default:
                                return createPrompt('error', 'ups... wystąpił problem');
                        }
                    }
                });

            }
        }
    }

    onCopyProductClick() {
        const {_id, name} = this.props.product;
        if(window.confirm('czy na pewno chcesz usunac kopie produktu?')) {
            Meteor.call('copyProduct', _id, err => {
                if(!err) {
                    FlowRouter.go('/admin/product/list');
                    createPrompt('success', `utworzono kopię o nazwie - ${name} (KOPIA)`);
                } else {
                    console.error(err);
                    switch(err.error) {
                        case 'notPermission':
                            return createPrompt('error', 'brak uprawnień');
                        case 'productNotFound':
                            return createPrompt('error', 'produkt który chcesz skopiować nie istnieje');
                        case 'productInsertFailed':
                            return createPrompt('error', 'probem z dodaniem kopii produktu');
                        case 'productValidationFailed':
                            return createPrompt('error', 'problem z walidacją');
                        default:
                            return createPrompt('error', 'ups... wystąpił problem');
                    }
                }
            })
        }
    }

    onDeleteProductClick() {
        const productId = this.props.product._id;
        if(window.confirm('czy na pewno chcesz usunac product?')) {
            FlowRouter.go('/admin/product/list');
            Meteor.call('deleteProduct', productId, err => {
                if(!err) {
                    createPrompt('success', 'usunięto');
                } else {
                    console.error(err);
                    switch(err.error) {
                        case 'notPermission':
                            return createPrompt('error', 'brak uprawnień');
                        case 'deleteProductFailed':
                            return createPrompt('error', 'problem z usunięciem');
                        default:
                            return createPrompt('error', 'ups... wystąpił problem');
                    }
                }
            })
        }
    }

    deletePhoto(photo) {
        const productId = this.props.product._id;
        if(window.confirm('czy na pewno chcesz usunac zdjecie?')) {
            Meteor.call('deleteProductPhoto', productId, photo, err => {
                if(!err) {
                    createPrompt('success', 'usunięto');
                } else {
                    console.error(err);
                    switch(err.error) {
                        case 'notPermission':
                            return createPrompt('error', 'brak uprawnień');
                        case 'removeProductPhotoFailed':
                            return createPrompt('error', 'problem z usunięciem zdjęcia');
                        default:
                            return createPrompt('error', 'ups... wystąpił problem');
                    }
                }
            })
        }
    }

    deleteFeature(featureId) {
        const productId = this.props.product._id;
        Meteor.call('deleteProductFeature', productId, featureId, err => {
            if(!err) {
                createPrompt('success', 'usunięto');
            } else {
                console.error(err);
                switch(err.error) {
                    case 'notPermission':
                        return createPrompt('error', 'brak uprawnień');
                    case 'removeProductFeatureFailed':
                        return createPrompt('error', 'problem z usunięciem szczegółu');
                    default:
                        return createPrompt('error', 'ups... wystąpił problem');
                }
            }
        });
    }

    deleteCommonProduct(commonId) {
        const productId = this.props.product._id;
        Meteor.call('deleteCommonProduct', productId, commonId, err => {
            if(!err) {
                createPrompt('success', 'usunięto');
            } else {
                console.error(err);
                switch(err.error) {
                    case 'notPermission':
                        return createPrompt('error', 'brak uprawnień');
                    case 'removeCommonProductFailed':
                        return createPrompt('error', 'problem z usunięciem produktu');
                    default:
                        return createPrompt('error', 'ups... wystąpił problem');
                }
            }
        });
    }

    renderPhotos() {
        return this.props.product.photos.map(photo => {
            return (
                <div key={photo}
                     className='details-photo'
                >
                    <img src={photo} />
                    <div className='photo-icon delete-icon'>
                        <ion-icon name="trash"
                                  onClick={() => this.deletePhoto(photo)}
                        />
                    </div>
                </div>
            );
        })
    }

    renderFeatures() {
        return this.props.product.features.map(feature => {
            return (
                <div className='value feature-item' key={feature._id}>
                    <span>{feature.name}</span>
                    <div className='delete-icon'>
                        <ion-icon name="trash"
                                  onClick={() => this.deleteFeature(feature._id)}
                        />
                    </div>
                </div>
            );
        })
    }

    renderSizes() {
        return this.props.product.sizes.map(size => {
            const color = size.value === 0 ? 'value-err' : size.value === 1 ? 'value-warn' : 'value-ok';
            const active = size.active ? 'content-size active' : 'content-size no-active';
            return (
                <div key={size.name} className={active}>
                    <div className='label'>{size.name}</div>
                    <div className={`value ${color}`}>{size.active ? size.value : 'nieaktywny'}</div>
                </div>
            );
        })
    }

    renderCommonProducts() {
        return this.props.product._common.map(product => {
            return (
                <div key={product._id}
                     className='details-photo'
                >
                    <img src={product.mainPhoto} />
                    <div className='photo-icon delete-icon'>
                        <ion-icon name="trash"
                                  onClick={() => this.deleteCommonProduct(product._id)}
                        />
                    </div>
                </div>
            )
        })
    }


    renderModalContent() {
        const product = this.props.product;
        const modalProps = {
            closeModal: this.closeModal,
            productId: product._id
        };
        switch(this.state.action) {
            case 'active':
                return <ActiveProduct product={product} closeModal={this.closeModal} />;
            case 'name':
                return <EditName {...modalProps} name={product.name} />;
            case 'collection':
                return <EditCollection {...modalProps} collection={product.collection} />;
            case 'price':
                return <EditPrice {...modalProps} price={product.price} />;
            case 'gender':
                return <EditGender {...modalProps} gender={product.gender} />;
            case 'sizes':
                return <EditSizes {...modalProps} sizes={product.sizes} />;
            case 'addPhoto':
                return <EditPhoto {...modalProps} photos={product.photos} action={this.state.options.action} />;
            case 'description':
                return <EditDescription {...modalProps} desc={product.description} />;
            case 'addFeature':
                return <AddFeature {...modalProps} featuresIds={product.featuresIds} />;
            case 'addCommon':
                return <AddCommon {...modalProps} common={product.common} />;
            default:
                return window.alert('niepoprawny typ edycji produktu');
        }
    }

    render() {
        if(!this.props.handleReady) return <GeniusSpinner />;
        if(!this.props.product) return <div>nie znaleziono produktu</div>;
        const {product, product: {isActive}} = this.props;
        const collectionName = product.collection ? product.collection.name : 'brak przypisanych kolekcji';

        return (
            <div id='productDetails'>
                <div id='details'>
                    <div id='productDetailsBar'>
                        <div id='barTitle'>
                            <div className='info-box'>
                                <ion-icon name="information-circle"></ion-icon>
                                <p>Pola oznaczone <span className="red">*</span> obowiązkowe. Aby je edytować należy dezaktywować produkt.</p>
                            </div>
                        </div>
                        <div id='barWrapper'>
                            <div className='feature-edit-wrap no-margin'>
                                {product.isActive ? <span className='active'>aktywny</span> : <span className='no-active'>nieaktywny</span>}
                                <ion-icon name="create" className='edit-icon'
                                          onClick={() => this.openModal('active')}
                                />
                            </div>
                            <div id='barCopyBtn'
                                 onClick={this.onCopyProductClick}
                            >
                                stwórz kopię
                            </div>
                            <div id='barEditBtn'
                                 onClick={this.onDeleteProductClick}
                            >
                                usun
                            </div>
                        </div>
                    </div>
                    <div id='productDetailsContent'>
                        <div className='content-column'>
                            <div className='content-box content-info line'>
                                <div className='label'><span className='obligatory'>* </span>{product.name}</div>
                                {!isActive &&
                                <ion-icon name="create" className='edit-icon'
                                          onClick={() => this.openModal('name')}
                                />
                                }
                            </div>
                            <div className='content-box content-info line'>
                                <div className='feature-edit-wrap'>
                                    <div className='label'>kolekcja</div>
                                    <ion-icon name="create" className='edit-icon'
                                              onClick={() => this.openModal('collection')}
                                    />
                                </div>
                                <div className='value'>{collectionName}</div>
                            </div>
                            <div className='content-box content-info line'>
                                <div className='feature-edit-wrap'>
                                    <div className='label'><span className='obligatory'>*</span> cena</div>
                                    {!isActive &&
                                        <ion-icon name="create" className='edit-icon'
                                                  onClick={() => this.openModal('price')}
                                        />
                                    }
                                </div>
                                <div className='value'>{product.price}</div>
                            </div>
                            <div className='content-box content-info line'>
                                <div className='feature-edit-wrap'>
                                    <div className='label'>plec</div>
                                    <ion-icon name="create" className='edit-icon'
                                              onClick={() => this.openModal('gender')}
                                    />
                                </div>
                                <div className='value'>{product.gender}</div>
                            </div>
                            <div className='content-box line'>
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
                            <div className='content-box content-sizes line'>
                                <div className='feature-edit-wrap'>
                                    <div className='label'><span className='obligatory'>*</span> rozmiary</div>
                                    {!isActive &&
                                        <ion-icon name="create" className='edit-icon'
                                                  onClick={() => this.openModal('sizes')}
                                        />
                                    }
                                </div>
                                {this.renderSizes()}
                            </div>
                            <div className='label-photo'>powiazane kolory</div>
                            <div className='content-box content-photos'>
                                {this.renderCommonProducts()}
                            </div>
                            <div className='add-btn-wrap'>
                                <div className='add-btn' onClick={() => this.openModal('addCommon')}>
                                    wybierz produkt
                                </div>
                            </div>
                        </div>
                        <div className='content-column'>
                            <div className='info-box margin'>
                                <ion-icon name="information-circle"></ion-icon>
                                <p>Zalecany stosunek szerokości do wysokości zdjęcia to: 3:4.</p>
                            </div>
                            <div className='label-photo'><span className='obligatory'>*</span> zdjecie glowne</div>
                            {product.mainPhoto.length > 0 &&
                                <div className='content-box content-photos'>
                                    <div className='details-photo'>
                                        <img src={product.mainPhoto} />
                                    </div>
                                </div>
                            }
                            <div className='add-btn-wrap line'>
                                {!isActive &&
                                    <div className='add-btn' onClick={() => this.openModal('addPhoto', {action: 'main'})}>
                                        {product.mainPhoto.length > 0 ? 'zmien zdjecie' : 'dodaj zdjecie'}
                                    </div>
                                }
                            </div>
                            <div className='label-photo'>zdjecia</div>
                            <div className='content-box content-photos'>
                                {this.renderPhotos()}
                            </div>
                            <div className='add-btn-wrap line'>
                                <div className='add-btn' onClick={() => this.openModal('addPhoto', {action: 'photos'})}>
                                    dodaj zdjecie
                                </div>
                            </div>
                            <div className='content-box line'>
                                <div className='feature-edit-wrap'>
                                    <div className='label'>opis</div>
                                    <ion-icon name="create" className='edit-icon'
                                              onClick={() => this.openModal('description')}
                                    />
                                </div>
                                <div className='value'>{product.description}</div>
                            </div>
                            <div className='content-box'>
                                <div className='label label-details'>szczegoly</div>
                                {this.renderFeatures()}
                            </div>
                            <div className='add-btn-wrap'>
                                <div className='add-btn' onClick={() => this.openModal('addFeature')}>
                                    dodaj szczegol
                                </div>
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
        if(product) {
            product.collection = Collections.findOne({_id: product.collectionId});
            product.features = Features.find({_id: {$in: product.featuresIds}}).fetch();
            product._common = Products.find({_id: {$in: product.common}}, {fields: {_id: 1, name:1, mainPhoto: 1}}).fetch();
        }

    }

    return {
        handleReady,
        product
    }

})(ProductDetails);