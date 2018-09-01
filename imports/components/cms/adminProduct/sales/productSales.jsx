import React, {Component, Fragment} from 'react';
import './productSales.scss';
import {Meteor} from 'meteor/meteor';
import {withTracker} from 'meteor/react-meteor-data';
import {Products} from "../../../../../lib/collections";
import Modal from "../../../../common/modal/modal";
import SwitchInput from "../../../../common/switchInput/switchInput";
import getSalePrice from '../../../../functions/getSalePrice';

class ProductSales extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isModal: false,
            modalProduct: {},
            inputModal: null,
            switchModal: false
        };
        this.onInputSaleChange = this.onInputSaleChange.bind(this);
        this.onCancelSaleBtnClick = this.onCancelSaleBtnClick.bind(this);
        this.onSubmitSaleBtnClick = this.onSubmitSaleBtnClick.bind(this);
        this.onSwitchChange = this.onSwitchChange.bind(this);
    }

    onInputSaleChange(e) {
        const value = Number(e.target.value);
        if(value > 80) return;
        this.setState({inputModal: value});
    }

    onSwitchChange(checked) {
        this.setState({switchModal: checked});
    }

    onCancelSaleBtnClick() {
        this.setState({isModal: false});
    }

    onEditSaleBtnClick(product) {
        this.setState({
            isModal: true,
            modalProduct: product,
            inputModal: product.sales.salePercentage ? product.sales.salePercentage : '',
            switchModal: product.sales.isActive
        });
    }

    onSubmitSaleBtnClick() {
        const id = this.state.modalProduct._id;
        const percentage = this.state.inputModal;
        const isActive = this.state.switchModal;
        const basePrice = this.props.products.find(product => product._id === id).price;
        const salePrice = getSalePrice(basePrice, percentage);

        if(!percentage || percentage < 5) {
            return window.alert('promocja musi byc conajmniej 5 %');
        }

        const sales = {
            isActive,
            salePrice,
            salePercentage: percentage
        };

        Meteor.call('updateSaleProduct', id, sales, err => {
            if(!err) {
                this.setState({isModal: false});
            } else {
                if(err.error === '') {
                    window.alert('wystapil problem z poprawna walidacja');
                } else if(err.error === '') {
                    window.alert('wystapil problem z edycja promocji');
                }
            }
        });
    }

    renderProducts() {
        const products = this.props.products;
        if(products.length === 0) return <div>nie posiadasz produktów w promocji</div>;
        return products.map(product => {
            const {salePercentage, isActive, salePrice} = product.sales;
            const eyeColor = isActive ? 'active' : 'no-active';
            return (
                <div className='product-item' key={product._id}>
                    <div className={`product-feature product-status ${eyeColor}`}>
                        <ion-icon name="eye" />
                    </div>
                    <div className='product-feature product-thumbnail'>
                        <img src={product.photos[0]} alt='product thumbnail' />
                    </div>
                    <div className='product-feature'>{salePercentage ? <span className='price-none'>{product.price}</span> : <span className='price-active'>{product.price}</span>}</div>
                    <div className='product-feature'>{salePercentage ? <span className='price-active'>{salePrice}</span> : 'brak'}</div>
                    <div className='product-feature'>{salePercentage ? salePercentage : 'brak'}</div>
                    <div className='product-feature product-edit'>
                        <ion-icon name="create"
                                  onClick={() => this.onEditSaleBtnClick(product)}
                        />
                    </div>
                </div>
            );
        });
    }

    render() {
        if(!this.props.handleReady) return <div>loading...</div>;
        const {modalProduct, inputModal, isActive} = this.state;
        return (
            <div id='productSales'>
                <div id='productsList'>
                    <div className='product-item product-header'>
                        <div className='product-feature product-status'>status</div>
                        <div className='product-feature product-photo'>product</div>
                        <div className='product-feature'>cena podstawowa</div>
                        <div className='product-feature'>cena w promocji</div>
                        <div className='product-feature'>przecena %</div>
                        <div className='product-feature'>edytuj</div>
                    </div>
                    {this.renderProducts()}
                </div>
                {this.state.isModal &&
                    <Modal>
                        <div id='modalSale'>
                            <div id='modalSaleInput'>
                                <div id='modalLabelsWrap'>
                                    <div className='input-label'>cena podstawowa: {modalProduct.price}</div>
                                    <div className='input-label'>cena po obnizce: {inputModal ? getSalePrice(modalProduct.price, inputModal) : 'brak'}</div>
                                </div>
                                <div id='modalInputWrap'>
                                    <input className='input-sale'
                                           value={inputModal}
                                           type='number'
                                           onChange={this.onInputSaleChange}
                                    />
                                    %
                                </div>
                            </div>
                            <div id='modalSaleActive'>
                                <div className='input-label'>promocja {isActive ? 'aktywna' : 'nieaktywna'}</div>
                                <SwitchInput selectValue={this.onSwitchChange}
                                             isActive={isActive}
                                />
                            </div>
                        </div>
                        <div id='modalSaleButtons'>
                            <div id='submitSaleBtn'
                                 onClick={this.onSubmitSaleBtnClick}
                            >
                                zapisz
                            </div>
                            <div id='cancelSaleBtn'
                                 onClick={this.onCancelSaleBtnClick}
                            >
                                cofnij
                            </div>
                        </div>
                    </Modal>
                }
            </div>
        );
    }

}

export default withTracker(() => {
    let products = [];
    const handle = Meteor.subscribe('products.sales.admin');
    const handleReady = handle.ready();
    if(handleReady) {
        products = Products.find({isSale: true}).fetch();
    }

    return {
        handleReady,
        products
    }

})(ProductSales);