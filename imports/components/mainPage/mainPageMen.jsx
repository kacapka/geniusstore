import React, {Component} from 'react';
import './mainPage.scss';
import {withTracker} from 'meteor/react-meteor-data';
import {Products, Collections} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {FlowRouter} from 'meteor/kadira:flow-router';


class MainPage extends Component {

    onProductClick(id) {
        FlowRouter.go(`/${id}`);
    }

    renderProducts() {
        return this.props.products.map(product => {
            return (
                <div key={product._id}
                     className='product-item'
                >
                    <div className='product-img-wrapper'
                         onClick={() => this.onProductClick(product._id)}
                    >
                        <img src={product.photos[0]} className='product-img' />
                    </div>
                    <div className='product-info'>
                        <div className='product-info-collection'>{!product.collection.isDefault && product.collection.name}</div>
                        <div className='product-info-title'>{product.name}</div>
                        <div className='product-info-price'>PLN {product.price}</div>
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
        products = Products.find({isActive: true, gender: 'man'}).fetch();
        for(let i=0; i<products.length; i++) {
            console.log(products[i]);
            products[i].collection = Collections.findOne({_id: products[i].collectionId});
        }
    }

    return {
        handleReady,
        products
    }
})(MainPage);