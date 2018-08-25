import React from 'react';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {mount} from 'react-mounter';
import Admin from '../components/cms/Admin';
import AdminHome from '../components/cms/adminHome/adminHome';
import AdminProduct from "../components/cms/adminProduct/adminProduct";
import AdminMessages from "../components/cms/adminMessages/adminMessages";
import ProductList from "../components/cms/adminProduct/list/productList";
import ProductCollections from "../components/cms/adminProduct/collections/productCollections";
import ProductCreate from "../components/cms/adminProduct/create/productCreate";
import ProductFeatures from "../components/cms/adminProduct/features/productFeatures";
import ProductDetails from "../components/cms/adminProduct/list/productDetails/productDetails";
import ProductSales from "../components/cms/adminProduct/sales/productSales";

FlowRouter.route('/admin', {
    action() {
        mount(Admin, {
            content: <AdminHome />
        });
    }
});

//product
FlowRouter.route('/admin/product', {
    action() {
        mount(Admin, {
            content: <AdminProduct />
        });
    }
});

//product --> list
FlowRouter.route('/admin/product/list', {
    action() {
        mount(Admin, {
            content: <ProductList />
        });
    }
});

//product --> list --> details
FlowRouter.route('/admin/product/list/:productId', {
    action(params) {
        mount(Admin, {
            content: <ProductDetails productId={params.productId} />
        });
    }
});

//product --> collections
FlowRouter.route('/admin/product/collections', {
    action() {
        mount(Admin, {
            content: <ProductCollections />
        });
    }
});

//product --> create
FlowRouter.route('/admin/product/create', {
    action() {
        mount(Admin, {
            content: <ProductCreate />
        });
    }
});

//product --> features
FlowRouter.route('/admin/product/features', {
    action() {
        mount(Admin, {
            content: <ProductFeatures />
        });
    }
});

//product --> sales
FlowRouter.route('/admin/product/sales', {
    action() {
        mount(Admin, {
            content: <ProductSales />
        });
    }
})


//messages
FlowRouter.route('/admin/messages', {
    action() {
        mount(Admin, {
            content: <AdminMessages />
        });
    }
});


