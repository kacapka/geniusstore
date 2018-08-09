import React from 'react';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {mount} from 'react-mounter';
import Admin from '../components/cms/Admin';
import AdminHome from '../components/cms/adminHome/adminHome';
import AdminProduct from "../components/cms/adminProduct/adminProduct";
import AdminMessages from "../components/cms/adminMessages/adminMessages";
import AdminCollections from "../components/cms/adminCollections/adminCollections";

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

//messages
FlowRouter.route('/admin/messages', {
    action() {
        mount(Admin, {
            content: <AdminMessages />
        });
    }
});

//collections
FlowRouter.route('/admin/collections', {
    action() {
        mount(Admin, {
            content: <AdminCollections />
        });
    }
});

