import React, {Component} from 'react';
import './checkoutPage.scss';
import {connect} from 'react-redux';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {setInputValue, setInputError, resetCart} from '../../redux/actions/index';
import {selectDeliveryType, setPromoCode, toggleCheckout} from '../../redux/actions/checkout';
import {getDeliveryPrice} from '../../redux/selectors/deliveryPrice';
import {getFinalPrice} from '../../redux/selectors/finalPrice';
import Checkbox from "../../common/checkbox/checkbox";
import emailValidation from '../../functions/emailValidation';
import zipcodeValidation from '../../functions/zipcodeValidation';
import getSalePrice from '../../functions/getSalePrice';
import CheckoutPromoCode from "./checkoutPromoCode";


class CheckoutPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            terms: false,
            rodo: false,
            termsErr: false,

            //dev
            confirmation: false
        };
        this.onInputChange = this.onInputChange.bind(this);
        this.onCheckboxClick = this.onCheckboxClick.bind(this);
        this.onSubmitCheckoutBtnClick = this.onSubmitCheckoutBtnClick.bind(this);
        this.onDeliveryCheckboxClick = this.onDeliveryCheckboxClick.bind(this);
        this.setPromoCode = this.setPromoCode.bind(this);
    }

    componentWillUnmount() {
        this.props.toggleCheckout(false);
    }

    onCheckboxClick(value, name) {
        this.setState({[name]: value, termsErr: ''});
    }

    onDeliveryCheckboxClick(value, name, options) {
        if(!value) return;
        this.setState({deliveryPrice: options.price});
        this.props.setInputError('deliveryErr', '');
        this.props.selectDeliveryType(name,value);
    }

    setPromoCode(promoCode) {
        this.props.setPromoCode(promoCode);
    }

    onSubmitCheckoutBtnClick() {
        if(this.validateForm()) {
            const products = this.props.cartProducts.map(item => {
                return {
                    productId: item.productId,
                    amount: item.amount,
                    size: item.size.name,
                    price: getSalePrice(item._product) * item.amount
                }
            });
            const {inputs, promoCode} = this.props.checkout;
            const order = {
                products,
                price: this.props.finalPrice,
                deliveryType: this.props.delivery.type,
                address: {
                    city: inputs.town,
                    street: inputs.address,
                    zipCode: inputs.zipCode
                },
                user: {
                    name: inputs.name,
                    surname: inputs.surname,
                    email: inputs.mail,
                    phone: inputs.phone
                },
                promoCode: promoCode,
                notes: inputs.notes,
                status: 'completed',
                deliveryStatus: 'pending'
            };
            Meteor.call('insertOrder', order, err => {
                if(!err) {
                    console.log('order insert success');
                    // this.props.resetCart();
                    this.setState({confirmation: true});
                    // FlowRouter.go('/');
                } else {
                    alert(err.error);
                }
            });
        }
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
        let isValid = true;
        const {name, surname, address, zipCode, town, mail, phone} = this.props.checkout.inputs;
        const {terms, rodo} = this.state;
        const strings = [
            {name: 'name', value: name},
            {name: 'surname', value: surname},
            {name: 'address', value: address},
            {name: 'town', value: town}
        ];
        for(let i=0; i<strings.length; i++) {
            if(strings[i].value.length < 3) {
                this.props.setInputError(`${strings[i].name}Err`, 'niepoprawna wartosc pola');
                isValid = false;
            }
        }
        if(!emailValidation(mail)) {
            this.props.setInputError('mailErr', 'niepoprawna wartosc pola');
            isValid = false;
        }
        if(!this.props.checkout.delivery.some(type => type.selected)) {
            this.props.setInputError('deliveryErr', 'wybierz sposob dostawy');
            isValid = false;
        }
        if(!terms || !rodo) {
            this.setState({termsErr: 'pola wymagane'});
            isValid = false;
        }
        if(phone.length < 8) {
            this.props.setInputError('phoneErr', 'niepoprawna wartosc pola');
            isValid = false;
        }
        if(!zipcodeValidation(zipCode)){
            this.props.setInputError('zipCodeErr', 'niepoprawna wartosc pola');
            isValid = false;
        }

        return isValid;
    };

    renderCheckoutProducts() {
        return this.props.cartProducts.map(item => {
            if(!item._product) return;
            return (
                <div key={item.cartId} className='checkout-product-item' >
                    <div className='checkout-product-img'>
                        <img src={item._product.mainPhoto} />
                        <p>{item.amount}</p>
                    </div>
                    <div className='checkout-product-feature'>{item.size.name}</div>
                    <div className='checkout-product-feature product-price'>{getSalePrice(item._product) * item.amount} PLN</div>
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

    render() {
        const {name, surname, address, zipCode, town, mail, phone, notes} = this.props.checkout.inputs;
        const {nameErr, surnameErr, addressErr, zipCodeErr, townErr, mailErr, phoneErr, deliveryErr} = this.props.checkout.errors;
        const promoCode = this.props.checkout.promoCode;
        const {rodo, terms, termsErr} = this.state;

        return (
            <div id='checkoutPage'>
                {(() => {
                    if(this.props.cartProducts.length > 0) {
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
                                        <div className='address-input-wrapper'>
                                            <label className='address-label'>uwagi do zamówienia (dostawa, faktura VAT)</label>
                                            <textarea className='address-input'
                                                   name='notes'
                                                   onChange={this.onInputChange}
                                                   value={notes}
                                            />
                                            {phoneErr && <p className='input-error'>{phoneErr}</p>}
                                        </div>
                                    </div>
                                    <div className='checkout-title'>Sposob dostawy</div>
                                    <div id='checkoutDelivery'>
                                        {this.renderDeliveryTypes()}
                                        {deliveryErr && <p className='info-error'>{deliveryErr}</p>}
                                    </div>
                                    <div className='checkout-title'>Płatnośc</div>
                                    <div id='checkoutPayment'>
                                        <div className='checkbox-wrapper'>
                                            <Checkbox value={terms}
                                                      name='terms'
                                                      selectCheckbox={this.onCheckboxClick}
                                            />
                                            <label className='checkbox-label'>akceptuję regulamin sklepu</label>
                                        </div>
                                        <div className='checkbox-wrapper'>
                                            <Checkbox value={rodo}
                                                      name='rodo'
                                                      selectCheckbox={this.onCheckboxClick}
                                            />
                                            <label className='checkbox-label'>wyrażam zgodę na przetwarzanie moich danych osobowych dla celów realizacji zamówienia</label>
                                        </div>
                                        {termsErr && <p className='info-error'>{termsErr}</p>}
                                    </div>
                                </div>
                                <div id='checkoutProducts'>
                                    <div className='checkout-title'>Podsumowanie</div>
                                    <div id='checkoutProductsList'>
                                        {this.renderCheckoutProducts()}
                                    </div>
                                    {promoCode &&
                                        <div className='delivery-amount'>
                                            <span>zniżka</span>
                                            <span>{promoCode.value + ' ' + promoCode.type}</span>
                                        </div>
                                    }
                                    {this.props.delivery !== null &&
                                        <div className='delivery-amount'>
                                            <span>dostawa</span>
                                            <span>{this.props.delivery.price} PLN</span>
                                        </div>
                                    }
                                    <CheckoutPromoCode cart={this.props.cart}
                                                       setPromoCode={this.setPromoCode}
                                    />
                                    <div className='final-amount'>
                                        <span>Razem</span>
                                        <span>{this.props.finalPrice} PLN</span>
                                    </div>
                                    <div id='checkoutSubmitBtn'
                                         onClick={this.onSubmitCheckoutBtnClick}
                                    >
                                        przejdź do płatności
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
                {/*dev*/}
                {this.state.confirmation &&
                    <div className='dev-confirmation'>
                        <p className='dev-confirmation-text'>Dziękujemy za dokonanie zakupu.</p>
                        <p className='dev-confirmation-text'>Wkrótce dostaniesz maila ze szczegółami zamówienia.</p>
                        <div className='dev-confirmation-btn' onClick={() => {FlowRouter.go('/'); this.props.resetCart();}}>OK</div>
                    </div>
                }
            </div>
        );
    }

}

const mapStateToProps = (state, props) => ({
    delivery: getDeliveryPrice(state),
    finalPrice: getFinalPrice(state, props),
    checkout: state.checkout
});

export default connect(mapStateToProps, {setInputValue, setInputError, selectDeliveryType, setPromoCode, resetCart, toggleCheckout})(CheckoutPage);