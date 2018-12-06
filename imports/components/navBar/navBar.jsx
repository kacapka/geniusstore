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
        this.state = {
            isHamOpen: false
        };
        this.onCartClick = this.onCartClick.bind(this);
        this.onLogoClick = this.onLogoClick.bind(this);
        this.onHamburgerClick = this.onHamburgerClick.bind(this);
    }

    onLogoClick() {
        window.scrollTo(0,0);
        FlowRouter.go('/');
    }

    onCartClick() {
        window.scrollTo(0,0);
        FlowRouter.go('/cart');
    }

    onNavItemClick(route) {
        this.setState({isHamOpen: false});
        window.scrollTo(0,0);
        FlowRouter.go(`/${route}`);
    }

    onHamburgerClick() {
        this.setState({isHamOpen: !this.state.isHamOpen});
    }

    renderLinks() {
        const {isNews, isPromo} = this.props;
        return ROUTES.map(link => {
                if(link.route === 'sales' && !isPromo) return;
                if(link.route === 'new' && !isNews) return;
                return (
                    <li key={link.name}
                        onClick={() => this.onNavItemClick(link.route)}
                    >
                        {link.name}
                    </li>
                );
        })
    }
    
    render() {
        const {cart} = this.props;
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
                <div id='navHamburger'
                     className={this.state.isHamOpen ? 'ham-open' : ''}
                     onClick={this.onHamburgerClick}
                >
                    <div className='ham-line ham-top' />
                    <div className='ham-line ham-middle' />
                    <div className='ham-line ham-bottom' />
                </div>
                {this.state.isHamOpen &&
                    <div id='navRoutesMobile'>
                        <ul id='nav'>
                            {this.renderLinks()}
                            <a href='https://www.instagram.com/genius__fitness/' target='_blank'>
                                <li className='nav-insta'>
                                    <ion-icon name="logo-instagram" id='instaIcon' />
                                    <div id='instaName'>#madeingenius</div>
                                </li>
                            </a>
                        </ul>
                    </div>
                }
                <div id='navRoutes'>
                    <ul id='nav'>
                        {this.renderLinks()}
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