import React, {Component} from 'react';
import './productPage.scss';
import {Meteor} from 'meteor/meteor';
import {withTracker} from 'meteor/react-meteor-data';
import {Products} from '/lib/collections';
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
        console.log(product);
        return (
            <div id='productPage'>
                <div id='productArea'>
                    <div id='productAreaPhotos'>
                        <div id='photosMain' style={{backgroundImage: `url(${product.photo})`}}>
                        </div>
                        <div id='photosThumbnails'>
                            <div className='thumbnail-wrap'>
                                <img src={product.photo} className='photo-thumbnail' />
                            </div>
                            <div className='thumbnail-wrap'>
                                <img src={product.photo} className='photo-thumbnail' />
                            </div>
                            <div className='thumbnail-wrap'>
                                <img src={product.photo} className='photo-thumbnail' />
                            </div>
                        </div>
                    </div>
                    <div id='productAreaDetails'>
                        <div id='detailsTitle'>
                            <p id='title-collection'></p>
                            <p id='title-name'>{product.title}</p>
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
                            <p id='descriptionProduct'></p>
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
        }

        return {
            handleReady,
            product
        }
    })
)(Product);

export default ProductPage;