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
import ProductColors from "../components/cms/adminProduct/colors/productColors";
import PromoCodes from "../components/cms/adminPromoCodes/promoCodes";
import AdminOrders from "../components/cms/adminOrders/adminOrders";
import OrderDetails from "../components/cms/adminOrders/ordersList/orderDetails/orderDetails";

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
});

//product --> colors
FlowRouter.route('/admin/product/colors', {
    action() {
        mount(Admin, {
            content: <ProductColors />
        });
    }
});

//messages
FlowRouter.route('/admin/promo-codes', {
    action() {
        mount(Admin, {
            content: <PromoCodes />
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

//orders
FlowRouter.route('/admin/orders', {
    action() {
        mount(Admin, {
            content: <AdminOrders />
        });
    }
});

//orders --> details
FlowRouter.route('/admin/orders/:orderId', {
    action(params) {
        mount(Admin, {
            content: <OrderDetails orderId={params.orderId} />
        });
    }
});


