import React, {Component} from 'react';
import './adminProduct.scss';
import {FlowRouter} from 'meteor/kadira:flow-router';
import Modal from "../../../common/modal/modal";
import ProductCreate from "./create/productCreate";

const NAV_ROUTES = [
    {id: 0, name: 'lista produktow', route: 'list', icon: 'list'},
    {id: 1, name: 'kolekcje', route: 'collections', icon: 'ribbon'},
    {id: 2, name: 'promocje', route: 'sales', icon: 'pricetags'},
    {id: 3, name: 'dodaj produkt', route: 'create', icon: 'add-circle-outline'},
    {id: 4, name: 'szczegoly produktu', route: 'features', icon: 'more'},
    // {id: 5, name: 'kolory', route: 'colors', icon: 'color-palette'}
];

class AdminProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isModal: false
        };
        this.closeModal = this.closeModal.bind(this);
    }

    closeModal() {
        this.setState({isModal: false});
    }

    onProductNavItemClick(route) {
        if(route === 'create') {
            this.setState({isModal: true});
        } else {
            FlowRouter.go(`/admin/product/${route}`);
        }
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
                {this.state.isModal &&
                    <Modal>
                        <ProductCreate closeModal={this.closeModal} />
                    </Modal>
                }
            </div>
        )
    }

}

export default AdminProduct;