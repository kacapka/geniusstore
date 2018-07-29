import React, {Component} from 'react';
import './navBar.scss';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {connect} from 'react-redux';
const ROUTES = ['kobiety', 'mezsczyni', 'nowosci', 'promocje'];

class NavBar extends Component {

    constructor(props) {
        super(props);
        this.onCartClick = this.onCartClick.bind(this);
    }

    onCartClick() {
        FlowRouter.go('/cart');
    }
    
    render() {
        console.log(this.props.cart);

        return(
            <div id='navBar'>
                <div id='navCart'>
                    <div id='cartWrapper' onClick={this.onCartClick}>
                        <img src='/cart.png' alt='shoping cart' id='cart' />
                    </div>
                </div>
                <div id='navLogo'>
                    <div id='logoWrapper'>
                        <img src='/logo.png' alt='genius logo' id='logo-img' />
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