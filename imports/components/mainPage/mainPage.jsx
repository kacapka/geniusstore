import React, {Component} from 'react';
import './mainPage.scss';
import {withTracker} from 'meteor/react-meteor-data';
import {Products, Collections} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import GeniusSpinner from "../../common/spinner/spinner";
import ProductItem from "./productItem";

class MainPage extends Component {

    renderProducts() {
        return this.props.products.map(product => {
           return (
               <ProductItem key={product._id} product={product} />
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