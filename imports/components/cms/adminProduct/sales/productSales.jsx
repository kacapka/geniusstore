import React, {Component} from 'react';
import './productSales.scss';
import {Meteor} from 'meteor/meteor';
import {withTracker} from 'meteor/react-meteor-data';
import {Products} from "../../../../../lib/collections";
import Modal from "../../../../common/modal/modal";

class ProductSales extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isModal: false,
            editId: null,
            editPercentage: null
        };
        this.onSaleInputChange = this.onSaleInputChange.bind(this);
    }

    onSaleInputChange(e) {

    }

    onEditSaleBtnClick(id, percentage) {
        this.setState({
            isModal: true,
            editId: id,
            editPercentage: percentage
        });
    }

    renderProducts() {
        const products = this.props.products;
        if(products.length === 0) return <div>nie posiadasz produktów w promocji</div>;
        return products.map(product => {
            const percentage = product.sales.salePercentage;
            return (
                <div className='product-item' key={product._id}>
                    <div className='product-feature product-thumbnail'>
                        <img src={product.photos[0]} alt='product thumbnail' />
                    </div>
                    <div className='product-feature'>{product.price}</div>
                    <div className='product-feature'>{percentage ? product.price * percentage / 100 : 'brak'}</div>
                    <div className='product-feature'>
                        <div className='sale-input-wrap'>{percentage ? percentage : 'brak'}</div>
                        <ion-icon name="create"
                                  onClick={() => this.onEditSaleBtnClick(product._id, )}
                        />
                    </div>
                </div>
            );
        });
    }

    render() {
        if(!this.props.handleReady) return <div>loading...</div>;
        console.log(this.props);
        return (
            <div id='productSales'>
                <div id='productsList'>
                    {this.renderProducts()}
                </div>
                {this.state.isModal &&
                    <Modal>
                        modal modal
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