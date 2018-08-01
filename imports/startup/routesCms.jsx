import React from 'react';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {mount} from 'react-mounter';
import Admin from '../components/cms/Admin';
import AdminHome from '../components/cms/adminHome/adminHome';
import AdminProduct from "../components/cms/adminProduct/adminProduct";

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

