import React, {Component} from 'react';
import './navBar.scss';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {withTracker} from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';
import {Products} from "../../../lib/collections";

const ROUTES = [
    {name: 'kobiety', route: 'women'},
    {name: 'mezczyzni', route: 'men'},
    {name: 'promocje', route: 'sales'},
    {name: 'nowosci', route: 'new'}
];

class Nav extends Component {

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

    onNavItemClick(route) {
        FlowRouter.go(`/${route}`);
    }
    
    render() {
        const {cart, isNews, isPromo} = this.props;
        console.log(this.props);

        return(
            <div id='navBar'>
                <div id='navLogo'>
                    <div id='logoWrapper'>
                        <img src='/logo.png' alt='genius logo' id='logo-img' onClick={this.onLogoClick} />
                    </div>
                </div>
                <div id='navCart'>
                    <div id='cartWrapper' onClick={this.onCartClick}>
                        <img src='/shoping_bag.png' alt='shoping cart' id='cart' />
                        {cart.length > 0 && <div id='cartItems'>{cart.length}</div>}
                    </div>
                </div>
                <div id='navHamburger'>
                    <div className='ham-top' />
                    <div className='ham-middle' />
                    <div className='ham-bottom' />
                </div>
                <div id='navRoutes'>
                    <ul id='nav'>
                        {ROUTES.map(link => {
                            if(link.route === 'sales' && !isPromo) return;
                            if(link.route === 'new' && !isNews) return;
                            return (
                                <li key={link.name}
                                    onClick={() => this.onNavItemClick(link.route)}
                                >
                                    {link.name}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        );
    }
    
}

const mapStateToProps = state => ({
    cart: state.cart.products
});

const NavBar = compose(
    connect(mapStateToProps),
    withTracker(() => {
        let isPromo = false;
        let isNews = false;
        const handle = Meteor.subscribe('nav.public');
        const handleReady = handle.ready();
        if(handleReady) {
            const withPromo = Products.find({isActive: true, isSale: true, 'sales.isActive': true}, {fields: {_id: 1}}).fetch();
            const withNew = Products.find({isActive: true, isNew: true}, {fields: {_id: 1}}).fetch();

            console.log(withPromo);

            isPromo = withPromo.length > 0;
            isNews = withNew.length > 0;
        }

        return {
            handleReady,
            isPromo,
            isNews
        }
    })
)(Nav);

export default NavBar;