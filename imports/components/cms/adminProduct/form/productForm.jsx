import React, {Component, Fragment} from 'react';
import './productForm.scss';
import {FlowRouter} from 'meteor/kadira:flow-router';
import SwitchInput from '/imports/common/switchInput/switchInput';
import SelectInput from "../../../../common/selectInput/selectInput";
import {withTracker} from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';
import {Collections, Features} from "../../../../../lib/collections";
import uniqid from 'uniqid';
import {validateProduct} from './validateProduct';

const GENDER_SELECT = [
    {name: 'unisex', systemName: 'unisex'},
    {name: 'mezczyzna', systemName: 'man'},
    {name: 'kobieta', systemName: 'woman'}
];

const SIZES = [
    {id: 0, name: 'unisex'},
    {id: 1, name: 'S'},
    {id: 2, name: 'M'},
    {id: 3, name: 'L'},
    {id: 4, name: 'XL'}
];

class ProductForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isActive: props.product.isActive || false
        };
        this.onSwitchChange = this.onSwitchChange.bind(this);
        this.onEditProductClick = this.onEditProductClick.bind(this);
        this.onDeleteProductClick = this.onDeleteProductClick.bind(this);
    }

    onSwitchChange(value, name) {
        this.setState({[name]: value});
    }

    onEditProductClick() {
        console.log('edit product');
    }

    onDeleteProductClick() {
        console.log('delete prodcut');
    }

    render() {
        return(
            <div id='productForm'>
                <div id='formBar'>
                    <div id='barTitle'>dodaj nowy produkt</div>
                    <div id='barButtons'>
                        <div>produkt {this.state.isActive ? 'aktywny' : 'nieaktywny'}</div>
                        <SwitchInput selectValue={this.onSwitchChange}
                                     isActive={this.state.isActive}
                                     className='switch-status'
                                     name='isActive'
                        />
                        {(() => {
                            if(this.props.action === 'edit') {
                                return (
                                    <Fragment>
                                        <div id='submitProductBtn'
                                             onClick={this.onEditProductClick}
                                        >
                                            zapisz
                                        </div>
                                        <div id='deleteProductBtn'
                                             onClick={this.onDeleteProductClick}
                                        >
                                            usun
                                        </div>
                                    </Fragment>
                                );
                            } else {
                                return (
                                    <div id='submitProductBtn'
                                         onClick={this.onAddProductClick}
                                    >
                                        dodaj
                                    </div>
                                );
                            }
                        })()}
                    </div>
                </div>
                <div id='formInputs'>
                    <div className='form-inputs-box'>
                        <div className='input-wrapper'>
                            <label>nazwa</label>
                        </div>

                    </div>
                    <div className='form-inputs-box'>
                        <div className='input-wrapper'>
                            <label>zdjecia</label>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default ProductForm;

