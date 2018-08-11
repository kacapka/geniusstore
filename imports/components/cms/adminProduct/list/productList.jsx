import React, {Component} from 'react';
import './productList.scss';
import {Products, Collections} from "../../../../../lib/collections";
import {Meteor} from 'meteor/meteor';
import {withTracker} from 'meteor/react-meteor-data';

class ProductList extends Component {

    renderProducts() {
        return this.props.products.map(product => {
            return (
                <div className='product-item' key={product._id}>
                    <div className='product-feature product-thumbnail'>
                        <img src={product.photo} alt='product thumbnail' />
                    </div>
                    <div className='product-feature product-title'>{product.title}</div>
                    <div className='product-feature product-collection'>{product.collection ? product.collection.name : <span>brak przypisanej kolekcji !</span>}</div>
                    <div className='product-feature product-price'>{product.price}</div>
                    <div className='product-feature product-sizes'>
                        {product.sizes.map(size => {
                            const sizeClassName = size.value === 0 ? 'empty' : size.value < 3 ? 'last' : '';
                            return (
                                <div className={`sizes ${sizeClassName}`} key={size.id}>
                                    <span className='sizes-name'>{size.name}</span>
                                    <span className='sizes-value'>{size.value}</span>
                                </div>
                            )
                        })}
                    </div>
                    <div className='product-feature product-remove'>
                        <ion-icon name="remove-circle"
                                  onClick={() => this.onDeleteProductClick(product.cartId)}
                        />
                    </div>
                </div>
            );
        });
    }

    render() {
        if(!this.props.handleReady) return <div>...loading</div>;
        console.log(this.props.products);
        return (
            <div id='ProductList'>
                <div id='productsList'>
                    <div className='product-item product-header'>
                        <div className='product-feature product-photo'>produkt</div>
                        <div className='product-feature product-title'>nazwa</div>
                        <div className='product-feature product-collection'>kolekcja</div>
                        <div className='product-feature product-price'>cena</div>
                        <div className='product-feature product-sizes'>rozmiary</div>
                        <div className='product-feature product-remove'>usun</div>
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
            console.log(products[i].collectionId);
        }
    }

    return {
        handleReady,
        products
    }
})(ProductList);