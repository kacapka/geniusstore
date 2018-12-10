import React, {Component} from 'react';
import {FlowRouter} from 'meteor/kadira:flow-router';


class ProductItem extends Component {

    state = {
        photo: this.props.product.mainPhoto
    };

    onProductClick(id) {
        window.scrollTo(0,0);
        FlowRouter.go(`/${id}`);
    }

    onCollectionNameClick(id) {
        window.scrollTo(0,0);
        FlowRouter.go(`/collection/${id}`);
    }

    onPhotoMouseOn() {
        if(this.props.product.photos.length > 0) {
            this.setState({photo:this.props.product.photos[0]})
        }
    }

    onPhotoMouseOff() {
        this.setState({photo: this.props.product.mainPhoto});
    }

    render() {
        const product = this.props.product;
        const photo = this.state.photo;
        return(
            <div className='product-item'>
                <div className='product-img-wrapper'
                     onClick={() => this.onProductClick(product._id)}
                >
                    <img src={photo} className='product-img' alt='product'
                         onMouseEnter={() => this.onPhotoMouseOn()}
                         onMouseLeave={() => this.onPhotoMouseOff()}
                    />
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
        )
    }
}

export default ProductItem;
