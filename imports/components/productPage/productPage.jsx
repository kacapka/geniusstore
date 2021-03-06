import React, {Component} from 'react';
import './productPage.scss';
import {Meteor} from 'meteor/meteor';
import {withTracker} from 'meteor/react-meteor-data';
import {Products, Collections, Features} from '/lib/collections';
import SelectInput from "../../common/selectInput/selectInput";
import {addProductToCart} from "../../redux/actions";
import {compose} from 'redux';
import {connect} from 'react-redux';
import uniqid from 'uniqid';
import {FlowRouter} from 'meteor/kadira:flow-router';
import RenderCommonProducts from "./rednerCommonProducts";
import GeniusSpinner from "../../common/spinner/spinner";
import NotFoundText from "../../common/notFound/notFound";
import createPrompt from "../../functions/createPrompt";

class Product extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sizeValue: null,
            sizeError: null,
            mainPhoto: null
        };
        this.selectNewValue = this.selectNewValue.bind(this);
        this.onAddToCartBtnClick = this.onAddToCartBtnClick.bind(this);
        this.onCommonPhotoClick = this.onCommonPhotoClick.bind(this);
    }

    onThumbnailPhotoClick(photo) {
        this.setState({mainPhoto: photo});
    }

    onCollectionNameClick(id) {
        FlowRouter.go(`/collection/${id}`);
    }

    onCommonPhotoClick(id) {
        FlowRouter.go(`/${id}`);
    }

    checkIfProductIsAlreadyInCart() {
        const {cart, product} = this.props;
        return cart.some(item => {
            return item.size.name === this.state.sizeValue.name && item.productId === product._id;
        });
    }

    onAddToCartBtnClick() {
        if(!this.state.sizeValue) {
            this.setState({sizeError: 'wybierz rozmiar'});
        } else if(this.checkIfProductIsAlreadyInCart()){
            createPrompt('error', 'produkt już dodany');
        } else {
            const product = {
                productId: this.props.product._id,
                size: this.state.sizeValue,
                cartId: uniqid(),
                amount: 1
            };
            this.props.addProductToCart(product);
        }
    }

    selectNewValue(val) {
        this.setState({sizeValue: val, sizeError: null});
    }

    render() {
        const {product, handleReady} = this.props;
        if(!handleReady) return <GeniusSpinner client />;
        if(!product) return <NotFoundText>nie znaleziono produktu</NotFoundText>;
        const mainPhoto = this.state.mainPhoto;
        const photo = mainPhoto ? mainPhoto : product.mainPhoto;
        const photos = [...product.photos, product.mainPhoto];

        return (
            <div id='productPage'>
                <div id='productArea'>
                    <div id='productAreaPhotos'>
                        <div id='productPhotosWrap'>
                            <div id='photosMain' style={{backgroundImage: `url(${photo})`}}>
                            </div>
                            <div id='photosThumbnails'>
                                {photos.map(photo => {
                                    return (
                                        <div className='thumbnail-wrap' key={photo}
                                             onClick={() => this.onThumbnailPhotoClick(photo)}
                                        >
                                            <img src={photo} className='photo-thumbnail' />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        {product._common.length > 0
                            && window.matchMedia('(min-width: 768px)').matches
                            && <RenderCommonProducts products={product._common} onThumbnailClick={this.onCommonPhotoClick} />
                        }
                    </div>
                    <div id='productAreaDetails'>
                        <div id='detailsTitle'>
                            <span id='title-collection'
                               onClick={() => this.onCollectionNameClick(product.collectionId)}
                            >
                                {!product._collection.isDefault && product._collection.name}
                            </span>
                            <p id='title-name'>{product.name}</p>
                            <p id='title-price'>
                                {product.sales.isActive ? <span className='price-none'>PLN {product.price}</span> : `PLN ${product.price}`}
                                {product.sales.isActive && `PLN ${product.sales.salePrice}`}
                            </p>
                        </div>
                        <div id='detailsCart'>
                            <SelectInput options={product.sizes}
                                         defaultValue='rozmiar'
                                         selectValue={this.selectNewValue}
                                         className='cart-select-size'
                                         error={this.state.sizeError}
                                         type='sizes'
                            />
                            <div id='addToCartBtn'
                                 onClick={this.onAddToCartBtnClick}
                            >
                                do koszyka
                            </div>
                        </div>
                        {product._common.length > 0
                            && window.matchMedia('(max-width: 767px)').matches
                            && <RenderCommonProducts products={product._common} onThumbnailClick={this.onCommonPhotoClick} />
                        }
                        <div id='detailsDescription'>
                            <div className='desc-title'>Opis</div>
                            <p id='descriptionProduct'>{product.description}</p>
                            <div className='desc-title'>Szczegoly</div>
                            {product._features.map(feature => <p key={feature._id} className='description-feature'>{feature.name}</p>)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => ({
    cart: state.cart.products
});

const ProductPage = compose(
    connect(mapStateToProps, {addProductToCart}),
    withTracker((props) => {
        let product;
        const handle = Meteor.subscribe('product.public', props.productId);
        const handleReady = handle.ready();
        if(handleReady) {
            product = Products.findOne({_id: props.productId});
            if(product) {
                product._collection = Collections.findOne({_id: product.collectionId});
                product._features = Features.find({_id: {$in: product.featuresIds}}).fetch();
                product._common = Products.find({_id: {$in: product.common}}, {fields: {_id:1, mainPhoto: 1}}).fetch();
            }
        }

        return {
            handleReady,
            product
        }
    })
)(Product);

export default ProductPage;