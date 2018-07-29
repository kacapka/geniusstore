import React from 'react';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {mount} from 'react-mounter';
import App from '../components/App';
import MainPage from '../components/mainPage/mainPage';
import ProductPage from '../components/productPage/productPage';

FlowRouter.route('/', {
    action() {
        mount(App, {
            content: <MainPage />
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