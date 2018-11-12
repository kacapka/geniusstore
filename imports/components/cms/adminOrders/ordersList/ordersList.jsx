import React, {Component, Fragment} from 'react';
import './ordersList.scss';
import {withTracker} from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';
import {Orders, Products} from "../../../../../lib/collections";
import dateAgoPL from "../../../../functions/dateAgo";
import {FlowRouter} from 'meteor/kadira:flow-router';

class OrdersList extends Component {

    renderOrderStatus(status, type) {
        switch (status) {
            case 'pending':
                return <span className='status-pending'>oczekujacy</span>;
            case 'completed':
                return <span className='status-completed'>{type === 'delivery' ? 'wyslano' : 'zaplacono'}</span>;
            case 'rejected':
                return <span className='status-rejected'>odrzucono</span>;
        }
    }

    renderOrders() {
        return this.props.orders.map(order => {
           return (
               <div className='order-item' key={order._id}>
                   <div className='order-feature order-products'>11</div>
                   <div className='order-feature'>{dateAgoPL(order.timestamp).full}</div>
                   <div className='order-feature'>{order.price}</div>
                   <div className='order-feature'>{this.renderOrderStatus(order.status, 'tran')}</div>
                   <div className='order-feature'>{this.renderOrderStatus(order.status, 'delivery')}</div>
                   <div className='order-feature order-icon'>
                       <ion-icon name="search"
                                 onClick={() => this.onShowOrderClick(order._id)}
                       />
                   </div>
                   <div className='order-feature order-icon'>
                       <ion-icon name="remove-circle"
                                 onClick={() => this.onDeleteOrderClick(order._id)}
                       />
                   </div>
               </div>
           );
        });
    }

    onDeleteOrderClick(orderId) {
        console.log(orderId);
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
        // for(let order of orders) {
        //     for(let product of order.products) {
        //         const orderProduct = Products.findOne({_id: product.productId}, {fields: {mainPhoto: 1, name: 1}});
        //         product._name = orderProduct ? orderProduct.name : 'usuniety';
        //         product._photo = orderProduct ? orderProduct.mainPhoto : '';
        //     }
        // }
    }

    return {
        handleReady,
        orders
    }

})(OrdersList);