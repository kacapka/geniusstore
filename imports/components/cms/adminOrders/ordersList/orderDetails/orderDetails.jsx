import React, {Component, Fragment} from 'react';
import './orderDetails.scss';
import {Orders, Products} from "../../../../../../lib/collections";
import {withTracker} from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';

class OrderDetails extends Component {

    renderProducts() {
        return this.props.order.products.map(product => {
            console.log(product);
           return (
               <div className='order-product' key={product.productId}>
                   <div className='product-photo'>
                       <div className='photo-wrap' style={{backgroundImage: `url(${product._data.mainPhoto})`}}/>
                   </div>
                   <div className='list-feature'>{product._data.name}</div>
                   <div className='list-feature'>{product.amount}</div>
                   <div className='list-feature'>{product.size}</div>
                   <div className='list-feature'>{product._data.price}</div>
               </div>
           )
        });
    }

    renderAddress() {
        const address = this.props.order.address;
        return (
            <Fragment>
                <div className='info-item-wrap'>
                    <div className='info-label'>Miasto</div>
                    <div className='info-value'>{address.city}</div>
                </div>
                <div className='info-item-wrap'>
                    <div className='info-label'>Kod pocztowy</div>
                    <div className='info-value'>{address.zipCode}</div>
                </div>
                <div className='info-item-wrap'>
                    <div className='info-label'>Ulica, nr domu</div>
                    <div className='info-value'>{address.street}</div>
                </div>
            </Fragment>
        )
    }

    renderUserData() {
        const user = this.props.order.user;
        return (
            <Fragment>
                <div className='info-item-wrap'>
                    <div className='info-label'>Imie i nazwisko</div>
                    <div className='info-value'>{user.name + ' ' + user.surname}</div>
                </div>
                <div className='info-item-wrap'>
                    <div className='info-label'>Email</div>
                    <div className='info-value'>{user.email}</div>
                </div>
                <div className='info-item-wrap'>
                    <div className='info-label'>Telefon</div>
                    <div className='info-value'>{user.phone}</div>
                </div>
            </Fragment>
        )
    }

    render() {
        if(!this.props.handleReady) return <div>loading</div>;
        console.log(this.props.order);
        const notes = this.props.order.notes;
        return (
            <div id='orderDetails'>
                <div className='order-bar'>
                    <div className='bar-title'>Zamowienie nr: 1</div>
                    <div className='bar-actions'>
                        <div className='btn-delivery'>Potwierdz wysylke</div>
                    </div>
                </div>
                <div className='order-content'>
                    <div className='order-products'>
                        <div className='section-title'>Produkty</div>
                        <div className='product-header'>
                            <div className='product-photo'>Produkt</div>
                            <div className='list-feature'>Nazwa</div>
                            <div className='list-feature'>Ilosc</div>
                            <div className='list-feature'>Rozmiar</div>
                            <div className='list-feature'>Cena</div>
                        </div>
                        {this.renderProducts()}
                    </div>
                    <div className='order-user'>
                        <div className='order-wrapper'>
                            <div className='section-title'>Adres wysylki</div>
                            {this.renderAddress()}
                        </div>
                        <div className='order-wrapper'>
                            <div className='section-title'>Dane uzytkownika</div>
                            {this.renderUserData()}
                        </div>
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