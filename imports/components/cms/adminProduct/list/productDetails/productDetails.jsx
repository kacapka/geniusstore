import React, {Component} from 'react';
import './productDetails.scss';
import {Meteor} from 'meteor/meteor';
import {Products, Collections, Features} from "../../../../../../lib/collections";
import {withTracker} from 'meteor/react-meteor-data';
import ProductForm from "../../form/productForm";

class ProductDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isEdit: false
        };
        this.onEditBtnClick = this.onEditBtnClick.bind(this);
    }

    onEditBtnClick() {
        this.setState({isEdit: true});
    }

    render() {
        if(!this.props.handleReady) return <div>...loading</div>;
        const product = this.props.product;
        const collectionName = product.collection ? product.collection.name : 'brak przypisanych kolekcji';
        return (
            <div id='productDetails'>
                {(() => {
                    if (!this.state.isEdit) {
                        return (
                            <div id='details'>
                                <div id='productDetailsBar'>
                                    <div id='barTitle'>{product.name}</div>
                                    <div id='barWrapper'>
                                        <div>{product.isActive ? <span className='active'>aktywny</span> : <span className='no-active'>nieaktywny</span>}</div>
                                        <div id='barEditBtn'
                                             onClick={this.onEditBtnClick}
                                        >
                                            edytuj
                                        </div>
                                    </div>
                                </div>
                                <div id='productDetailsContent'>
                                    <div className='content-column'>
                                        <div className='content-box content-info'>
                                            <div className='label'>kolekcja</div>
                                            <div className='value'>{collectionName}</div>
                                        </div>
                                        <div className='content-box content-info'>
                                            <div className='label'>cena</div>
                                            <div className='value'>{product.price}</div>
                                        </div>
                                        <div className='content-box content-info'>
                                            <div className='label'>plec</div>
                                            <div className='value'>{product.gender}</div>
                                        </div>
                                        <div className='content-box content-promo'>
                                            <div className='label'>promocja: <span className='value'>{product.isSale ? 'TAK' : 'NIE'}</span></div>
                                            <div className='label'>nowosc: <span className='value'>{product.isPromo ? 'TAK' : 'NIE'}</span></div>
                                        </div>
                                        <div className='content-box content-sizes'>
                                            <div className='label'>rozmiary</div>
                                            {product.sizes.map(size => {
                                                const color = size.value == 0 ? 'value-err' : size.value == 1 ? 'value-warn' : 'value-ok';
                                                const active = size.active ? 'content-size active' : 'content-size no-active';
                                                return (
                                                    <div key={size.name} className={active}>
                                                        <div className='label'>{size.name}</div>
                                                        <div className={`value ${color}`}>{size.active ? size.value : 'nieaktywny'}</div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                    <div className='content-column'>
                                        <div className='content-box content-photos'>
                                            {product.photos.map(photo => {
                                                return (
                                                    <div key={photo} className='details-photo'>
                                                        <img src={photo} />
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <div className='content-box'>
                                            <div className='label'>opis</div>
                                            <div className='value'>{product.description}</div>
                                        </div>
                                        <div className='content-box'>
                                            <div className='label'>szczegoly</div>
                                            {product.features.map(feature => {
                                                return (
                                                    <div className='value feature-item' key={feature._id}>{feature.name}</div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    } else {
                        return (
                            <ProductForm action='edit' product={product} />
                        );
                    }
                })()}
            </div>
        );
    }

}

export default withTracker((props) => {
    let product;
    const handle = Meteor.subscribe('product.admin', props.productId);
    const handleReady = handle.ready();
    if(handleReady) {
        product = Products.findOne({_id: props.productId});
        product.collection = Collections.findOne({_id: product.collectionId});
        product.features = Features.find({_id: {$in: product.featuresIds}}).fetch();
    }

    return {
        handleReady,
        product
    }

})(ProductDetails);