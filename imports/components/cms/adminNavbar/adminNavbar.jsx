import React, {Component} from 'react';
import './adminNavbar.scss';
import {FlowRouter} from 'meteor/kadira:flow-router';

const ROUTES = [
    {name: 'zestawienia', icon: 'stats', route: 'stats'},
    {name: 'produkty', icon: 'shirt', route: 'product'},
    {name: 'zamowienia', icon: 'cart', route: 'orders'},
    {name: 'kolekcje', icon: 'pricetag', route: 'collections'},
    {name: 'wiadomosci', icon: 'mail', route: 'messages'},
    {name: 'wyloguj sie', icon: 'power', route: null},
];

class AdminNavbar extends Component {

    constructor(props) {
        super(props);
        //this.onRouteItemClick = this.onRouteItemClick.bind(this);
    }

    onRouteItemClick(route) {
        if(!route) {Meteor.logout(); return;}
        FlowRouter.go(`/admin/${route}`);
    }

    renderRoutes() {
        return ROUTES.map(route => {
           return (
               <li key={route.name} onClick={() => this.onRouteItemClick(route.route)}>
                   <ion-icon name={route.icon} />
                    <span>{route.name}</span>
               </li>
           );
        });
    }

    render() {
        return (
            <div id='adminNavbar'>
                <div id='adminLogo'>
                    <img src='/logo.png' />
                </div>
                <ul id='adminRoutes'>
                    {this.renderRoutes()}
                </ul>
            </div>

        );
    }
}

export default AdminNavbar;