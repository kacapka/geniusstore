import React from 'react';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {mount} from 'react-mounter';
import Admin from '../components/cms/Admin';
import AdminHome from '../components/cms/adminHome/adminHome';

FlowRouter.route('/admin', {
    action() {
        mount(Admin, {
            content: <AdminHome />
        });
    }
});


