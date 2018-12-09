import React, {Component} from 'react';
import './cartPage.scss';
import {FlowRouter} from 'meteor/kadira:flow-router';
import SelectInput from "../../common/selectInput/selectInput";
import NotFoundText from "../../common/notFound/notFound";
import GeniusSpinner from "../../common/spinner/spinner";
import {Products, Collections} from "../../../lib/collections";
import {Meteor} from 'meteor/meteor';
import {withTracker} from 'meteor/react-meteor-data';
import {deleteProductFromCart, updateProductAmount} from "../../redux/actions";
import {toggleCheckout} from "../../redux/actions/checkout";
import {connect} from 'react-redux';
import CheckoutPage from "../checkoutPage/checkoutPage";
import {getDeliveryPrice} from "../../redux/selectors/deliveryPrice";
import {getFinalPrice} from "../../redux/selectors/finalPrice";

class CartProducts extends Component {

    constructor(props) {
        super(props);
        this.renderTotalAmount = this.renderTotalAmount.bind(this);
        this.setProductAmount = this.setProductAmount.bind(this);
        this.onGoToCheckoutBtnClick = this.onGoToCheckoutBtnClick.bind(this);
    }

    onProductClick(id) {
        window.scrollTo(0,0);
        FlowRouter.go(`/${id}`);
    }

    onDeleteProductClick(id) {
        this.props.deleteProductFromCart(id);
    }

    setProductAmount(opt, id) {
        this.props.updateProductAmount(opt.name, id);
    }

    onGoToCheckoutBtnClick() {
        window.scrollTo(0,0);
        this.props.toggleCheckout(!this.props.isCheckout);
    }

    renderCartItems() {
        return this.props.cartProducts.map(item => {
            if(!item._product) return;
            const {_id, mainPhoto, _collection, name, sales, price} = item._product;
            const amountOpt = [];
            for(let i=1; i<=item.size.value && i < 6; i++) {
                amountOpt.push({name: i});
            }
            return (
                <div className='cart-item' key={item.cartId}>
                    <div className='cart-feature cart-product'>
                        <div className='cart-product-thumbnail' onClick={() => this.onProductClick(_id)}>
                            <img src={mainPhoto} alt='product thumbnail' />
                        </div>
                        <div className='cart-product-name'>
                            <p className='cart-collection'>{!_collection.isDefault && _collection.name}</p>
                            <p className='cart-name'>{name}</p>
                        </div>
                    </div>
                    <div className='cart-feature cart-details-wrap'>
                        <div className='cart-feature cart-price'>{sales.isActive ? `PLN ${sales.salePrice}` : `PLN ${price}`}</div>
                        <div className='cart-feature cart-size'>{item.size.name}</div>
                        <div className='cart-feature cart-amount'>
                            <SelectInput options={amountOpt}
                                         selectedValue={item.amount}
                                         selectValue={this.setProductAmount}
                                         className='cart-amount-select'
                                         selectName={item.cartId}
                            />
                        </div>
                        <div className='cart-feature cart-remove'>
                            <ion-icon name="remove-circle"
                                      onClick={() => this.onDeleteProductClick(item.cartId)}
                            />
                        </div>
                    </div>
                </div>
            );
        });
    }

    renderTotalAmount() {
        let price = 0;
        for(let i=0; i<this.props.cartProducts.length; i++) {
            const cartItem = this.props.cartProducts[i];
            if(cartItem._product) {
                const productPrice = cartItem._product.sales.salePrice ? cartItem._product.sales.salePrice : cartItem._product.price;
                price += productPrice * cartItem.amount;
            }
        }

        return price;
    }

    render() {
        if(!this.props.handleReady) return <GeniusSpinner />;
        if(!this.props.products.length) return <NotFoundText>Twój koszyk jest pusty</NotFoundText>;

        if(!this.props.isCheckout) {
            return (
                <div id='cartWrapper'>
                    <div className='cart-item cart-item-header'>
                        <div className='cart-feature cart-product'>Produkt</div>
                        <div className='cart-feature'>Cena</div>
                        <div className='cart-feature'>Rozmiar</div>
                        <div className='cart-feature'>Ilość</div>
                        <div className='cart-feature'>Usuń</div>
                    </div>
                    {this.renderCartItems()}
                    <div id='cartCheckout'>
                        <div id='cartCheckoutWrap'>
                            <p id='cartCheckoutPrice'>Razem: <br />{this.renderTotalAmount()} PLN</p>
                            <p id='cartCheckoutInfo'>plus koszt wysyłki</p>
                            <div id='cartCheckoutBtn'
                                 onClick={this.onGoToCheckoutBtnClick}
                            >
                                Przejdź do zakupu
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return <CheckoutPage cartProducts={this.props.cartProducts} />;
        }
    }

}

const mapStateToProps = (state) => ({
    isCheckout: state.checkout.isCheckout
});

const witConnect = connect(mapStateToProps, {deleteProductFromCart, updateProductAmount, toggleCheckout})(CartProducts);

export default withTracker(props => {
    let cartProducts = [];
    let products = [];
    const productsIds = props.cart.map(item => item.productId);
    const handle = Meteor.subscribe('products.cart.public', productsIds);
    const handleReady = handle.ready();
    if(handleReady) {
        products = Products.find({_id: {$in: productsIds}}).fetch();
        for(let p of products) {
            p._collection = Collections.findOne({_id: p.collectionId});
        }
        for(let c of props.cart) {
            const product = products.find(el => el._id === c.productId);
            if(product) {
                const cartItem = {
                    ...c,
                    _product: product
                };
                cartProducts.push(cartItem);
            }
        }
    }

    return {
        handleReady,
        cartProducts,
        products
    }

})(witConnect)