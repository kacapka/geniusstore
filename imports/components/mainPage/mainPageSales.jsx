import React, {Component} from 'react';
import './mainPage.scss';
import {withTracker} from 'meteor/react-meteor-data';
import {Products, Collections} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {FlowRouter} from 'meteor/kadira:flow-router';
import getSalePrice from '../../functions/getSalePrice';


class MainPageSales extends Component {

    onProductClick(id) {
        FlowRouter.go(`/${id}`);
    }

    onCollectionNameClick(id) {
        FlowRouter.go(`/collection/${id}`);
    }

    renderProducts() {
        const products = this.props.products;
        if(products.length === 0) return <div className='products-not-found'>aktualnie nie posiadamy produktów w promocji,<br /> zajrzyj tu wkrótce z powrotem,<br /> niebawem coś dla Ciebie przygotujemy</div>
        return products.map(product => {
            return (
                <div key={product._id}
                     className='product-item'
                >
                    <div className='product-img-wrapper'
                         onClick={() => this.onProductClick(product._id)}
                    >
                        <img src={product.mainPhoto} className='product-img' />
                        {product.sales.isActive &&
                            <div className='sale-label'>{product.sales.salePercentage} %</div>
                        }
                    </div>
                    <div className='product-info'>
                        <span className='product-info-collection'
                              onClick={() => this.onCollectionNameClick(product.collectionId)}
                        >
                           {!product.collection.isDefault && product.collection.name}
                       </span>
                        <div className='product-info-title'>{product.name}</div>
                        <div className='product-info-price'>
                            {product.sales.isActive ? <span className='price-none'>PLN {product.price}</span> : `PLN ${product.price}`}
                            {product.sales.isActive && `PLN ${product.sales.salePrice}`}                        </div>
                    </div>
                </div>
            );
        });
    }

    render() {
        return (
            <div id='mainPage'>
                <div id='productsAll'>
                    {this.props.handleReady ? this.renderProducts() : <div>loading....</div>}
                </div>
            </div>
        );
    }

}

export default withTracker(() => {
    let products = [];
    const handle = Meteor.subscribe('products.public');
    const handleReady = handle.ready();
    if(handleReady) {
        products = Products.find({isActive: true, isSale: true, 'sales.isActive': true}).fetch();
        for(let i=0; i<products.length; i++) {
            console.log(products[i]);
            products[i].collection = Collections.findOne({_id: products[i].collectionId});
        }
    }

    return {
        handleReady,
        products
    }
})(MainPageSales);