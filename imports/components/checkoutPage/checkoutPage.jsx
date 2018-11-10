import React, {Component, Fragment} from 'react';
import './checkoutPage.scss';
import {connect} from 'react-redux';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {setInputValue, setInputError} from '../../redux/actions/index';
import {selectDeliveryType} from '../../redux/actions/checkout';
import Checkbox from "../../common/checkbox/checkbox";
import emailValidation from '../../functions/emailValidation';
import zipcodeValidation from '../../functions/zipcodeValidation';
import getSalePrice from '../../functions/getSalePrice';
import CheckoutPromoCode from "./checkoutPromoCode";

class CheckoutPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            deliveryPrice: null,
            totalPrice: null
        };
        this.onInputChange = this.onInputChange.bind(this);
        this.onCheckboxClick = this.onCheckboxClick.bind(this);
        this.onSubmitCheckoutBtnClick = this.onSubmitCheckoutBtnClick.bind(this);
        this.onDeliveryCheckboxClick = this.onDeliveryCheckboxClick.bind(this);
    }

    onCheckboxClick(value, name) {
        this.props.setInputValue(name, value);
        this.props.setInputError(`${name}Err`, '');
    }

    onDeliveryCheckboxClick(value, name, options) {
        if(!value) return;
        this.setState({deliveryPrice: options.price});
        this.props.setInputError('deliveryErr', '');
        this.props.selectDeliveryType(name,value);
    }


    onSubmitCheckoutBtnClick() {
        this.validateForm();
    }

    onInputChange(e) {
        const {name, value} = e.target;
        let val = value;
        if(name === 'zipCode' && val.length === 7) {
            return;
        } else if(name === 'phone') {
            val = val.replace(/\D/,'');
        }
        this.props.setInputValue(name, val);
        this.props.setInputError(`${name}Err`, '');
    }

    validateForm() {
        const {name, surname, address, zipCode, town, mail, phone, terms, rodo} = this.props.checkout.inputs;
        const strings = [
            {name: 'name', value: name},
            {name: 'surname', value: surname},
            {name: 'address', value: address},
            {name: 'town', value: town}
        ];
        for(let i=0; i<strings.length; i++) {
            if(strings[i].value.length < 3) {
                this.props.setInputError(`${strings[i].name}Err`, 'niepoprawna wartosc pola');
            }
        }
        if(!emailValidation(mail)) {
            this.props.setInputError('mailErr', 'niepoprawna wartosc pola');
        }
        if(!this.props.checkout.delivery.some(type => type.selected)) {
            this.props.setInputError('deliveryErr', 'wybierz sposob dostawy');
        }
        if(!terms || !rodo) {
            this.props.setInputError('termsErr', 'pola wymagane');
        }
        if(phone.length < 8) {
            this.props.setInputError('phoneErr', 'niepoprawna wartosc pola');
        }
        if(!zipcodeValidation(zipCode)){
            this.props.setInputError('zipCodeErr', 'niepoprawna wartosc pola');
        }
    };

    renderCheckoutProducts() {
        return this.props.cart.map(item => {
            return (
                <div key={item.cartId} className='checkout-product-item' >
                    <div className='checkout-product-img'>
                        <img src={item.product.mainPhoto} />
                        <p>{item.amount}</p>
                    </div>
                    <div className='checkout-product-feature'>{item.size.name}</div>
                    <div className='checkout-product-feature product-price'>{getSalePrice(item.product) * item.amount} PLN</div>
                </div>
            );
        })
    }

    renderDeliveryTypes() {
        return this.props.checkout.delivery.map(type => {
            return (
                <div className='checkbox-wrapper' key={type.name}>
                    <Checkbox value={type.selected}
                              name={type.name}
                              selectCheckbox={this.onDeliveryCheckboxClick}
                              options={{price: type.price}}
                              isMultiple={true}
                    />
                    <label className='checkbox-label'>{type.fullName} <span>{type.price} PLN</span></label>
                </div>
            );
        });
    }

    getFinalPrice() {
        let totalPrice = 0;
        for(let cartItem of this.props.cart ) {
            if(cartItem.product.sales.isActive) {
                totalPrice += cartItem.product.sales.salePrice * cartItem.amount;
            } else {
                totalPrice += cartItem.product.price * cartItem.amount;
            }
        }

        return totalPrice + this.state.deliveryPrice;
    }

    render() {
        const {name, surname, address, zipCode, town, mail, phone, terms, rodo} = this.props.checkout.inputs;
        const {nameErr, surnameErr, addressErr, zipCodeErr, townErr, mailErr, phoneErr, deliveryErr, termsErr} = this.props.checkout.errors;

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
                                                       onChange={this.onInputChange}
                                                       value={name}
                                                       type='text'
                                                />
                                                {nameErr && <p className='input-error'>{nameErr}</p>}
                                            </div>
                                            <div className='address-input-wrapper address-input-row'>
                                                <label className='address-label'>nazwisko</label>
                                                <input className='address-input'
                                                       name='surname'
                                                       onChange={this.onInputChange}
                                                       value={surname}
                                                       type='text'
                                                />
                                                {surnameErr && <p className='input-error'>{surnameErr}</p>}
                                            </div>
                                        </div>
                                        <div className='address-input-wrapper'>
                                            <label className='address-label'>ulica, nr domu, nr mieszkania</label>
                                            <input className='address-input'
                                                   name='address'
                                                   onChange={this.onInputChange}
                                                   value={address}
                                                   type='text'
                                            />
                                            {addressErr && <p className='input-error'>{addressErr}</p>}
                                        </div>
                                        <div className='address-row'>
                                            <div className='address-input-wrapper address-input-row'>
                                                <label className='address-label'>miasto</label>
                                                <input className='address-input'
                                                       name='town'
                                                       onChange={this.onInputChange}
                                                       value={town}
                                                       type='text'
                                                />
                                                {townErr && <p className='input-error'>{townErr}</p>}
                                            </div>
                                            <div className='address-input-wrapper address-input-row'>
                                                <label className='address-label'>kod pocztowy</label>
                                                <input className='address-input'
                                                       name='zipCode'
                                                       onChange={this.onInputChange}
                                                       value={zipCode}
                                                       type='text'
                                                />
                                                {zipCodeErr && <p className='input-error'>{zipCodeErr}</p>}
                                            </div>
                                        </div>
                                        <div className='address-input-wrapper'>
                                            <label className='address-label'>e-mail</label>
                                            <input className='address-input'
                                                   name='mail'
                                                   onChange={this.onInputChange}
                                                   value={mail}
                                                   type='mail'
                                            />
                                            {mailErr && <p className='input-error'>{mailErr}</p>}
                                        </div>
                                        <div className='address-input-wrapper'>
                                            <label className='address-label'>phone</label>
                                            <input className='address-input'
                                                   name='phone'
                                                   onChange={this.onInputChange}
                                                   value={phone}
                                                   type='phone'
                                            />
                                            {phoneErr && <p className='input-error'>{phoneErr}</p>}
                                        </div>
                                    </div>
                                    <div className='checkout-title'>Sposob dostawy</div>
                                    <div id='checkoutDelivery'>
                                        {this.renderDeliveryTypes()}
                                        {deliveryErr && <p className='info-error'>{deliveryErr}</p>}
                                    </div>
                                    <div className='checkout-title'>Platnosc</div>
                                    <div id='checkoutPayment'>
                                        <div className='checkbox-wrapper'>
                                            <Checkbox value={terms}
                                                      name='terms'
                                                      selectCheckbox={this.onCheckboxClick}
                                            />
                                            <label className='checkbox-label'>akceptuje regulamin sklepu</label>
                                        </div>
                                        <div className='checkbox-wrapper'>
                                            <Checkbox value={rodo}
                                                      name='rodo'
                                                      selectCheckbox={this.onCheckboxClick}
                                            />
                                            <label className='checkbox-label'>wyrazam zgode na przetwarzanie moich danych osobowych dla celow realizacji zamowien</label>
                                        </div>
                                        {termsErr && <p className='info-error'>{termsErr}</p>}
                                        <div id='checkoutSubmitBtn'
                                             onClick={this.onSubmitCheckoutBtnClick}
                                        >
                                            przejdz do platnosci
                                        </div>
                                    </div>
                                </div>
                                <div id='checkoutProducts'>
                                    <div className='checkout-title'>Podsumowanie</div>
                                    <div id='checkoutProductsList'>
                                        {this.renderCheckoutProducts()}
                                    </div>
                                    {this.state.deliveryPrice !== null &&
                                        <div className='delivery-amount'>
                                            <span>dostawa</span>
                                            <span>{this.state.deliveryPrice} PLN</span>
                                        </div>
                                    }
                                    <CheckoutPromoCode cart={this.props.cart} />
                                    <div className='final-amount'>
                                        <span>Razem</span>
                                        <span>{this.state.totalPrice ? (this.state.totalPrice + this.state.deliveryPrice) : this.getFinalPrice()} PLN</span>
                                    </div>
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
    cart: state.cart.products,
    checkout: state.checkout
});

export default connect(mapStateToProps, {setInputValue, setInputError, selectDeliveryType})(CheckoutPage);