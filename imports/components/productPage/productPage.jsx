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

const SIZES = [
    {value: 'S', extra: 'dostepny'},
    {value: 'M', extra: 'dostepny'},
    {value: 'L', extra: 'dostepny'},
    {value: 'XL', extra: 'dostepny'}
];

class Product extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sizeValue: null,
            sizeError: null
        };
        this.selectNewValue = this.selectNewValue.bind(this);
        this.onAddToCartBtnClick = this.onAddToCartBtnClick.bind(this);
    }

    onAddToCartBtnClick() {
        if(!this.state.sizeValue) {
            this.setState({sizeError: 'wybierz rozmiar'});
        } else {
            const product = {
                product: this.props.product,
                size: this.state.sizeValue,
                cartId: uniqid()
            };
            this.props.addProductToCart(product);
        }
    }

    selectNewValue(val) {
        this.setState({sizeValue: val, sizeError: null});
    }

    render() {
        const {product, handleReady} = this.props;
        if(!handleReady) return <div>loading...</div>;
        return (
            <div id='productPage'>
                <div id='productArea'>
                    <div id='productAreaPhotos'>
                        <div id='photosMain' style={{backgroundImage: `url(${product.photos[0]})`}}>
                        </div>
                        <div id='photosThumbnails'>
                            {product.photos.map(photo => {
                                return (
                                    <div className='thumbnail-wrap' key={photo}>
                                        <img src={photo} className='photo-thumbnail' />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div id='productAreaDetails'>
                        <div id='detailsTitle'>
                            <p id='title-collection'>{!product.collection.isDefault && product.collection.name}</p>
                            <p id='title-name'>{product.name}</p>
                            <p id='title-price'>PLN {product.price}</p>
                        </div>
                        <div id='detailsCart'>
                            <SelectInput options={product.sizes}
                                         defaultValue='rozmiar'
                                         selectValue={this.selectNewValue}
                                         className='cart-select-size'
                                         error={this.state.sizeError}
                            />
                            <div id='addToCartBtn'
                                 onClick={this.onAddToCartBtnClick}
                            >
                                do koszyka
                            </div>
                        </div>
                        <div id='detailsDescription'>
                            <p id='descriptionProduct'>{product.description}</p>
                            {product.features.map(feature => <p key={feature._id} className='description-feature'>{feature.name}</p>)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

const ProductPage = compose(
    connect(null, {addProductToCart}),
    withTracker((props) => {
        let product;
        const handle = Meteor.subscribe('product.public', props.productId);
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
    })
)(Product);

export default ProductPage;