import React, {Component} from 'react';
import './adminOrders.scss';
import OrdersList from "./ordersList/ordersList";

class AdminOrders extends Component {

    render() {
        return(
            <div id='adminOrders'>
                <div className='orders-bar'>
                    <div className='bar-title'>Zamowienia</div>
                </div>
                <div id='ordersList'>
                    <div className='order-header'>
                        <div className='order-feature'>Nr zamowienia</div>
                        <div className='order-feature'>Data</div>
                        <div className='order-feature'>Cena</div>
                        <div className='order-feature'>Status Tran.</div>
                        <div className='order-feature'>Status Wysylki</div>
                        <div className='order-feature order-icon'>Podglad</div>
                        <div className='order-feature order-icon'>Usun</div>
                    </div>
                    <OrdersList />
                </div>
            </div>
        );
    }

}

export default AdminOrders;