import React, {Component, Fragment} from 'react';
import './productSales.scss';
import {Meteor} from 'meteor/meteor';
import {withTracker} from 'meteor/react-meteor-data';
import {Products} from "../../../../../lib/collections";
import Modal from "../../../../common/modal/modal";
import SwitchInput from "../../../../common/switchInput/switchInput";
import getSalePrice from '../../../../functions/getSalePrice';
import createPrompt from "../../../../functions/createPrompt";

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
        const {modalProduct, inputModal, switchModal} = this.state;

        if(inputModal < 5) {
            return createPrompt('warning', 'promocja musi mieć co najmniej 5%');
        }

        const sales = {
            isActive: switchModal,
            salePercentage: inputModal,
            salePrice: Math.round(modalProduct.price - (modalProduct.price * inputModal / 100))
        };

        Meteor.call('updateSaleProduct', modalProduct._id, sales, err => {
            if(!err) {
                this.setState({isModal: false});
                createPrompt('success', 'zmieniono');
            } else {
                console.error(err);
                switch(err.error) {
                    case 'notPermission':
                        return createPrompt('error', 'brak uprawnień');
                    case 'updateSaleFailed':
                        return createPrompt('error', 'problem z edycją');
                    default:
                        return createPrompt('error', 'ups... wystąpił problem');
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
                        <img src={product.mainPhoto} alt='product thumbnail' />
                    </div>
                    <div className='product-feature'><span className={isActive ? 'price-none' : 'price-active'}>{product.price}</span></div>
                    <div className='product-feature'>{isActive ? <span className='price-active'>{salePrice}</span> : 'brak'}</div>
                    <div className='product-feature'>{isActive ? salePercentage : 'brak'}</div>
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
        const {modalProduct, inputModal, switchModal} = this.state;
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
                                    <div className='input-label'>
                                        cena po obnizce:
                                        {inputModal > 0 ? Math.round(modalProduct.price - (modalProduct.price * inputModal / 100)) : 'brak'}
                                    </div>
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
                                <div className='input-label'>promocja {switchModal ? 'aktywna' : 'nieaktywna'}</div>
                                <SwitchInput selectValue={this.onSwitchChange}
                                             isActive={switchModal}
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