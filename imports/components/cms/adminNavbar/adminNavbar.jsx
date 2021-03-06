import React, {Component} from 'react';
import './adminNavbar.scss';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {Messages} from "../../../../lib/collections";
import {withTracker} from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';

const ROUTES = [
    // {name: 'zestawienia', icon: 'stats', route: 'stats'},
    {name: 'zamówienia', icon: 'cart', route: 'orders'},
    {name: 'produkty', icon: 'shirt', route: 'product'},
    {name: 'kody promocyjne', icon: 'star', route: 'promo-codes'},
    {name: 'wiadomości', icon: 'mail', route: 'messages'},
    {name: 'wyloguj sie', icon: 'power', route: null},
];

class AdminNavbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeRoute: 'stats',
            isMenu: false
        };
        this.onHamIconClick = this.onHamIconClick.bind(this);
    }

    onRouteItemClick(route) {
        if(!route) {Meteor.logout(); return;}
        this.setState({activeRoute: route, isMenu: false});
        FlowRouter.go(`/admin/${route}`);
    }

    onHamIconClick() {
        this.setState({isMenu: !this.state.isMenu});
    }

    renderRoutes() {
        return ROUTES.map(route => {
           return (
               <li key={route.name} onClick={() => this.onRouteItemClick(route.route)} className={this.state.activeRoute === route.route ? 'active' : ''}>
                   <ion-icon name={route.icon} />
                    <span>{route.name}</span>
                   {this.props.handleReady && route.route === 'messages' && this.props.messageCount !== 0 && <div className='count-alert'>{this.props.messageCount}</div>}
               </li>
           );
        });
    }

    render() {
        return (
            <div id='adminNavbar' className={this.state.isMenu ? 'show' : 'hide'}>
                <div id='adminLogo'>
                    <img src='/logo.png' />
                </div>
                <ul id='adminRoutes'>
                    {this.props.handleReady && this.renderRoutes()}
                </ul>
                <div className='mobile-ham'
                     onClick={this.onHamIconClick}
                >
                    <ion-icon name={this.state.isMenu ? 'close' : 'menu'}></ion-icon>
                </div>
            </div>

        );
    }
}

export default withTracker(() => {
    let messageCount = 0;
    const handle = Meteor.subscribe('messageCount.admin');
    const handleReady = handle.ready();
    if(handleReady) {
        messageCount = Messages.find({isOpen: false}).fetch().length;
    }

    return {
        handleReady,
        messageCount
    }
})(AdminNavbar);