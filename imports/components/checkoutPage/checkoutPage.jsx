import React, {Component} from 'react';
import './checkoutPage.scss';
import {connect} from 'react-redux';
import {FlowRouter} from 'meteor/kadira:flow-router';

class CheckoutPage extends Component {

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div id='checkoutPage'>
                {(() => {
                    if(this.props.cart.length > 0) {
                        return (
                            <div id='checkoutWrapper'>
                                <div id='checkoutCta'>
                                    <div id='checkoutAddress'>
                                        <div className='checkout-title'>Dane adresowe</div>
                                        <div className='address-row'>
                                            <div className='address-input-wrapper address-input-row'>
                                                <label className='address-label'>imie</label>
                                                <input className='address-input'
                                                       name='name'
                                                />
                                            </div>
                                            <div className='address-input-wrapper address-input-row'>
                                                <label className='address-label'>nazwisko</label>
                                                <input className='address-input'
                                                       name='surname'
                                                />
                                            </div>
                                        </div>
                                        <div className='address-input-wrapper'>
                                            <label className='address-label'>e-mail</label>
                                            <input className='address-input'
                                                   name='mail'
                                            />
                                        </div>
                                    </div>
                                    <div id='checkoutDelivery'>

                                    </div>
                                    <div id='checkoutPayment'>

                                    </div>
                                </div>
                                <div id='checkoutProducts'>

                                </div>
                            </div>
                        );
                    } else {
                        return (
                            <div id='cartNoResult'>error</div>
                        );
                    }
                })()}
            </div>
        );
    }

}

const mapStateToProps = state => ({
    cart: state.cart
});

export default connect(mapStateToProps)(CheckoutPage);