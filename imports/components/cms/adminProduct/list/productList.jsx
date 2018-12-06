import React, {Component} from 'react';
import './productList.scss';
import {Products, Collections} from "../../../../../lib/collections";
import {Meteor} from 'meteor/meteor';
import {withTracker} from 'meteor/react-meteor-data';
import {FlowRouter} from 'meteor/kadira:flow-router';
import GeniusSpinner from "../../../../common/spinner/spinner";

class ProductList extends Component {

    onProductItemClick(id) {
        FlowRouter.go(`/admin/product/list/${id}`);
    }

    renderProducts() {
        if(!this.props.products.length) return <div>brak dodanych produktów</div>;
        return this.props.products.map(product => {
            const eyeColor = product.isActive ? 'active' : 'no-active';
            return (
                <div className='product-item' key={product._id}
                     onClick={() => this.onProductItemClick(product._id)}
                >
                    <div className={`product-feature product-status ${eyeColor}`}>
                        <ion-icon name="eye" />
                    </div>
                    <div className='product-feature product-thumbnail'>
                        {product.mainPhoto.length > 0 ? <img src={product.mainPhoto} alt='product thumbnail' /> : <div className='no-photo'><span>brak</span> <span>zdjecia</span></div>}
                    </div>
                    <div className='product-feature product-title'>{product.name}</div>
                    <div className='product-feature product-collection'>{product.collection ? product.collection.name : <span>brak przypisanej kolekcji !</span>}</div>
                    <div className='product-feature product-price'>{product.price}</div>
                    <div className='product-feature product-sizes'>
                        {product.sizes.map(size => {
                            if(!size.active) return;
                            const sizeClassName = size.value === 0 ? 'empty' : size.value < 2 ? 'last' : '';
                            return (
                                <div className={`sizes ${sizeClassName}`} key={size.name}>
                                    <span className='sizes-name'>{size.name}</span>
                                    <span className='sizes-value'>{size.value}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            );
        });
    }

    render() {
        if(!this.props.handleReady) return <GeniusSpinner />;
        return (
            <div id='ProductList'>
                <div id='productsList'>
                    <div className='product-item product-header'>
                        <div className='product-feature product-status'>status</div>
                        <div className='product-feature product-photo'>produkt</div>
                        <div className='product-feature product-title'>nazwa</div>
                        <div className='product-feature product-collection'>kolekcja</div>
                        <div className='product-feature product-price'>cena</div>
                        <div className='product-feature product-sizes'>rozmiary</div>
                    </div>
                    {this.renderProducts()}
                </div>
            </div>
        );
    }
}

export default withTracker(() => {
    let products = [];
    const handle = Meteor.subscribe('products.admin');
    const handleReady = handle.ready();
    if(handleReady) {
        products = Products.find({}, {sort: {timestamp: -1}}).fetch();
        for(let i=0; i<products.length; i++) {
            products[i].collection = Collections.findOne({_id: products[i].collectionId});
        }
    }

    return {
        handleReady,
        products
    }
})(ProductList);