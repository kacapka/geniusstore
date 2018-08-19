import React, {Component} from 'react';
import './productList.scss';
import {Products, Collections} from "../../../../../lib/collections";
import {Meteor} from 'meteor/meteor';
import {withTracker} from 'meteor/react-meteor-data';
import {FlowRouter} from 'meteor/kadira:flow-router';

class ProductList extends Component {

    onProductItemClick(id) {
        FlowRouter.go(`/admin/product/list/${id}`);
    }

    renderProducts() {
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
                        <img src={product.photos[0]} alt='product thumbnail' />
                    </div>
                    <div className='product-feature product-title'>{product.name}</div>
                    <div className='product-feature product-collection'>{product.collection ? product.collection.name : <span>brak przypisanej kolekcji !</span>}</div>
                    <div className='product-feature product-price'>{product.price}</div>
                    <div className='product-feature product-sizes'>
                        {product.sizes.map(size => {
                            if(!size.active) return;
                            const sizeClassName = size.value == 0 ? 'empty' : size.value < 2 ? 'last' : '';
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
        if(!this.props.handleReady) return <div>...loading</div>;
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
        products = Products.find({}).fetch();
        for(let i=0; i<products.length; i++) {
            products[i].collection = Collections.findOne({_id: products[i].collectionId});
        }
    }

    return {
        handleReady,
        products
    }
})(ProductList);