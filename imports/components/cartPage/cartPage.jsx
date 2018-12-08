import React, {Component} from 'react';
import './cartPage.scss';
import {connect} from 'react-redux';
import NotFoundText from "../../common/notFound/notFound";
import CartProducts from "./cartProducts";

class CartPage extends Component {

    render() {
        return (
            <div id='cartPage'>
                {(() => {
                    if(this.props.cart.length > 0) {
                        return (
                            <CartProducts cart={this.props.cart}
                            />
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

export default connect(mapStateToProps)(CartPage);