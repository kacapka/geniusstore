import React from 'react';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {mount} from 'react-mounter';
import App from '../components/App';
import MainPage from '../components/mainPage/mainPage';
import ProductPage from '../components/productPage/productPage';
import CartPage from '../components/cartPage/cartPage';
import './routesCms';
import MainPageCollection from "../components/mainPage/mainPageCollection";
import CheckoutPage from "../components/checkoutPage/checkoutPage";
import TermsPage from "../components/termsPage/termsPage";

FlowRouter.route('/', {
    action() {
        mount(App, {
            content: <MainPage />
        });
    }
});

FlowRouter.route('/men', {
    action() {
        mount(App, {
            content: <MainPage query={{gender: 'man'}} />
        });
    }
});

FlowRouter.route('/women', {
    action() {
        mount(App, {
            content: <MainPage query={{gender: 'woman'}} />
        });
    }
});

FlowRouter.route('/new', {
    action() {
        mount(App, {
            content: <MainPage query={{isNew: true}} />
        });
    }
});

FlowRouter.route('/sales', {
    action() {
        mount(App, {
            content: <MainPage query={{isSale: true, 'sales.isActive': true}} />
        });
    }
});

//cart
FlowRouter.route('/cart', {
    action() {
        mount(App, {
            content: <CartPage />
        });
    }
});

// //cart
// FlowRouter.route('/cart/checkout', {
//     action() {
//         mount(App, {
//             content: <CheckoutPage />
//         });
//     }
// });

//product page
FlowRouter.route('/collection/:collectionId', {
    action(params) {
        mount(App, {
            content: <MainPageCollection collectionId={params.collectionId} />
        });
    }
});

//terms
FlowRouter.route('/terms/:tab', {
    action(params) {
        mount(App, {
            content: <TermsPage tab={params.tab} />
        });
    }
});

//product page
FlowRouter.route('/:productId', {
    action(params) {
        mount(App, {
            content: <ProductPage productId={params.productId} />
        });
    }
});



