import React from 'react';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {mount} from 'react-mounter';
import App from '../components/App';
import MainPage from '../components/mainPage/mainPage';

FlowRouter.route('/', {
    action() {
        mount(App, {
            content: <MainPage />
        });
    }
});