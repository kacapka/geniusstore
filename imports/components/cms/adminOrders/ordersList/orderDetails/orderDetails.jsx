import React, {Component} from 'react';
import './orderDetails.scss';
import {Orders, Products} from "../../../../../../lib/collections";
import {withTracker} from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';
import OrderProducts from "./renderProducts";
import OrderAddress from "./renderAddress";
import OrderUserData from "./renderUserData";
import OrderSummary from "./renderSummary";
import createPrompt from "../../../../../functions/createPrompt";
import GeniusSpinner from "../../../../../common/spinner/spinner";

class OrderDetails extends Component {

    constructor(props) {
        super(props);
        this.onConfirmDeliveryClick = this.onConfirmDeliveryClick.bind(this);
    }

    onConfirmDeliveryClick() {
        const orderId = this.props.order._id;
        if(confirm('czy na pewno chcesz wysłać maila potwierdzającego wysyłkę zamówienia?')) {
            Meteor.call('sendDeliveryEmail', orderId, err => {
                if(!err) {
                    createPrompt('success', 'wysłano potwierdzenie');
                } else {
                    console.error(err);
                    switch(err.error) {
                        case 'notPermission':
                            return createPrompt('error', 'brak uprawnień');
                        case 'orderNotFound':
                            return createPrompt('error', 'nie znalezniono zamówienia');
                        case 'updateDeliveryStatusFailed':
                            return createPrompt('error', 'problem ze zmianą statusu wysyłki');
                        default:
                            return createPrompt('error', 'ups... wystąpił problem');
                    }
                }
            })
        }
    }

    render() {
        if(!this.props.handleReady) return <GeniusSpinner/>;
        if(!this.props.order) return <div>nie znaleziono zamówienia</div>;
        const {notes, deliveryStatus, products, address, user, orderNumber} = this.props.order;
        return (
            <div id='orderDetails'>
                <div className='order-bar'>
                    <div className='bar-title'>Zamowienie nr: {orderNumber}</div>
                    <div className='bar-actions'>
                        {deliveryStatus !== 'completed' &&
                            <div className='btn-delivery'
                                 onClick={this.onConfirmDeliveryClick}
                            >
                                Potwierdz wysylke
                            </div>
                        }
                    </div>
                </div>
                <div className='order-content'>
                    <div className='order-products'>
                        <OrderProducts products={products} />
                        <OrderSummary order={this.props.order} />
                    </div>
                    <div className='order-user'>
                        <OrderAddress address={address} />
                        <OrderUserData user={user} />
                        <div className='order-notes'>
                            <div className='section-title'>Uwagi do zamowienia</div>
                            <div>{notes.length === 0 ? 'brak uwag' : notes}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default withTracker(props => {
    let order = {};
    const handle = Meteor.subscribe('order.admin', props.orderId);
    const handleReady = handle.ready();
    if(handleReady) {
        order = Orders.findOne({_id: props.orderId});
        if(order) {
            for(let product of order.products) {
                product._data = Products.findOne({_id: product.productId}, {fields: {mainPhoto: 1, name: 1, price: 1}});
            }
        }

    }

    return {
        handleReady,
        order
    }
})(OrderDetails);