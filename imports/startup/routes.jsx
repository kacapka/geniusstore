import React from 'react';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {mount} from 'react-mounter';
import App from '../components/App';
import MainPage from '../components/mainPage/mainPage';
import MainPageMen from '../components/mainPage/mainPageMen';
import MainPageWomen from '../components/mainPage/mainPageWomen';
import ProductPage from '../components/productPage/productPage';
import CartPage from '../components/cartPage/cartPage';
import './routesCms';
import MainPageNews from "../components/mainPage/mainPageNews";
import MainPageSales from "../components/mainPage/mainPageSales";
import MainPageCollection from "../components/mainPage/mainPageCollection";

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
            content: <MainPageMen />
        });
    }
});

FlowRouter.route('/women', {
    action() {
        mount(App, {
            content: <MainPageWomen />
        });
    }
});

FlowRouter.route('/new', {
    action() {
        mount(App, {
            content: <MainPageNews />
        });
    }
});

FlowRouter.route('/sales', {
    action() {
        mount(App, {
            content: <MainPageSales />
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

//product page
FlowRouter.route('/collection/:collectionId', {
    action(params) {
        mount(App, {
            content: <MainPageCollection collectionId={params.collectionId} />
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


