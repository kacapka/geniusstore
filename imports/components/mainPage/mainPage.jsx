import React, {Component} from 'react';
import './mainPage.scss';
import {withTracker} from 'meteor/react-meteor-data';
import {Products} from '/lib/collections';
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
                       <img src={product.photo} className='product-img' />
                   </div>
                   <div className='product-info'>
                       <div className='product-info-collection'>{product.collection}</div>
                       <div className='product-info-title'>{product.title}</div>
                       <div className='product-info-price'>PLN {product.price}</div>
                   </div>
               </div>
           );
        });
    }

    render() {
        return (
            <div id='mainPage'>
                <div id='productsAll'>
                    {this.renderProducts()}
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
        products = Products.find({isActive: true}).fetch();
    }
    
    return {
        handleReady,
        products
    }
})(MainPage);