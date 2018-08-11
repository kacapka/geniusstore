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

//messages
FlowRouter.route('/admin/messages', {
    action() {
        mount(Admin, {
            content: <AdminMessages />
        });
    }
});


