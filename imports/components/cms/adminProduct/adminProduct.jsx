import React, {Component} from 'react';
import './adminProduct.scss';
import {FlowRouter} from 'meteor/kadira:flow-router';

const NAV_ROUTES = [
    {id: 0, name: 'lista produktow', route: 'list', icon: 'list'},
    {id: 1, name: 'kolekcje', route: 'collections', icon: 'ribbon'},
    {id: 2, name: 'promocje', route: 'sales', icon: 'pricetags'},
    {id: 3, name: 'dodaj produkt', route: 'addnew', icon: 'add-circle-outline'},
    {id: 4, name: 'szczegoly produktu', route: 'features', icon: 'more'},
    {id: 5, name: 'rozmiary', route: 'sizes', icon: 'bookmark'},
];

class AdminProduct extends Component {

    onProductNavItemClick(route) {
        FlowRouter.go(`/admin/product/${route}`);
    }

    render() {
        return(
            <div id='adminProduct'>
                <div id='productNav'>
                    {NAV_ROUTES.map(link => {
                        return (
                            <div className='nav-item-wrapper'
                                 key={link.id}
                                 onClick={() => this.onProductNavItemClick(link.route)}
                            >
                                <ion-icon name={link.icon} />
                                <span>{link.name}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        )
    }

}

export default AdminProduct;