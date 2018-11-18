import React, {Fragment} from 'react';

const OrderProducts = ({products}) => {
    return (
        <div className='order-wrapper'>
            <div className='section-title'>Produkty</div>
            <div className='product-header'>
                <div className='product-photo'>Produkt</div>
                <div className='list-feature'>Nazwa</div>
                <div className='list-feature'>Ilosc</div>
                <div className='list-feature'>Rozmiar</div>
                <div className='list-feature'>Cena</div>
            </div>
            {products.map((product, i) => {
                return (
                    <Fragment key={product.productId + i}>
                        <div className='order-product'>
                            <div className='product-photo'>
                                <div className='photo-wrap' style={{backgroundImage: `url(${product._data.mainPhoto})`}}/>
                            </div>
                            <div className='list-feature'>{product._data.name}</div>
                            <div className='list-feature'>{product.amount}</div>
                            <div className='list-feature'>{product.size}</div>
                            <div className='list-feature'>{product.price}</div>
                        </div>
                    </Fragment>
                );
            })}
        </div>
    )
};

export default OrderProducts;