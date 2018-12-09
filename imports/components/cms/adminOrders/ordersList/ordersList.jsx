import React, {Component, Fragment} from 'react';
import './ordersList.scss';
import {withTracker} from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';
import {Orders} from "../../../../../lib/collections";
import dateAgoPL from "../../../../functions/dateAgo";
import {FlowRouter} from 'meteor/kadira:flow-router';
import renderOrderStatus from "./renderStatus";
import createPrompt from "../../../../functions/createPrompt";
import GeniusSpinner from "../../../../common/spinner/spinner";

class OrdersList extends Component {

    renderOrders() {
        return this.props.orders.map(order => {
           return (
               <div className='order-item' key={order._id}>
                   <div className='order-feature order-products'>{order.orderNumber}</div>
                   <div className='order-feature mobile'>{dateAgoPL(order.timestamp).full}</div>
                   <div className='order-feature mobile'>{order.price}</div>
                   <div className='order-feature mobile'>{renderOrderStatus(order.status, 'tran')}</div>
                   <div className='order-feature mobile'>{renderOrderStatus(order.deliveryStatus, 'delivery')}</div>
                   <div className='order-feature order-icon icon-details'>
                       <ion-icon name="search"
                                 onClick={() => this.onShowOrderClick(order._id)}
                       />
                   </div>
                   <div className='order-feature order-icon icon-remove'>
                       <ion-icon name="remove-circle"
                                 onClick={() => this.onDeleteOrderClick(order._id)}
                       />
                   </div>
               </div>
           );
        });
    }

    onDeleteOrderClick(orderId) {
        if(window.confirm('czy na pewno chcesz usunac to zamowienie?')) {
            Meteor.call('deleteOrder', orderId, err => {
                if(!err) {
                    createPrompt('success', 'usunięto');
                } else {
                    console.error(err);
                    switch(err.error) {
                        case 'notPermission':
                            return createPrompt('error', 'brak uprawnień');
                        case 'orderRemoveFailed':
                            return createPrompt('error', 'problem z usunięciem');
                        default:
                            return createPrompt('error', 'ups... wystąpił problem');
                    }
                }
            });
        }
    }

    onShowOrderClick(orderId) {
        FlowRouter.go(`/admin/orders/${orderId}`);
    }

    render() {
        if(!this.props.handleReady) return <GeniusSpinner/>;
        if(this.props.orders.length === 0) return <div>brak zamówień</div>;
        return(
            <Fragment>
                {this.renderOrders()}
            </Fragment>
        );
    }

}

export default withTracker(() => {
    let orders = [];
    const handle = Meteor.subscribe('orders.admin');
    const handleReady = handle.ready();
    if(handleReady) {
        orders = Orders.find({}).fetch();
    }

    return {
        handleReady,
        orders
    }

})(OrdersList);