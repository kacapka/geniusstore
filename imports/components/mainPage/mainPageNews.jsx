import React, {Component} from 'react';
import './mainPage.scss';
import {withTracker} from 'meteor/react-meteor-data';
import {Products, Collections} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {FlowRouter} from 'meteor/kadira:flow-router';
import getSalePrice from '../../functions/getSalePrice';


class MainPageNews extends Component {

    onProductClick(id) {
        FlowRouter.go(`/${id}`);
    }

    onCollectionNameClick(id) {
        FlowRouter.go(`/collection/${id}`);
    }

    renderProducts() {
        const products = this.props.products;
        if(products.length === 0) return <div className='products-not-found'>pracujemy nad kolejnymi projektami,<br /> bądź czujny,<br /> wkrótce zaprezentujemy nowe produkty</div>
        return products.map(product => {
            return (
                <div key={product._id}
                     className='product-item'
                >
                    <div className='product-img-wrapper'
                         onClick={() => this.onProductClick(product._id)}
                    >
                        <img src={product.photos[0]} className='product-img' />
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
                            {product.sales.isActive && `PLN ${getSalePrice(product.price, product.sales.salePercentage)}`}
                        </div>
                    </div>
                </div>
            );
        });
    }

    render() {
        console.log(this.props);
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
        products = Products.find({isActive: true, isNew: true}).fetch();
        for(let i=0; i<products.length; i++) {
            console.log(products[i]);
            products[i].collection = Collections.findOne({_id: products[i].collectionId});
        }
    }

    return {
        handleReady,
        products
    }
})(MainPageNews);