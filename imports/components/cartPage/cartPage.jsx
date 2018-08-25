import React, {Component, Fragment} from 'react';
import './cartPage.scss';
import {connect} from 'react-redux';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {deleteProductFromCart} from "../../redux/actions";

class CartPage extends Component {

    constructor(props) {
        super(props);
        this.renderTotalAmount = this.renderTotalAmount.bind(this);
    }

    onProductClick(id) {
        FlowRouter.go(`/${id}`);
    }

    onDeleteProductClick(id) {
        this.props.deleteProductFromCart(id);
    }

    renderCartItems() {
        return this.props.cart.map((item, i) => {
           return (
               <div className='cart-item' key={`${item.product._id}${i}`}>
                   <div className='cart-feature cart-product'
                        onClick={() => this.onProductClick(item.product._id)}
                   >
                       <div className='cart-product-thumbnail'>
                           <img src={item.product.photos[0]} alt='product thumbnail' />
                       </div>
                       <div className='cart-product-name'>
                           <p className='cart-collection'>{item.product.collection.name}</p>
                           <p className='cart-name'>{item.product.name}</p>
                       </div>
                   </div>
                   <div className='cart-feature cart-price'>PLN {item.product.price}</div>
                   <div className='cart-feature cart-size'>{item.size.name}</div>
                   <div className='cart-feature cart-remove'>
                       <ion-icon name="remove-circle"
                                onClick={() => this.onDeleteProductClick(item.cartId)}
                       />
                   </div>
               </div>
           );
        });
    }

    renderTotalAmount() {
        let price = 0;
        for(let i=0; i<this.props.cart.length; i++) {
            price += this.props.cart[i].product.price;
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
                                        <div className='cart-feature'>Usuń</div>
                                    </div>
                                    {this.renderCartItems()}
                                    <div id='cartCheckout'>
                                        <div id='cartCheckoutWrap'>
                                            <p id='cartCheckoutPrice'>Razem: <br />{this.renderTotalAmount()} PLN</p>
                                            <p id='cartCheckoutInfo'>plus koszt wysyłki</p>
                                            <div id='cartCheckoutBtn'>
                                                Przejdz do zakupu
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Fragment>
                        );
                    } else {
                        return (
                            <div id='cartNoResult'>Twój koszyk jest pusty</div>
                        );
                    }
                })()}
            </div>
        );
    }

}

const mapStateToProps = state => ({
   cart: state.cart
});

export default connect(mapStateToProps, {deleteProductFromCart})(CartPage);