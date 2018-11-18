import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {Products} from '/lib/collections';
import {withTracker} from 'meteor/react-meteor-data';
import SwitchInput from "../../../../../../common/switchInput/switchInput";

class ActiveProduct extends Component {

    constructor(props) {
        super(props);
        const product = props.product;
        this.state = {
            isActive: props.product.isActive,
            validation: [
                {name: 'name', label: 'nazwa', valid: this.validateSting(product.name), error: 'zbyt krotka wartosc'},
                {name: 'mainPhoto', label: 'zdjecie glowne', valid: this.validateSting(product.mainPhoto), error: 'niepoprawne zdjecie'},
                {name: 'price', label: 'cena', valid: this.validatePrice(product.price), error: 'cena musi byc wieksza od zera'},
                {name: 'sizes', label: 'rozmiary', valid: this.validateSizes(product.sizes), error: 'brak wybranego rozmiaru'}
            ]
        };
        this.onSubmitBtnClick = this.onSubmitBtnClick.bind(this);
        this.onCancelBtnClick = this.onCancelBtnClick.bind(this);
        this.selectValue = this.selectValue.bind(this);
    }

    validateSting(string) {
        return typeof string === 'string' && string.length > 2;
    }

    validatePrice(price) {
        return typeof price === 'number' && price > 0;
    }

    validateSizes(sizes) {
        return sizes.some(size => size.active === true);
    }

    selectValue(bool) {
        this.setState({isActive: bool});
    }

    onSubmitBtnClick() {
        const {isActive, validation} = this.state;
        const productId = this.props.product._id;
        const isValid = validation.every(field => field.valid === true);
        if(!isActive) {
            Meteor.call('editProductActiveStatus', productId, isActive, err => {
                if(!err) {
                    this.props.closeModal();
                } else {
                    console.error(err);
                    alert(err.error);
                }
            })
        } else {
            if(!isValid) {
                window.alert('musisz wypelnic pola obowiazkowe zeby przejsc walidacje produktu');
            } else {
                Meteor.call('editProductActiveStatus', productId, isActive, err => {
                    if(!err) {
                        this.props.closeModal();
                    } else {
                        console.error(err);
                        alert(err.error);
                    }
                })
            }
        }

    }

    onCancelBtnClick() {
        this.props.closeModal();
    }

    renderValidationFields() {
        return this.state.validation.map(field => {
            const valueClassName = field.valid ? 'field-value valid' : 'field-value invalid';
            return (
                <div className='validation-field' key={field.name}>
                    <div className='field-label'>{field.label}</div>
                    <div className={valueClassName}>{field.valid ? 'poprawne' : field.error}</div>
                </div>
            )
        })
    }

    render() {
        const isActive = this.props.product.isActive;
        return (
            <div className='edit-modal-wrap'>
                <div className='modal-title'>{isActive ? 'Ukryj produkt' : 'aktywuj produkt'}</div>
                <div className='validation-wrap'>
                    {this.renderValidationFields()}
                </div>
                <div className='modal-input-wrap'>
                    <div className='input-label'>{this.state.isActive ? 'aktywny' : 'nieaktywny'}</div>
                    <SwitchInput selectValue={this.selectValue}
                                 name='isActive'
                                 className='product-switch'
                                 isActive={this.props.product.isActive}
                    />
                </div>
                <div className='modal-buttons-wrap'>
                    <div className='modal-btn-submit'
                         onClick={this.onSubmitBtnClick}
                    >
                        zapisz
                    </div>
                    <div className='modal-btn-cancel'
                         onClick={this.onCancelBtnClick}
                    >
                        cofnij
                    </div>
                </div>
            </div>
        )
    }

}

export default ActiveProduct;