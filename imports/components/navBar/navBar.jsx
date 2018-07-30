import React, {Component} from 'react';
import './navBar.scss';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {connect} from 'react-redux';
const ROUTES = ['kobiety', 'mezsczyni', 'nowosci', 'promocje'];

class NavBar extends Component {

    constructor(props) {
        super(props);
        this.onCartClick = this.onCartClick.bind(this);
        this.onLogoClick = this.onLogoClick.bind(this);
    }

    onLogoClick() {
        FlowRouter.go('/');
    }

    onCartClick() {
        FlowRouter.go('/cart');
    }
    
    render() {
        const cart = this.props.cart;
        return(
            <div id='navBar'>
                <div id='navCart'>
                    <div id='cartWrapper' onClick={this.onCartClick}>
                        <img src='/cart.png' alt='shoping cart' id='cart' />
                        {cart.length > 0 && <div id='cartItems'>{cart.length}</div>}
                    </div>
                </div>
                <div id='navLogo'>
                    <div id='logoWrapper'>
                        <img src='/logo.png' alt='genius logo' id='logo-img' onClick={this.onLogoClick} />
                    </div>
                </div>
                <div id='navRoutes'>
                    <ul id='nav'>
                        <li>kobiety</li>
                        <li>mezczyzni</li>
                        <li>nowosci</li>
                        <li>promocje</li>
                    </ul>
                </div>
            </div>
        );
    }
    
}

const mapStateToProps = state => ({
    cart: state.cart
});

export default connect(mapStateToProps)(NavBar);