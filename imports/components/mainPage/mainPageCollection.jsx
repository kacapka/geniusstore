import React, {Component} from 'react';
import './mainPage.scss';
import {withTracker} from 'meteor/react-meteor-data';
import {Products, Collections} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {FlowRouter} from 'meteor/kadira:flow-router';
import getSalePrice from '../../functions/getSalePrice';


class MainPageCollection extends Component {

    onProductClick(id) {
        FlowRouter.go(`/${id}`);
    }

    onCollectionNameClick(id) {
        FlowRouter.go(`/collection/${id}`);
    }

    renderProducts() {
        return this.props.products.map(product => {
            console.log(product.collection);
            return (
                <div key={product._id}
                     className='product-item'
                >
                    <div className='product-img-wrapper'
                         onClick={() => this.onProductClick(product._id)}
                    >
                        <img src={product.mainPage} className='product-img' />
                        {product.sales.isActive &&
                        <div className='sale-label'>{product.sales.salePercentage} %</div>
                        }
                    </div>
                    <div className='product-info'>
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
                <h2 id='collectionTitle'>{this.props.handleReady && this.props.collectionName}</h2>
                <div id='productsAll'>
                    {this.props.handleReady ? this.renderProducts() : <div>loading....</div>}
                </div>
            </div>
        );
    }

}

export default withTracker((props) => {
    let products = [];
    let collectionName = '';
    const handle = Meteor.subscribe('products.public', props.collectionId);
    const handleReady = handle.ready();
    if(handleReady) {
        products = Products.find({isActive: true, collectionId: props.collectionId}).fetch();
        for(let i=0; i<products.length; i++) {
            console.log(products[i]);
            products[i].collection = Collections.findOne({_id: products[i].collectionId});
        }
        collectionName = Collections.findOne({_id: props.collectionId}).name;
    }

    return {
        handleReady,
        products,
        collectionName
    }
})(MainPageCollection);