import React, {Component, Fragment} from 'react';
import './cartPage.scss';
import {connect} from 'react-redux';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {deleteProductFromCart, updateProductAmount} from "../../redux/actions";
import getSalePrice from "../../functions/getSalePrice";
import SelectInput from "../../common/selectInput/selectInput";
import NotFoundText from "../../common/notFound/notFound";

class CartPage extends Component {

    constructor(props) {
        super(props);
        this.renderTotalAmount = this.renderTotalAmount.bind(this);
        this.setProductAmount = this.setProductAmount.bind(this);
        this.onGoToCheckoutBtnClick = this.onGoToCheckoutBtnClick.bind(this);
    }

    onProductClick(id) {
        FlowRouter.go(`/${id}`);
    }

    onDeleteProductClick(id) {
        this.props.deleteProductFromCart(id);
    }

    setProductAmount(opt, id) {
        console.log(opt, id);
        this.props.updateProductAmount(opt.name, id);
    }

    onGoToCheckoutBtnClick() {
        FlowRouter.go('/cart/checkout');
    }

    renderCartItems() {
        return this.props.cart.map(item => {
            const {_id, mainPhoto, _collection, name, sales, price} = item.product;
            const amountOpt = [];
            for(let i=1; i<=item.size.value && i < 6; i++) {
                amountOpt.push({name: i});
            }
            return (
                <div className='cart-item' key={item.cartId}>
                    <div className='cart-feature cart-product'
                        onClick={() => this.onProductClick(_id)}
                    >
                       <div className='cart-product-thumbnail'>
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
        for(let i=0; i<this.props.cart.length; i++) {
            const cartItem = this.props.cart[i];
            const productPrice = cartItem.product.sales.salePrice ? cartItem.product.sales.salePrice : cartItem.product.price;
            price += productPrice * cartItem.amount;
        }

        return price;
    }

    render() {
        return (
            <div id='cartPage'>
                {(() => {
                    if(this.props.cart.length > 0) {
                        return (
                            <Fragment>
                                <div id='cartWrapper'>
                                    <div className='cart-item cart-item-header'>
                                        <div className='cart-feature cart-product'>Produkt</div>
                                        <div className='cart-feature'>Cena</div>
                                        <div className='cart-feature'>Rozmiar</div>
                                        <div className='cart-feature'>Ilosc</div>
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
                                                Przejdz do zakupu
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Fragment>
                        );
                    } else {
                        return (
                            <NotFoundText>Twój koszyk jest pusty</NotFoundText>
                        );
                    }
                })()}
            </div>
        );
    }

}

const mapStateToProps = state => ({
   cart: state.cart.products
});

export default connect(mapStateToProps, {updateProductAmount, deleteProductFromCart})(CartPage);