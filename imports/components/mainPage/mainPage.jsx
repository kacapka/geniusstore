import React, {Component} from 'react';
import './mainPage.scss';
import {withTracker} from 'meteor/react-meteor-data';
import {Products, Collections} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {FlowRouter} from 'meteor/kadira:flow-router';
import GeniusSpinner from "../../common/spinner/spinner";

class MainPage extends Component {

    onProductClick(id) {
        window.scrollTo(0,0);
        FlowRouter.go(`/${id}`);
    }

    onCollectionNameClick(id) {
        window.scrollTo(0,0);
        FlowRouter.go(`/collection/${id}`);
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
                       <img src={product.mainPhoto} className='product-img' alt='product' />
                       {product.isNew && !product.sales.isActive &&
                            <div className='sale-label new-label'>NEW</div>
                       }
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
                           {product.sales.isActive && `PLN ${product.sales.salePrice}`}
                       </div>
                   </div>
               </div>
           );
        });
    }

    render() {
        if(!this.props.handleReady) return <GeniusSpinner client />;
        return (
            <div id='mainPage'>
                <div id='productsAll'>
                    {this.renderProducts()}
                </div>
            </div>
        );
    }

}

export default withTracker((props) => {
    let products = [];
    const handle = Meteor.subscribe('products.public');
    const handleReady = handle.ready();
    if(handleReady) {
        products = Products.find({isActive: true, ...props.query}).fetch();
        for(let i=0; i<products.length; i++) {
            products[i].collection = Collections.findOne({_id: products[i].collectionId});
        }
    }
    
    return {
        handleReady,
        products
    }
})(MainPage);