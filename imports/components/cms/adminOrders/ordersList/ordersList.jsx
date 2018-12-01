import React, {Component, Fragment} from 'react';
import './ordersList.scss';
import {withTracker} from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';
import {Orders, Products} from "../../../../../lib/collections";
import dateAgoPL from "../../../../functions/dateAgo";
import {FlowRouter} from 'meteor/kadira:flow-router';
import renderOrderStatus from "./renderStatus";

class OrdersList extends Component {

    renderOrders() {
        return this.props.orders.map(order => {
           return (
               <div className='order-item' key={order._id}>
                   <div className='order-feature order-products'>{order.orderNumber}</div>
                   <div className='order-feature'>{dateAgoPL(order.timestamp).full}</div>
                   <div className='order-feature'>{order.price}</div>
                   <div className='order-feature'>{renderOrderStatus(order.status, 'tran')}</div>
                   <div className='order-feature'>{renderOrderStatus(order.deliveryStatus, 'delivery')}</div>
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
                    console.log('order deleted');
                } else {
                    console.error(err);
                    alert(err.error);
                }
            });
        }
    }

    onShowOrderClick(orderId) {
        FlowRouter.go(`/admin/orders/${orderId}`);
    }

    render() {
        if(!this.props.handleReady) return <div>loading...</div>;
        console.log(this.props.orders);
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